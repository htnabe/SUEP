import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';
import { View, StyleSheet } from 'react-native';

// 外部関数のインポート
import About from './screens/otherScreens/About';
import PrivacyPolicy from './screens/otherScreens/PrivacyPolicy';
import TermsOfService from './screens/otherScreens/TermsOfService';
import LectureApp from './screens/lectureScreens/LectureApp';
import BottomTabNavigator from './screens/main/BottomTabNavigator';
import CustomedIndicator from './commonComponent/CustomedIndicator';
import commonStyles from './commonStyle/commonStyle';
import removeStoredData from './commonUtil/removeStoredData';
import checkUpdate from './screens/main/checkUpdate';
import forceUpdate from './screens/main/forceUpdate';

Sentry.init({
  dsn: 'https://469ba9b84acd4a2f8809380fbe6275b3@o1070044.ingest.sentry.io/6086543',
  enableInExpoDevelopment: false, // If 'true', all your dev/local errors will be reported to Sentry
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const Drawer = createDrawerNavigator();

export default function App() {
  const [mainVisible, setMainVisibility] = useState(false);
  useEffect(() => {
    // 'tableKey'で呼び出されるデータはver1.1.2移行使われないので削除
    // ver1.1.4への移行時にはここを削除
    removeStoredData('tableKey');

    async function init() {
      const update = await checkUpdate();
      if (update.result === 'new') {
        forceUpdate();
      } else {
        setMainVisibility(true);
      }
    }
    init();
  }, []);

  const Indicator = () => (
    <View style={[commonStyles.viewPageContainer, commonStyles.centeredView]}>
      <CustomedIndicator />
    </View>
  );

  return (
    <>
      {!mainVisible && <Indicator />}
      {mainVisible && (
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen
              name="時間割ホーム"
              component={LectureApp}
              options={{
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="イベント情報"
              component={BottomTabNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="利用規約"
              component={TermsOfService}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <FontAwesome5
                    name="bars"
                    size={24}
                    onPress={() => {
                      navigation.openDrawer();
                    }}
                    style={{ paddingLeft: 20, color: '#1DA1F2' }}
                  />
                ),
              })}
            />
            <Drawer.Screen
              name="プライバシーポリシー"
              component={PrivacyPolicy}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <FontAwesome5
                    name="bars"
                    size={24}
                    onPress={() => {
                      navigation.openDrawer();
                    }}
                    style={{ paddingLeft: 20, color: '#1DA1F2' }}
                  />
                ),
              })}
            />
            <Drawer.Screen
              name="このアプリについて"
              component={About}
              options={{
                headerShown: false,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
