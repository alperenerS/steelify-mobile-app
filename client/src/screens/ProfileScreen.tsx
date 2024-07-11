import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeData, getData } from '../utils/storage';
import { getUserInfo } from '../services/profileService';
import { useIsFocused } from '@react-navigation/native';
import { Avatar, Button, Text, List, Divider, Provider as PaperProvider } from 'react-native-paper';

// Import custom icons from assets
import companyIcon from '../assets/company_icon.png';
import personIcon from '../assets/person_icon.png';
import phoneIcon from '../assets/phone_icon.png';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

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
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = await getData('userToken');
      if (token) {
        const result = await getUserInfo(token);
        setUserInfo(result);
      }
      const cachedData = await getData('userInfo');
      const parsedCachedData = JSON.parse(cachedData);
      return parsedCachedData;
    };

    if (isFocused) {
      fetchUserInfo();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await removeData('userToken');
    setUserInfo(null);
    navigation.navigate('Login');
  };

  const renderRoleIcon = (role: string) => {
    switch (role) {
      case 'Tedarikçi':
        return <Image source={personIcon} style={styles.icon} />;
      case 'Usta':
        return <Image source={personIcon} style={styles.icon} />;
      case 'Müşteri':
        return <Image source={personIcon} style={styles.icon} />;
      default:
        return <Image source={personIcon} style={styles.icon} />;
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        {userInfo ? (
          <>
            <View style={styles.header}>
              <Avatar.Text size={100} label={userInfo.name.charAt(0)} style={styles.avatar} />
              <Text style={styles.title}>{userInfo.name}</Text>
            </View>
            {/* <Divider style={styles.divider} /> */}
            <List.Section>
              {/* <List.Item
                title="ID"
                description={userInfo.id.toString()}
                left={() => <Image source={personIcon} style={styles.icon} />}
              />
              <Divider /> */}
              <List.Item
                title="Telefon"
                description={userInfo.phone}
                left={() => <Image source={phoneIcon} style={styles.icon} />}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Rol"
                description={userInfo.role}
                left={() => renderRoleIcon(userInfo.role)}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Şirket"
                description={userInfo.related_company}
                left={() => <Image source={companyIcon} style={styles.icon} />}
                style={styles.listItem}
              />
            </List.Section>
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={handleLogout} style={styles.button}>
                Çıkış Yap
              </Button>
            </View>
          </>
        ) : (
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        )}
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#57B1DB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 8,
    resizeMode: 'contain',
  },
  listItem: {
    paddingLeft: 0, // Adjusts the padding to align icons and text properly
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#FF6F00',
  },
  loadingText: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#333',
  },
});

export default ProfileScreen;
