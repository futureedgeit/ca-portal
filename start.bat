@echo off
cd /d "%~dp0"

if not exist "node_modules" (
    echo [ERROR] Dependencies not installed. Run setup.bat first.
    pause
    exit /b 1
)

if not exist "server\node_modules" (
    echo [ERROR] Backend dependencies not installed. Run setup.bat first.
    pause
    exit /b 1
)

node launcher.js
pause
