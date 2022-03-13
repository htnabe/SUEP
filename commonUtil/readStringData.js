import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const readStringData = async (key) => {
  try {
    let loadedData = await AsyncStorage.getItem(key);
    if (loadedData != null) {
      return loadedData;
    } else {
      return '';
    }
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export default readStringData;
