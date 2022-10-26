// update versionCode everytime the app is updated
import 'dotenv/config';

export default {
  name: 'SUEP',
  icon: './assets/suep_icon.png',
  version: '1.1.6',
  orientation: 'portrait',
  jsEngine: 'hermes',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: ['**/*'],
  updates: {
    fallbackToCacheTimeout: 10000,
  },
  android: {
    package: 'com.tpot.suepapp',
    versionCode: 19,
    permissions: [],
    adaptiveIcon: {
      foregroundImage: './assets/suep_icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  plugins: ['sentry-expo'],
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: process.env.SENTRY_ORGANIZATION,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_TOKEN,
        },
      },
    ],
  },
  extra: {
    sentryDNS: process.env.SENTRY_DNS,
    googleKey: process.env.GOOGLE_SPREADSHEET_API_KEY,
    clubsSheetId: process.env.CLUB_SPREADSHEET_ID,
    commSheetId: process.env.COMMUNITY_SPREADSHEET_ID,
    univSheetId: process.env.UNIVERSITY_SPREADSHEET_ID,
    eas: {
      projectId: '6b0e2c19-8c89-4ce4-a103-ea5e33662d64',
    },
  },
};
