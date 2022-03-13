import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const removeStoredData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export default removeStoredData;
