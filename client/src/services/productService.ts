import { ProductInfo } from '../models/ProductInfo';
import axios from 'axios'; 
import { getData, storeData } from '../utils/storage';
import NetInfo from "@react-native-community/netinfo"; 

const BASE_URL = 'https://portal-test.yenaengineering.nl';

export const getProductInfo = async (productId: number): Promise<{ productInfo: ProductInfo[] }> => {
  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.post(`${BASE_URL}/api/productinfo`, {
        product_id: productId,
      });

      const productInfo: ProductInfo[] = response.data;

      // Save product info to cache
      await storeData('productInfo', JSON.stringify(productInfo));

      return { productInfo };
    } catch (error) {
      // If an error occurred while fetching, get data from cache
      const cachedProductInfo = await getData('productInfo');
      return {
        productInfo: cachedProductInfo ? JSON.parse(cachedProductInfo) : [],
      }
    }
  } else {
    // If there's no internet connection, get data from cache
    const cachedProductInfo = await getData('productInfo');
    return {
      productInfo: cachedProductInfo ? JSON.parse(cachedProductInfo) : [],
    }
  }
};
