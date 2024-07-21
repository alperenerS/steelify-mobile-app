import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeData, getData } from '../utils/storage';
import { getUserInfo } from '../services/profileService';
import { useIsFocused } from '@react-navigation/native';
import { Avatar, Button, Text, List, Divider, Provider as PaperProvider } from 'react-native-paper';
import { Profile } from '../models/Profile';

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
  const [userInfo, setUserInfo] = useState<Profile | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await getData('userToken');
        if (token) {
          const result = await getUserInfo(token);
          setUserInfo(result);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    if (isFocused) {
      fetchUserInfo();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await removeData('userToken');
    await removeData('odooPartnerId');
    await removeData('id');
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
        <View style={styles.header}>
          {userInfo ? (
            <>
              <Avatar.Text size={100} label={userInfo.name.charAt(0)} style={styles.avatar} />
              <Text style={styles.title}>{userInfo.name} {userInfo.surname}</Text>
            </>
          ) : (
            <Avatar.Text size={100} label="?" style={styles.avatar} />
          )}
        </View>
        <List.Section>
          {userInfo && (
            <>
              <List.Item
                title="E-mail"
                description={userInfo.email}
                left={() => <Image source={phoneIcon} style={styles.icon} />}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Rol"
                description={userInfo.userType}
                left={() => renderRoleIcon(userInfo.userType)}
                style={styles.listItem}
              />
              <Divider />
              <List.Item
                title="Şirket"
                description={userInfo.website}
                left={() => <Image source={companyIcon} style={styles.icon} />}
                style={styles.listItem}
              />
              <Divider />
            </>
          )}
        </List.Section>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleLogout} style={styles.button}>
            Çıkış Yap
          </Button>
        </View>
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
    paddingLeft: 0,
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
