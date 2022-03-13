import checkVersion from 'react-native-store-version';
import Constants from 'expo-constants';

const checkUpdate = async () => {
  const version = Constants.manifest.version;
  const res = await checkVersion({
    version: version, // app local version
    androidStoreURL:
      'https://play.google.com/store/apps/details?id=com.tpot.suepapp',
    country: 'jp', // default value is 'jp'
  });
  return res;
};

export default checkUpdate;
