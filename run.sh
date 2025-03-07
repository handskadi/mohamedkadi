#!/bin/bash

APP_DIR="/var/www/mkweb/mkapp"
LOG_FILE="$APP_DIR/nextjs.log"

if [ "$1" == "dev" ]; then
    echo "🔄 Switching to Development Mode..."
    pkill -f "next-server"  # Stop production
    cd $APP_DIR
    echo "🚀 Starting Next.js in Development Mode..."
    HOST=0.0.0.0 PORT=3010 npm run dev

elif [ "$1" == "prod" ]; then
    echo "🔄 Switching to Production Mode..."
    pkill -f "npm run dev"  # Stop development
    pkill -f "next-server"  # Stop any existing production server
    cd $APP_DIR
    
    echo "⚙️ Building Next.js for Production..."
    rm -rf .next  # Delete old build
    npm run build

    echo "🚀 Starting Next.js in Production Mode..."
    nohup npm run start > $LOG_FILE 2>&1 &
    echo "✅ Next.js is now running in Production Mode."

else
    echo "❌ Invalid option! Use: ./switch-mode.sh dev | prod"
fi
