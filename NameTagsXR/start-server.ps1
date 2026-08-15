# PowerShell script to start the NameTagsXR local network server
Write-Host "Starting NameTagsXR local network server..." -ForegroundColor Green
Write-Host ""

$pythonCmd = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCmd) {
    $pythonCmd = Get-Command python3 -ErrorAction SilentlyContinue
}

if ($pythonCmd) {
    Write-Host "Open the HTTPS URL the server prints on every device." -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    python server.py
} else {
    Write-Host "Python not found. Install Python from https://www.python.org/downloads/" -ForegroundColor Red
    pause
}
