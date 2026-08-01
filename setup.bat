@echo off
cd /d "%~dp0"
echo ============================================
echo   CA Portal - Setup
echo ============================================
echo.
echo Checking Node.js...

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js from https://nodejs.org (v18 or later)
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do echo Node version: %%v

echo.
echo [1/3] Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend install failed
    pause
    exit /b 1
)

echo.
echo [2/3] Installing backend dependencies...
cd server
call npm install
echo Ensuring native modules match Node version...
call npm rebuild
cd ..
if %errorlevel% neq 0 (
    echo [ERROR] Backend install failed
    pause
    exit /b 1
)

echo.
echo [3/3] Seeding database...
cd server
node seed.js
cd ..

echo.
echo ============================================
echo   Setup complete!
echo ============================================
echo.
echo To start the app, double-click start.bat
echo.
pause
