import axios from 'axios';
import { getData, storeData } from '../utils/storage';
import NetInfo from '@react-native-community/netinfo';
import { Profile } from '../models/Profile';
import { API_BASE_URL } from '../config';

export const getUserInfo = async (token: string): Promise<Profile | null> => {
  const netInfo = await NetInfo.fetch();
  
  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userData: Profile = {
          email: response.data.data.email,
          userType: response.data.data.userType,
          website: response.data.data.website,
          name: response.data.data.name,
          surname: response.data.data.surname
        };
        await storeData('userInfo', JSON.stringify(userData));
        return userData;
      } else {
        throw new Error('User info request failed!');
      }
    } catch (error) {
      throw error;
    }
  } else {
    const cachedData = await getData('userInfo');
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      throw new Error('No internet connection and no cached data available!');
    }
  }
};
