import axios from 'axios';
import { API_BASE_URL } from '../config';
import { getData } from '../utils/storage';

export const getProductRecipe = async (): Promise<any> => {
  try {
    const odooPartnerId = await getData('odooPartnerId');
    const token = await getData('userToken');
    const url = `${API_BASE_URL}/product-recipe/${odooPartnerId}`;


    if (!odooPartnerId || !token) {
      throw new Error('OdooPartnerId veya Token bulunamadı.');
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Product recipe request failed!');
    }
  } catch (error) {
    console.error('getProductRecipe error:', error);
    throw error;
  }
};
