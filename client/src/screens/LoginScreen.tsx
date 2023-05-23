import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // import StackNavigationProp
import { login } from '../services/authService';
import { storeData } from '../utils/storage';

type RootStackParamList = {
    Login: undefined;
    Main: undefined;
  }
  
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>(); // add type for useNavigation

  const handleLogin = async () => {
    try {
      const token = await login(phone, password);
      await storeData('userToken', token);
      navigation.navigate('Main'); // navigate to Main screen after login
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Hata', error.message);
      }
    }
  };

  return (
    <View>
      <TextInput placeholder="Telefon Numarası" onChangeText={setPhone} value={phone} />
      <TextInput placeholder="Parola" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Giriş Yap" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
