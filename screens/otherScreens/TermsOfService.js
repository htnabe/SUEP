import * as React from 'react';
import { WebView } from 'react-native-webview';
import commonStyles from '../../commonStyle/commonStyle';

export default function TermsOfService() {
  return (
    <WebView
      style={[commonStyles.viewPageContainer, commonStyles.centeredView]}
      source={{ uri: 'https://suep.netlify.app/post/terms/' }}
    />
  );
}
