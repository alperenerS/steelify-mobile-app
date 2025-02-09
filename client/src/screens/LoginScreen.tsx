import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {login} from '../services/authService';
import {storeData, getData} from '../utils/storage';
import loginstyles from '../components/Login';
import yenalogo from '../assets/yena_logo.png';
import {getUserInfo} from '../services/profileService';
import {getWorks} from '../services/workService';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    const retrieveData = async () => {
      const storedPhone = await getData('userPhone');
      const storedPassword = await getData('userPassword');
      if (storedPhone) setPhone(storedPhone);
      if (storedPassword) setPassword(storedPassword);
    };
    retrieveData();
  }, []);

  const handleLogin = async () => {
    try {
      const token = await login(phone, password);
      await storeData('userToken', token);
      await storeData('userPhone', phone);
      await storeData('userPassword', password);
      await getUserInfo(token);
      await getWorks(token);
      navigation.navigate('Main');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Hata', error.message);
      }
    }
  };
  return (
    <View style={loginstyles.container}>
      <Image source={yenalogo} style={loginstyles.logo} />
      <View style={loginstyles.inputView}>
        <TextInput
          style={loginstyles.inputText}
          placeholder="Telefon Numarası"
          placeholderTextColor="black"
          onChangeText={setPhone}
          value={phone}
        />
      </View>
      <View style={loginstyles.inputView}>
        <TextInput
          style={loginstyles.inputText}
          placeholder="Parola"
          placeholderTextColor="black"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={loginstyles.loginBtn} onPress={handleLogin}>
        <Text style={loginstyles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
