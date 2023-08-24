import { ProductInfo } from '../models/ProductInfo';
import axios from 'axios'; 
import { getData, storeData } from '../utils/storage';
import NetInfo from "@react-native-community/netinfo"; 

const BASE_URL = process.env.REACT_APP_API_URL;

export const getProductInfo = async (productId: number): Promise<{ productInfo: ProductInfo[] }> => {
  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.post(`${BASE_URL}/productinfo`, { product_id: productId });
      const productInfo: ProductInfo[] = response.data;
      await storeData('productInfo', JSON.stringify(productInfo));
      return { productInfo };
    } catch (error) {
      console.log(error);
      throw error;  // Hata oluştuğunda hatayı doğrudan fırlatıyoruz.
    }
  } else {
    const cachedProductInfo = await getData('productInfo');
    return {
      productInfo: cachedProductInfo ? JSON.parse(cachedProductInfo) : [],
    }
  }
};