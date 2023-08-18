import axios from 'axios';
import { getData, storeData } from '../utils/storage';
import NetInfo from '@react-native-community/netinfo';
import { Profile } from '../models/Profile';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getUserInfo = async (token: string): Promise<Profile | null> => {
  const netInfo = await NetInfo.fetch();
  
  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.get(`${BASE_URL}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // When the request is successful, update the cached data
        await storeData('userInfo', JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error('User info request failed!');
      }
    } catch (error) {
      throw error;  // If an error occurred while fetching, directly throw the error
    }
  } else {
    // If there's no internet connection, get data from cache
    const cachedData = await getData('userInfo');
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      throw new Error('No internet connection and no cached data available!');
    }
  }
};