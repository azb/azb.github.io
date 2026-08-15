# PowerShell script to start the NameTagsXR local network server
Write-Host "Starting NameTagsXR local network server..." -ForegroundColor Green
Write-Host ""

$pythonCmd = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCmd) {
    $pythonCmd = Get-Command python3 -ErrorAction SilentlyContinue
}

if ($pythonCmd) {
    Write-Host "Headset over USB: run start-quest.bat, then open http://127.0.0.1:8080/" -ForegroundColor Cyan
    Write-Host "This PC:          http://localhost:8080/" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    python server.py
} else {
    Write-Host "Python not found. Install Python from https://www.python.org/downloads/" -ForegroundColor Red
    pause
}
