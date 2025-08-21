#!/bin/bash

# 🚀 Mobile Security Guardian Deployment Script
# This script automates the build and deployment process

echo "🛡️ Mobile Security Guardian - Deployment Script"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run linting
echo "🔍 Running linting checks..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️  Linting issues found. Continuing with deployment..."
else
    echo "✅ Linting passed"
fi

# Build the application
echo "🏗️ Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check if build directory exists
if [ ! -d "dist" ]; then
    echo "❌ Build directory 'dist' not found"
    exit 1
fi

echo "📁 Build output:"
ls -la dist/

# Test preview locally (optional)
read -p "🚀 Test preview locally? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Starting preview server..."
    echo "📱 Your app will be available at: http://localhost:4173"
    echo "⏹️  Press Ctrl+C to stop the preview server"
    npm run preview
fi

echo ""
echo "🎉 Deployment preparation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy on Render:"
echo "   - Go to https://dashboard.render.com"
echo "   - Click 'New +' → 'Blueprint'"
echo "   - Connect your GitHub repository"
echo "   - Click 'Apply' to deploy"
echo ""
echo "📖 For detailed deployment instructions, see: DEPLOYMENT.md"
echo ""
echo "🛡️ Happy deploying! Your Mobile Security Guardian will be live soon!"

