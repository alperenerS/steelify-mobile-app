import axios from 'axios';
import { getData, storeData } from '../utils/storage';
import NetInfo from '@react-native-community/netinfo';
import { API_BASE_URL } from '../config';

export const getVendorInfo = async (vendorId: number): Promise<any> => {
  const netInfo = await NetInfo.fetch();
  
  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.post(`${API_BASE_URL}/vendorinfo`, { vendor_id: vendorId });
      if (response.status !== 200) throw new Error('Vendor info request failed!');
      await storeData('vendorInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;  // Hata oluştuğunda hatayı doğrudan fırlatıyoruz.
    }
  } else {
    const cachedData = await getData('vendorInfo');
    return cachedData ? JSON.parse(cachedData) : null;
  }
};