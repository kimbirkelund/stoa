@{
    ExcludeRules = @(
        # Write-Host is intentional in build scripts for colored console output.
        'PSAvoidUsingWriteHost',
        # UTF-8 without BOM is fine in modern PowerShell / cross-platform environments.
        'PSUseBOMForUnicodeEncodedFile'
    )

    Rules = @{
        # openBraceOnSameLine: false  (Allman preset)
        PSPlaceOpenBrace          = @{
            Enable             = $true
            OnSameLine         = $false
            NewLineAfter       = $true
            IgnoreOneLineBlock = $true
        }
        PSPlaceCloseBrace         = @{
            Enable             = $true
            NewLineAfter       = $true
            IgnoreOneLineBlock = $true
            NoEmptyLineBefore  = $false
        }
        # pipelineIndentationStyle: IncreaseIndentationForFirstPipeline
        PSUseConsistentIndentation = @{
            Enable              = $true
            Kind                = 'space'
            IndentationSize     = 4
            PipelineIndentation = 'IncreaseIndentationForFirstPipeline'
        }
        # trimWhitespaceAroundPipe + whitespaceBetweenParameters
        PSUseConsistentWhitespace = @{
            Enable                         = $true
            CheckInnerBrace                = $true
            CheckOpenBrace                 = $true
            CheckOpenParen                 = $true
            CheckOperator                  = $true
            CheckPipe                      = $true
            CheckPipeForRedundantWhitespace = $true
            CheckSeparator                 = $true
            CheckParameter                 = $true
        }
        # useCorrectCasing
        PSUseCorrectCasing        = @{
            Enable = $true
        }
        # autoCorrectAliases
        PSAvoidUsingCmdletAliases = @{
            Enable = $true
        }
        # useConstantStrings
        PSAvoidUsingDoubleQuotesForConstantString = @{
            Enable = $true
        }
    }
}
