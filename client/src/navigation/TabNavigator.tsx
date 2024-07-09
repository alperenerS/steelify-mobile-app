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
  Homepage: undefined;
  Works: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Works"
      screenOptions={{
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
      }}
    >
      <Tab.Screen
        name="Homepage"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={homeIcon} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Works"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={tasksIcon} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
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
