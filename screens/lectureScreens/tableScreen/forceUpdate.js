import openUrl from './../../../commonUtil/openUrl';
import { Alert } from 'react-native';

const forceUpdate = () => {
  const url = 'https://play.google.com/store/apps/details?id=com.tpot.suepapp';
  const isCanselable = false;
  Alert.alert(
    'アップデートが必要です。',
    'ストアに移ってアップデートしてください。',
    [{ text: 'OK', onPress: () => openUrl(url, isCanselable) }],
    {
      cancelable: isCanselable,
    }
  );
};

export default forceUpdate;
