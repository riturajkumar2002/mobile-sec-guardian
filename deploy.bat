@echo off
chcp 65001 >nul
echo 🛡️ Mobile Security Guardian - Deployment Script
echo ================================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2 delims=." %%a in ('node -v') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% lss 18 (
    echo ❌ Node.js version 18+ is required. Current version: 
    node -v
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node -v

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm version: 
npm -v

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Run linting
echo 🔍 Running linting checks...
npm run lint

if %errorlevel% neq 0 (
    echo ⚠️  Linting issues found. Continuing with deployment...
) else (
    echo ✅ Linting passed
)

REM Build the application
echo 🏗️ Building application...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build completed successfully

REM Check if build directory exists
if not exist "dist" (
    echo ❌ Build directory 'dist' not found
    pause
    exit /b 1
)

echo 📁 Build output:
dir dist

REM Test preview locally (optional)
set /p PREVIEW="🚀 Test preview locally? (y/n): "
if /i "%PREVIEW%"=="y" (
    echo 🌐 Starting preview server...
    echo 📱 Your app will be available at: http://localhost:4173
    echo ⏹️  Press Ctrl+C to stop the preview server
    npm run preview
)

echo.
echo 🎉 Deployment preparation completed!
echo.
echo 📋 Next steps:
echo 1. Push your code to GitHub:
echo    git add .
echo    git commit -m "Prepare for deployment"
echo    git push origin main
echo.
echo 2. Deploy on Render:
echo    - Go to https://dashboard.render.com
echo    - Click "New +" → "Blueprint"
echo    - Connect your GitHub repository
echo    - Click "Apply" to deploy
echo.
echo 📖 For detailed deployment instructions, see: DEPLOYMENT.md
echo.
echo 🛡️ Happy deploying! Your Mobile Security Guardian will be live soon!
pause

