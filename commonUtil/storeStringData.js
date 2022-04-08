import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export default saveData;
