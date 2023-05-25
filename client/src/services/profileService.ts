import axios from 'axios';
import { getData, storeData } from '../utils/storage';
import NetInfo from '@react-native-community/netinfo';

const BASE_URL = 'https://portal-test.yenaengineering.nl';

export const getUserInfo = async (token: string): Promise<any> => {
  const netInfo = await NetInfo.fetch();
  
  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.get(`${BASE_URL}/api/userinfo`, {
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
      console.log(error);
      // If an error occurred while fetching, get data from cache
      const cachedData = await getData('userInfo');
      return cachedData ? JSON.parse(cachedData) : null;
    }
  } else {
    // If there's no internet connection, get data from cache
    const cachedData = await getData('userInfo');
    return cachedData ? JSON.parse(cachedData) : null;
  }
};
