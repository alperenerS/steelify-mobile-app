import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeData, getData } from '../utils/storage';
import { getUserInfo } from '../services/profileService';
import profilestyles from '../components/Profile';
import { useIsFocused } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const isFocused = useIsFocused(); 

  type UserInfo = {
    id: number;
    name: string;
    phone: string;
    role: string;
    related_company: string;
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = await getData('userToken');
      if (token) {
        const result = await getUserInfo(token);
        setUserInfo(result);
      }
    };
  
    if (isFocused) { // if the screen is focused, fetch data
      fetchUserInfo();
    }
  }, [isFocused]);
  
  const handleLogout = async () => {
    await removeData('userToken');
    setUserInfo(null); // userInfo state'ini sıfırlıyoruz
    navigation.navigate('Login');
  };
  
  return (
    <View style={profilestyles.container}>
      {userInfo ? (
        <>
          <View style={profilestyles.profileIconContainer}>
            <TouchableOpacity style={profilestyles.profileIcon}>
              <Text style={profilestyles.profileIconText}>P</Text>
            </TouchableOpacity>
          </View>
          <View style={profilestyles.infoContainer}>
            <Text style={profilestyles.label}>ID:</Text>
            <Text style={profilestyles.value}>{userInfo?.id}</Text>
          </View>
          <View style={profilestyles.infoContainer}>
            <Text style={profilestyles.label}>İsim:</Text>
            <Text style={profilestyles.value}>{userInfo?.name}</Text>
          </View>
          <View style={profilestyles.infoContainer}>
            <Text style={profilestyles.label}>Telefon:</Text>
            <Text style={profilestyles.value}>{userInfo?.phone}</Text>
          </View>
          <View style={profilestyles.infoContainer}>
            <Text style={profilestyles.label}>Rol:</Text>
            <Text style={profilestyles.value}>{userInfo?.role}</Text>
          </View>
          <View style={profilestyles.infoContainer}>
            <Text style={profilestyles.label}>Şirket:</Text>
            <Text style={profilestyles.value}>{userInfo?.related_company}</Text>
          </View>
          <View style={profilestyles.buttonContainer}>
          <TouchableOpacity onPress={handleLogout} style={profilestyles.button}>
            <Text style={profilestyles.buttonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
        </>
      ) : (
        <Text style={profilestyles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;