[CmdletBinding(DefaultParameterSetName = 'Build')]
param(
    # Install dependencies (npm install + ensure Electron binary)
    [Parameter(ParameterSetName = 'Install', Position = 0)]
    [switch]$DoInstall,

    # Build the app (electron-vite build)
    [Parameter(ParameterSetName = 'Build', Position = 0)]
    [switch]$DoBuild,

    # Build then run the Playwright acceptance tests
    [Parameter(ParameterSetName = 'Test', Position = 0)]
    [switch]$DoTest,

    # Run the app in development (electron-vite dev)
    [Parameter(ParameterSetName = 'Run', Position = 0)]
    [switch]$DoRun,

    [Parameter(ParameterSetName = 'Build')]
    [Parameter(ParameterSetName = 'Test')]
    [Parameter(ParameterSetName = 'Run')]
    [switch]$SkipInstall,

    [Parameter(ParameterSetName = 'Test')]
    [switch]$SkipBuild,

    # Only run tests whose title matches this regex (Playwright -g)
    [Parameter(ParameterSetName = 'Test')]
    [string]$TestFilter,

    # Run tests in a headed browser/window
    [Parameter(ParameterSetName = 'Test')]
    [switch]$Headed,

    # List matching tests without running them
    [Parameter(ParameterSetName = 'Test')]
    [switch]$ListTests,

    # Only output failures
    [Parameter()]
    [switch]$Quiet
)

$PSCmdlet.MyInvocation.BoundParameters.Keys | ForEach-Object { Write-Verbose "$($PSCmdlet.MyInvocation.MyCommand)-$($_): $($PSCmdlet.MyInvocation.BoundParameters[$_])" }

$ErrorActionPreference = 'Stop';
$PSNativeCommandUseErrorActionPreference = $true
Set-StrictMode -Version 1;

Push-Location $PSScriptRoot;
try
{
    function WriteHeader($Text, [System.ConsoleColor]$ForegroundColor)
    {
        if ($Quiet)
        {
            return
        }

        $pColor = @{}
        if ($PSBoundParameters.ContainsKey('ForegroundColor'))
        {
            $pColor = @{ ForegroundColor = $ForegroundColor }
        }

        $length = 5 + 1 + $Text.Length + 1 + 5
        Write-Host ''.PadRight($length, '#') @pColor
        Write-Host "##### $Text #####" @pColor
        Write-Host ''.PadRight($length, '#') @pColor
        Write-Host
    }

    function RunCommand([string]$Command, $Arguments, [switch]$QuietOnSuccess)
    {
        Write-Verbose "Running $Command $Arguments";
        if (-not $QuietOnSuccess)
        {
            & $Command @Arguments
            return
        }

        $captured = [System.Collections.Generic.List[object]]::new()
        try
        {
            & $Command @Arguments 2>&1 | ForEach-Object { $captured.Add($_) }
        }
        catch
        {
            $captured | Out-Host
            throw "$Command failed with exit code $LASTEXITCODE."
        }
    }

    # Electron's postinstall can be gated/broken in some environments, leaving a
    # stub binary that fails to launch. Detect that and re-extract the full
    # archive from the Electron download cache.
    function EnsureElectron()
    {
        $electronDir = Join-Path 'node_modules' 'electron';
        if (!(Test-Path $electronDir))
        {
            Write-Verbose 'Electron not installed yet; skipping binary check.';
            return;
        }

        $distDir = Join-Path $electronDir 'dist';
        if (Test-Path $distDir)
        {
            $sizeBytes = (Get-ChildItem $distDir -Recurse -File -ErrorAction SilentlyContinue |
                Measure-Object -Property Length -Sum).Sum;
            if ($sizeBytes -gt 100MB)
            {
                Write-Verbose 'Electron binary looks healthy.';
                return;
            }
        }

        WriteHeader 'Repairing Electron binary' -ForegroundColor Yellow;

        $version = (Get-Content (Join-Path $electronDir 'package.json') -Raw | ConvertFrom-Json).version;

        if ($IsWindows)
        {
            $platform = 'win32'; $exeRelative = 'electron.exe';
            $cacheRoot = Join-Path $env:LOCALAPPDATA 'electron/Cache';
        }
        elseif ($IsMacOS)
        {
            $platform = 'darwin'; $exeRelative = 'Electron.app/Contents/MacOS/Electron';
            $cacheRoot = Join-Path $HOME 'Library/Caches/electron';
        }
        else
        {
            $platform = 'linux'; $exeRelative = 'electron';
            $cacheRoot = Join-Path $HOME '.cache/electron';
        }

        $arch = switch ([System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture)
        {
            'X64' { 'x64' }
            'Arm64' { 'arm64' }
            default { throw "Unsupported architecture: $_" }
        };

        $zipName = "electron-v$version-$platform-$arch.zip";
        Write-Verbose "Looking for cached archive: $zipName under $cacheRoot";

        $zip = Get-ChildItem $cacheRoot -Recurse -Filter $zipName -ErrorAction SilentlyContinue |
            Select-Object -First 1;
        if (!$zip)
        {
            throw "Electron binary is broken and no cached archive ($zipName) was found under $cacheRoot. Try removing node_modules/electron and reinstalling.";
        }

        if (Test-Path $distDir)
        {
            Remove-Item $distDir -Recurse -Force;
        }
        New-Item -ItemType Directory -Path $distDir | Out-Null;

        Write-Verbose "Extracting $($zip.FullName) -> $distDir";
        Expand-Archive -Path $zip.FullName -DestinationPath $distDir -Force;

        Set-Content -Path (Join-Path $electronDir 'path.txt') -Value $exeRelative -NoNewline;

        Write-Verbose 'Electron binary repaired.';
    }

    function RunInstall([switch]$OnlyIfNotAlreadyInstalled)
    {
        if ($SkipInstall)
        {
            Write-Verbose 'Skipping install step as per parameter.';
            return;
        }

        if ($OnlyIfNotAlreadyInstalled -and (Test-Path 'node_modules'))
        {
            Write-Verbose 'Skipping npm install because node_modules already exists.';
            EnsureElectron;
            return;
        }

        WriteHeader 'Installing dependencies (npm install)' -ForegroundColor Cyan;
        RunCommand 'npm' @('install') -QuietOnSuccess:$Quiet;
        EnsureElectron;
    }

    function RunBuild()
    {
        if ($SkipBuild)
        {
            Write-Verbose 'Skipping build step as per parameter.';
            return;
        }

        WriteHeader 'Building (electron-vite build)' -ForegroundColor Cyan;
        RunCommand 'npm' @('run', 'build') -QuietOnSuccess:$Quiet;
    }

    function RunTest()
    {
        WriteHeader 'Testing (Playwright acceptance)' -ForegroundColor Cyan;

        $a = @('playwright', 'test');
        if ($TestFilter)
        {
            $a += @('-g', $TestFilter);
        }
        if ($Headed)
        {
            $a += '--headed';
        }
        if ($ListTests)
        {
            $a += '--list';
        }

        RunCommand 'npx' $a;
    }

    function RunDev()
    {
        WriteHeader 'Running (electron-vite dev)' -ForegroundColor Cyan;
        RunCommand 'npm' @('run', 'dev');
    }

    Write-Verbose "Parameter set name: $($PSCmdlet.ParameterSetName)";
    switch ($PSCmdlet.ParameterSetName)
    {
        'Install'
        {
            RunInstall
        }

        'Build'
        {
            RunInstall -OnlyIfNotAlreadyInstalled
            RunBuild
        }

        'Test'
        {
            RunInstall -OnlyIfNotAlreadyInstalled
            RunBuild
            RunTest
        }

        'Run'
        {
            RunInstall -OnlyIfNotAlreadyInstalled
            RunDev
        }

        default { throw "Unknown parameter set: $($PSCmdlet.ParameterSetName)" }
    }
}
finally
{
    Pop-Location;
}
