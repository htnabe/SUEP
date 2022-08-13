import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';
import executeOnlyInDevMode from './executeOnlyInDevMode';

// 主に連想配列を読み込む際に利用
const readArrayData = async (key) => {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    if (stringValue != null) {
      return JSON.parse(stringValue);
    } else {
      executeOnlyInDevMode(
        console.log(`このkeyには対応する値がありません : ${key}`)
      );
      return null;
    }
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export default readArrayData;
