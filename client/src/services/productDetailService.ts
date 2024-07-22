import axios from 'axios';
import { API_BASE_URL } from '../config';

export const fetchProductDetails = async (productId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product-recipe/product/${productId}`);
    return response.data.data;
  } catch (error) {
    console.error('Fetch product details error:', error);
    throw error;
  }
};

export const updateStepStatus = async (id: number) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/product-recipe-steps/update-status/${id}`, {
      status: "completed"
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update step status:', error);
    throw error;
  }
};

export const updatePhotoStatus = async (id: number) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/product-recipe-steps/update-photo-status/${id}`, {
      isPhotoTake: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update photo status:', error);
    throw error;
  }
};
