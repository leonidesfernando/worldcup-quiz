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
echo Copying splash images and icons
cmd /c copy /Y "src\assets\splash\android-splash-480x800.png" "android\app\src\main\res\drawable-land-hdpi\splash.png"
cmd /c copy /Y "src\assets\splash\android-splash-480x320.png" "android\app\src\main\res\drawable-land-mdpi\splash.png"
cmd /c copy /Y "src\assets\splash\android-splash-1280x720.png" "android\app\src\main\res\drawable-land-xhdpi\splash.png"
cmd /c copy /Y "src\assets\splash\android-splash-1600x960.png" "android\app\src\main\res\drawable-land-xxhdpi\splash.png"
cmd /c copy /Y "src\assets\splash\android-splash-1920x1280.png" "android\app\src\main\res\drawable-land-xxxhdpi\splash.png"
cmd /c copy /Y "src\assets\splash\android-splash-480x800.png" "android\app\src\main\res\drawable-port-hdpi\splash.png"
cmd /c copy /Y "src\assets\splash\android-splash-320x480.png" "android\app\src\main\res\drawable-port-mdpi\splash.png"
cmd /c copy /Y "src\assets\splash\android-splash-720x1280.png" "android\app\src\main\res\drawable-port-xhdpi\splash.png"
cmd /c copy /Y "src\assets\splash\android-splash-960x1600.png" "android\app\src\main\res\drawable-port-xxhdpi\splash.png"
cmd /c copy /Y "src\assets\splash\android-splash-1280x1920.png" "android\app\src\main\res\drawable-port-xxxhdpi\splash.png"
cmd /c copy /Y "src\assets\icons\mipmap-hdpi\ic_launcher.png" "android\app\src\main\res\mipmap-hdpi\ic_launcher.png"
cmd /c copy /Y "src\assets\icons\mipmap-hdpi\ic_launcher.png" "android\app\src\main\res\mipmap-hdpi\ic_launcher_round.png"
cmd /c copy /Y "src\assets\icons\mipmap-hdpi\ic_launcher_adaptive_fore.png" "android\app\src\main\res\mipmap-hdpi\ic_launcher_foreground.png"
cmd /c copy /Y "src\assets\icons\mipmap-mdpi\ic_launcher.png" "android\app\src\main\res\mipmap-mdpi\ic_launcher.png"
cmd /c copy /Y "src\assets\icons\mipmap-mdpi\ic_launcher.png" "android\app\src\main\res\mipmap-mdpi\ic_launcher_round.png
cmd /c copy /Y "src\assets\icons\mipmap-mdpi\ic_launcher_adaptive_fore.png" "android\app\src\main\res\mipmap-mdpi\ic_launcher_foreground.png"
cmd /c copy /Y "src\assets\icons\mipmap-xhdpi\ic_launcher.png" "android\app\src\main\res\mipmap-xhdpi\ic_launcher.png"
cmd /c copy /Y "src\assets\icons\mipmap-xhdpi\ic_launcher.png" "android\app\src\main\res\mipmap-xhdpi\ic_launcher_round.png
cmd /c copy /Y "src\assets\icons\mipmap-xhdpi\ic_launcher_adaptive_fore.png" "android\app\src\main\res\mipmap-xhdpi\ic_launcher_foreground.png"
cmd /c copy /Y "src\assets\icons\mipmap-xxhdpi\ic_launcher.png" "android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png"
cmd /c copy /Y "src\assets\icons\mipmap-xxhdpi\ic_launcher.png" "android\app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png
cmd /c copy /Y "src\assets\icons\mipmap-xxhdpi\ic_launcher_adaptive_fore.png" "android\app\src\main\res\mipmap-xxhdpi\ic_launcher_foreground.png"
cmd /c copy /Y "src\assets\icons\mipmap-xxxhdpi\ic_launcher.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png"
cmd /c copy /Y "src\assets\icons\mipmap-xxxhdpi\ic_launcher.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png
cmd /c copy /Y "src\assets\icons\mipmap-xxxhdpi\ic_launcher_adaptive_fore.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_foreground.png"


echo.
echo Opening on Android Studio ...
call npx cap run android

echo.
echo Done!