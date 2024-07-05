import React from 'react';
import { View, Text } from 'react-native';
import homestyles from '../components/Home';

const HomeScreen = () => {
  return (
    <View style={homestyles.container}>
      <Text style={homestyles.text}>Homepage</Text>
    </View>
  );
}
export default HomeScreen;
