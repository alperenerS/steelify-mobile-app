import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet } from 'react-native';
import { Appbar, Switch, Text } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GetWorkScreen from '../screens/getWorkScreen';
import homeIcon from '../assets/home.png';
import tasksIcon from '../assets/tasks.png';
import profileIcon from '../assets/profile.png';

type TabParamList = {
  Anasayfa: undefined;
  İşlerim: undefined;
  Profilim: undefined;
  Ürünler: undefined; // Yeni sekme
};

const Tab = createBottomTabNavigator<TabParamList>();

interface CustomHeaderProps {
  isCarouselMode: boolean;
  setIsCarouselMode: (mode: boolean) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ isCarouselMode, setIsCarouselMode }) => (
  <Appbar.Header>
    <Appbar.Content title="İşlerim" />
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{isCarouselMode ? 'Galeri Görünümü' : 'Liste Görünümü'}</Text>
      <Switch
        value={isCarouselMode}
        onValueChange={() => setIsCarouselMode(!isCarouselMode)}
      />
    </View>
  </Appbar.Header>
);

const TabNavigator: React.FC = () => {
  const [isCarouselMode, setIsCarouselMode] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="İşlerim"
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
        name="İşlerim"
        children={() => <TasksScreen isCarouselMode={isCarouselMode} setIsCarouselMode={setIsCarouselMode} />}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={tasksIcon} style={{ width: 30, height: 30, tintColor: color }} />
          ),
          header: () => <CustomHeader isCarouselMode={isCarouselMode} setIsCarouselMode={setIsCarouselMode} />,
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
      <Tab.Screen
        name="Ürünler"
        component={GetWorkScreen} // Yeni sekme bileşeni
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={profileIcon} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default TabNavigator;
