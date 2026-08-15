@echo off
cd /d "%~dp0"
echo Starting NameTagsXR local network server...
echo.
echo Headset over USB: run start-quest.bat instead, then open http://127.0.0.1:8080/
echo This PC:          http://localhost:8080/
echo Press Ctrl+C to stop the server
echo.

netsh advfirewall firewall add rule name="NameTagsXR LAN" dir=in action=allow protocol=TCP localport=8080,8443 >nul 2>&1

python server.py

pause
