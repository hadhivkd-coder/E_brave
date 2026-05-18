# Antigravity & Projects Comprehensive Backup Script
# Created by Antigravity AI

$ErrorActionPreference = "Continue"

$backupRoot = "C:\Users\Shafeeq\Antigravity_Backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Antigravity Backup System" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Destination: $backupRoot" -ForegroundColor Gray
Write-Host ""

# --- 1. Database Backups ---
Write-Host "[1/3] Exporting SQL Server Databases..." -ForegroundColor Yellow
$databases = @("AMC", "HadeoxHubDb")
$server = "DESKTOP-M83D7F5\SQL19"
$user = "sa"
$pass = "123"

foreach ($db in $databases) {
    $bakFile = Join-Path $backupRoot "$($db).bak"
    Write-Host "   -> Backing up $db to $bakFile..." -ForegroundColor Gray
    try {
        & sqlcmd -S $server -U $user -P $pass -Q "BACKUP DATABASE [$db] TO DISK = '$bakFile' WITH FORMAT, MEDIANAME = 'AntigravityBackup', NAME = 'Full Backup of $db'"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "      SUCCESS: $db backed up." -ForegroundColor Green
        } else {
            Write-Host "      FAILED: $db backup failed. Check if SQL Server is running and credentials are correct." -ForegroundColor Red
        }
    } catch {
        Write-Host "      ERROR: Could not run sqlcmd. Ensure SQL Server Command Line Tools are installed." -ForegroundColor Red
    }
}

# --- 2. Project Files Backup ---
Write-Host "[2/3] Zipping Project Files..." -ForegroundColor Yellow
$projectsPath = "e:\Antigravity\WEBSITES"
$projectsZip = Join-Path $backupRoot "Websites_Projects.zip"

if (Test-Path $projectsPath) {
    Write-Host "   -> Zipping $projectsPath..." -ForegroundColor Gray
    Compress-Archive -Path "$projectsPath\*" -DestinationPath $projectsZip -Force
    Write-Host "      SUCCESS: Projects zipped to $projectsZip" -ForegroundColor Green
} else {
    Write-Host "      FAILED: Projects path $projectsPath not found." -ForegroundColor Red
}

# --- 3. Antigravity Agent Data Backup ---
Write-Host "[3/3] Zipping Antigravity Agent Data..." -ForegroundColor Yellow
$agentDataPath = "C:\Users\Shafeeq\.gemini\antigravity"
$agentDataZip = Join-Path $backupRoot "Antigravity_AgentData.zip"

if (Test-Path $agentDataPath) {
    Write-Host "   -> Zipping $agentDataPath..." -ForegroundColor Gray
    # Exclude logs or large temp files if necessary, but here we take everything
    Compress-Archive -Path "$agentDataPath\*" -DestinationPath $agentDataZip -Force
    Write-Host "      SUCCESS: Agent data zipped to $agentDataZip" -ForegroundColor Green
} else {
    Write-Host "      FAILED: Agent data path $agentDataPath not found." -ForegroundColor Red
}

# --- Final Summary ---
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Backup Completed!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Location: $backupRoot" -ForegroundColor White
Write-Host ""
Write-Host "To finish the backup, please upload the contents of the folder above to your Google Drive link:"
Write-Host "https://drive.google.com/drive/folders/1bDfcisuT3muYeyoqKdQc6J-XgiPlvo3G?usp=sharing" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
