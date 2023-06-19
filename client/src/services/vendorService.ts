import axios from 'axios';
import { getData, storeData } from '../utils/storage';
import NetInfo from '@react-native-community/netinfo';

const BASE_URL = 'https://portal-test.yenaengineering.nl';

export const getVendorInfo = async (vendorId: number): Promise<any> => {
  const netInfo = await NetInfo.fetch();
  
  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.post(`${BASE_URL}/mobilapi/vendorinfo`, 
        { vendor_id: vendorId }, // Vendor ID is sent in the body of the POST request
        );
        console.log("client\src\services\vendorService.ts response",response.data)
      if (response.status === 200) {
        // When the request is successful, update the cached data
        await storeData('vendorInfo', JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error('Vendor info request failed!');
      }
    } catch (error) {
      console.log(error);
      // If an error occurred while fetching, get data from cache
      const cachedData = await getData('vendorInfo');
      return cachedData ? JSON.parse(cachedData) : null;
    }
  } else {
    // If there's no internet connection, get data from cache
    const cachedData = await getData('vendorInfo');
    return cachedData ? JSON.parse(cachedData) : null;
  }
};
