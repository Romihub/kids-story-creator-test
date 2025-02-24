@echo off
echo Cleaning project...

:: Remove node_modules and reinstall
rmdir /s /q node_modules
del /f /q package-lock.json

:: Clean Android build
cd android
call gradlew clean
cd ..

:: Clean Metro bundler cache
rmdir /s /q %TEMP%\metro-*
watchman watch-del-all

echo Installing dependencies...
call npm install

echo Building Android project...
cd android
call gradlew assembleDebug
cd ..

echo Clean and rebuild complete!
pause
