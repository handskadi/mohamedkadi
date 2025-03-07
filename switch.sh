#!/bin/bash

APP_DIR="/var/www/mkweb/mkapp"
LOG_FILE="$APP_DIR/nextjs.log"

if [ "$1" == "dev" ]; then
    echo "🔄 Starting Development Mode on port 3010..."
    cd $APP_DIR

    # Keep Production Running, Just Start Dev Mode
    echo "🚀 Running Next.js in Development Mode on port 3010..."
    HOST=0.0.0.0 PORT=3010 npm run dev

    echo "✅ Dev Mode is running in foreground on port 3010."
    echo "🌍 Access Dev at: http://YOUR_SERVER_IP:3010"
    echo "🌍 Production is still live at: https://mohamedkadi.com"

elif [ "$1" == "prod" ]; then
    echo "🔄 Switching to Production Mode..."
    
    # Stop Development Mode (If Running)
    pkill -f "npm run dev"

    # Restart Production Mode
    cd $APP_DIR
    echo "⚙️ Building Next.js for Production..."
    rm -rf .next  # Delete old build
    npm run build

    echo "🚀 Restarting Next.js in Production Mode on port 3000..."
    pkill -f "next-server"  # Stop existing production process
    nohup npm run start > $LOG_FILE 2>&1 &

    echo "✅ Production Mode is now running on port 3000."
    echo "🔄 Restarting Nginx..."
    sudo systemctl restart nginx
    echo "✅ Nginx restarted successfully."

else
    echo "❌ Invalid option! Use: ./switch-mode.sh dev | prod"
fi
