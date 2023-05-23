import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import ProfileScreen from '../screens/ProfileScreen';

type TabParamList = {
  Anasayfa: undefined;
  Görevlerim: undefined;
  Profilim: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Anasayfa">
      <Tab.Screen name="Anasayfa" component={HomeScreen} />
      <Tab.Screen name="Görevlerim" component={TasksScreen} />
      <Tab.Screen name="Profilim" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;