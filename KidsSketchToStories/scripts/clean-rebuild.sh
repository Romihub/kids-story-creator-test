#!/bin/bash

echo "Cleaning project..."

# Remove node_modules and reinstall
rm -rf node_modules
rm -rf package-lock.json

# Clean Android build
cd android
./gradlew clean
cd ..

# Clean Metro bundler cache
rm -rf $TMPDIR/metro-*
watchman watch-del-all

echo "Installing dependencies..."
npm install

echo "Building Android project..."
cd android
./gradlew assembleDebug
cd ..

echo "Clean and rebuild complete!"
