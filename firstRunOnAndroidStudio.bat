@echo off
setlocal EnableDelayedExpansion

echo.
echo World Cup Quiz - Capacitor Android Executor Helper - FIRST EXECUTION
echo =====================================================================
echo.

echo === First-time setup ===
echo .

echo 1. Installing dependencies...
call npm install


echo .
echo 2. Installing Capacitor packages...
call npm install @capacitor/core @capacitor/cli @capacitor/android

echo .
echo 3. Initializing Capacitor...
call npx cap init

echo .
echo 4. Building web app...
call npm run build

echo .
echo 5. Adding Android platform...
call npx cap add android

echo .
echo 6. Syncing to Android...
call npx cap sync android

echo .
echo 7. Running if you want to open Opening on Android Studio run npx cap open android
call npx cap run android

echo.
echo Done!
pause