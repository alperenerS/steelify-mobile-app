import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // import StackNavigationProp
import { login } from '../services/authService';
import { storeData } from '../utils/storage';
import loginstyles from '../components/Login';
import yenalogo from '../assets/yena_logo.png';

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
    <View style={loginstyles.container}>
      <Image source={yenalogo} style={loginstyles.logo}/>
      <View style={loginstyles.inputView} >
        <TextInput style={loginstyles.inputText} placeholder="Telefon Numarası" placeholderTextColor="black" onChangeText={setPhone} value={phone} />
      </View>
      <View style={loginstyles.inputView} >
        <TextInput style={loginstyles.inputText} placeholder="Parola" placeholderTextColor="black" onChangeText={setPassword} value={password} secureTextEntry />
      </View>    
      <TouchableOpacity style={loginstyles.loginBtn} onPress={handleLogin}>
          <Text style={loginstyles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );  
};

export default LoginScreen;
