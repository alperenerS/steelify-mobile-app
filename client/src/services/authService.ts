// client/src/services/authService.ts

import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:3001';

export const login = async (phone: string, password: string): Promise<string> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/mobillogin`, { phone, password });
      if (response.status === 200) {
        return response.data.token;
      } else {
        throw new Error('Giriş başarısız!');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };