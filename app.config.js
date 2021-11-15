// Android prev. build number: 8
// Apple prev. buildNumber: "1"
export default {
  name: "SUEP",
  icon: "./Assets/suep_icon.png",
  version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.1.1',
  orientation: "portrait",
  splash: {
    "image": "./Assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#FFFFFF",
  },
  updates: {
    "fallbackToCacheTimeout": 10000
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    "icon": "./Assets/appstore.png",
    "buildNumber": "2",
    "bundleIdentifier": "me.t-pot.suepapp",
    "infoPlist": {
      "CFBundleDevelopmentRegion": "ja_JP",
    }
  },
  android: {
    "adaptiveIcon": {
      "foregroundImage": "./Assets/suep_icon.png",
      "backgroundColor": "#FFFFFF"
    },
    "package": "com.tpot.suepapp",
    "versionCode": 9,
    "permissions": [],
  },
  extra: {
    'googleKey': 'AIzaSyDn6mliAUKXl1AOXJ_2GNm9LZGQ9fY9TI0',
    'clubsSheetId': '1iOf5XVafqH0L8t0XZVShUgMFp8Yegctq_qUOU6rCGqI',
    'commSheetId': '1qC2PzBRH4BE0BfnykaMgstFYHs2Tf-vwl1bisIqk0Hs',
    'univSheetId': '1jX3EvGqZ-eYrFowpIEfw75qgekJL8m3WfYbLfNecRb4',
  },
};
