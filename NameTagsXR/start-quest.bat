@echo off
cd /d "%~dp0"
echo Forwarding headset localhost:8080 to this PC...
echo Enable USB debugging on the headset, then plug it in.
echo.

set ADB=adb
where adb >nul 2>&1
if errorlevel 1 (
  if exist "%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" set ADB=%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe
)

"%ADB%" reverse tcp:8080 tcp:8080
if errorlevel 1 (
  echo.
  echo adb reverse failed. Install Android Platform Tools and enable USB debugging.
  echo You can still try Wi-Fi, but headset XR often needs http://127.0.0.1:8080/
  echo.
) else (
  echo.
  echo On the headset browser open:
  echo   http://127.0.0.1:8080/
  echo Choose Local network, then Enter Room.
  echo.
)

python server.py
pause
