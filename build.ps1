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

    # Lint and format-check (ESLint + Prettier + tsc)
    [Parameter(ParameterSetName = 'Lint', Position = 0)]
    [switch]$DoLint,

    # With -DoLint: auto-fix lint and formatting issues instead of just checking
    [Parameter(ParameterSetName = 'Lint')]
    [switch]$Fix,

    [Parameter(ParameterSetName = 'Build')]
    [Parameter(ParameterSetName = 'Test')]
    [Parameter(ParameterSetName = 'Run')]
    [Parameter(ParameterSetName = 'Lint')]
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

    # Returns $true when node_modules/electron has a fully extracted binary.
    # A gated/partial postinstall leaves the dir missing or a tiny stub.
    function Test-ElectronHealthy([string]$DistDir)
    {
        if (!(Test-Path $DistDir))
        {
            return $false;
        }
        $sizeBytes = (Get-ChildItem $DistDir -Recurse -File -ErrorAction SilentlyContinue |
            Measure-Object -Property Length -Sum).Sum;
        return $sizeBytes -gt 100MB;
    }

    # Electron's postinstall can be gated or only partially run in some
    # environments, leaving the binary missing or a stub that fails to launch.
    # Repair it: first by running Electron's own installer (which downloads the
    # archive to the cache and extracts it), then — if that still leaves a stub —
    # by extracting the full archive from the Electron download cache manually.
    function EnsureElectron()
    {
        $electronDir = Join-Path 'node_modules' 'electron';
        if (!(Test-Path $electronDir))
        {
            Write-Verbose 'Electron not installed yet; skipping binary check.';
            return;
        }

        $distDir = Join-Path $electronDir 'dist';
        if (Test-ElectronHealthy $distDir)
        {
            Write-Verbose 'Electron binary looks healthy.';
            return;
        }

        WriteHeader 'Repairing Electron binary' -ForegroundColor Yellow;

        # First attempt: run Electron's own install script. This downloads the
        # archive (if not already cached) and extracts it. Handles the common
        # case where the postinstall never ran at all.
        Write-Verbose 'Running electron/install.js to download/extract the binary.';
        RunCommand 'node' @((Join-Path $electronDir 'install.js')) -QuietOnSuccess:$Quiet;
        if (Test-ElectronHealthy $distDir)
        {
            Write-Verbose 'Electron binary repaired via install.js.';
            return;
        }

        # Fallback: install.js left a stub (seen with some gated postinstalls).
        # Extract the full archive from the Electron download cache manually.
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

        if (!(Test-ElectronHealthy $distDir))
        {
            throw "Electron binary repair failed; dist is still incomplete after extracting $zipName.";
        }

        Write-Verbose 'Electron binary repaired from cache.';
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

        # Generate Playwright specs from the .feature files (playwright-bdd)
        # before running, so the Gherkin is the executable source of truth.
        RunCommand 'npx' @('bddgen') -QuietOnSuccess:$Quiet;

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

    function RunLint()
    {
        if ($Fix)
        {
            WriteHeader 'Linting (ESLint + Prettier, auto-fix)' -ForegroundColor Cyan;
            RunCommand 'npm' @('run', 'lint:fix') -QuietOnSuccess:$Quiet;
            RunCommand 'npm' @('run', 'format') -QuietOnSuccess:$Quiet;
        }
        else
        {
            WriteHeader 'Linting (ESLint + Prettier + tsc)' -ForegroundColor Cyan;
            RunCommand 'npm' @('run', 'lint') -QuietOnSuccess:$Quiet;
            RunCommand 'npm' @('run', 'format:check') -QuietOnSuccess:$Quiet;
            RunCommand 'npm' @('run', 'typecheck') -QuietOnSuccess:$Quiet;
        }
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

        'Lint'
        {
            RunInstall -OnlyIfNotAlreadyInstalled
            RunLint
        }

        default { throw "Unknown parameter set: $($PSCmdlet.ParameterSetName)" }
    }
}
finally
{
    Pop-Location;
}
