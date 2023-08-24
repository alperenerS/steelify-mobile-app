// client/src/services/authService.ts

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const login = async (phone: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/mobillogin`, { phone, password });
    if (response.status === 200) {
      // Eğer sunucudan dönen yanıtta bir "error" anahtarı varsa bu hatayı fırlatalım.
      if (response.data.error) {
        throw new Error('Kullanıcı Adı veya Şifre Yanlış');
      }
      return response.data.token;
    } else {
      throw new Error('Giriş başarısız!');
    }
  } catch (error) {
    throw error;
  }
};
