import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';
import executeOnlyInDevMode from './executeOnlyInDevMode';

// 主に文字列を読み込む際に利用
const readStringData = async (key) => {
  try {
    let loadedData = await AsyncStorage.getItem(key);
    if (loadedData != null) {
      return loadedData;
    } else {
      executeOnlyInDevMode(
        console.log(`このkeyには対応する値がありません : ${key}`)
      );
      return '';
    }
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export default readStringData;
