import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

// 外部関数のインポート
import About from './screens/otherScreens/About';
import PrivacyPolicy from './screens/otherScreens/PrivacyPolicy';
import TermsOfService from './screens/otherScreens/TermsOfService';
import LectureApp from './screens/lectureScreens/LectureApp';
import BottomTabNavigator from './screens/main/BottomTabNavigator';

Sentry.init({
  dsn: Constants.manifest.extra.sentryDNS,
  enableInExpoDevelopment: false, // If 'true', all your dev/local errors will be reported to Sentry
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" animated={true} />
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
    </>
  );
}
