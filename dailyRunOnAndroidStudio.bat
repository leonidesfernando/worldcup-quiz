@echo off
setlocal EnableDelayedExpansion

echo.
echo World Cup Quiz - Capacitor Android Executor Helper
echo ==================================================
echo.

echo Cleaning cache ...
pushd android
call gradlew.bat clean
popd

echo Building app ...
call npm run build

echo.
echo Synchronizing to Android ...
call npx cap sync android --deployment

echo.
echo Opening on Android Studio ...
call npx cap run android

echo.
echo Done!
pause