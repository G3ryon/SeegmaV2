adb devices
pause
adb -s d62bdfb0 reverse tcp:8081 tcp:8081
pause
npx react-native run-android
pause