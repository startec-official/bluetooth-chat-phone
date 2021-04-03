# Bluetooth Chat - Android Phone Code

A sample chat service to demonstrate android-phone to Raspberry Pi bluetooth communication via serial. This repository is the codebase for the android phone.

## Ionic Framework

This example uses the Ionic framework for development. Ionic is a framework that allows users to build cross-platform mobile apps using web technologies. This project uses Angular as the base web framework.

To learn how to install Ionic for your projects, check out this [link](https://ionicframework.com/docs/intro/cli).

## Yarn package manager

This project uses yarn for package management. Be sure to [install yarn](https://classic.yarnpkg.com/en/docs/install) if you haven't already.

## Deployment

To deploy this project to an Android device, you will need the following:

1. Android Studio and Android SDK for Android version 10 and above.
2. Ionic and the Ionic CLI
3. A good internet connection for downloading required packages

To deploy to an Android device, follow these steps:

1. Navigate to your project root directory (if your IDE hadn't done so already)
2. Run the following commands in your terminal:

```
ionic build
npx cap add android
npx cap sync
ionic cap run android
```

3. This will open an Android Studio Window of your generated Android project. In case you haven't been automatically navigated, navigated to the newly opened Android Studio Window. Wait for the files to finish syncing and indexing.
4. After the indexing is finished, connect your Android phone via USB to your computer. Be sure to turn on *USB Debugging* in your **Developer Options** in **Settings**.
5. Once the program detects your device, click the run button in the toolbar (the green play button) to see the app in action.
