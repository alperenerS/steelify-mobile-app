import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import homeIcon from '../assets/home.png';
import tasksIcon from '../assets/tasks.png';
import profileIcon from '../assets/profile.png';

type TabParamList = {
  Anasayfa: undefined;
  İşler: undefined;
  Profilim: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="İşler"
      screenOptions={{
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
      }}
    >
      <Tab.Screen
        name="Anasayfa"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={homeIcon} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="İşler"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={tasksIcon} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profilim"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={profileIcon} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;