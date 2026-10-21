@echo off
setlocal

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting website with Python...
    python -m http.server 8000
    exit /b 0
)

where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting website with Python Launcher...
    py -m http.server 8000
    exit /b 0
)

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting website with Node...
    npm install
    npm start
    exit /b 0
)

echo Python or Node is not installed. Please install Python 3 or Node.js LTS first.
pause
