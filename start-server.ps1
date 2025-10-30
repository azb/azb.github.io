# PowerShell script to start a local web server
Write-Host "Starting local web server..." -ForegroundColor Green
Write-Host ""

# Check if Python is available
$pythonCmd = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCmd) {
    $pythonCmd = Get-Command python3 -ErrorAction SilentlyContinue
}

if ($pythonCmd) {
    Write-Host "Starting Python HTTP server on port 8000..." -ForegroundColor Yellow
    Write-Host "Open http://localhost:8000 in your browser" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    # Start server in background and open browser
    Start-Process "http://localhost:8000"
    python server.py
} else {
    Write-Host "Python not found. Trying alternative methods..." -ForegroundColor Red
    Write-Host ""
    
    # Try Node.js http-server if available
    $nodeCmd = Get-Command npx -ErrorAction SilentlyContinue
    if ($nodeCmd) {
        Write-Host "Starting Node.js http-server on port 8000..." -ForegroundColor Yellow
        npx --yes http-server -p 8000 -o
    } else {
        Write-Host "Please install Python or Node.js to run a local server." -ForegroundColor Red
        Write-Host ""
        Write-Host "Quick alternatives:" -ForegroundColor Yellow
        Write-Host "1. Install Python: https://www.python.org/downloads/" -ForegroundColor White
        Write-Host "2. Install Node.js: https://nodejs.org/" -ForegroundColor White
        Write-Host "3. Use VS Code Live Server extension" -ForegroundColor White
        Write-Host "4. Use PHP: php -S localhost:8000" -ForegroundColor White
        pause
    }
}

