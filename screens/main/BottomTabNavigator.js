import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// 外部関数のインポート
import Clubs from '../eventScreens/Clubs';
import Community from '../eventScreens/Community';
import University from '../eventScreens/University';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          color: 'black',
        },
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
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'コミュニティ') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'サークル') {
            iconName = focused ? 'school' : 'school-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === '大学オフィシャル') {
            return <FontAwesome5 name="university" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="サークル" component={Clubs} />
      <Tab.Screen name="コミュニティ" component={Community} />
      <Tab.Screen name="大学オフィシャル" component={University} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
