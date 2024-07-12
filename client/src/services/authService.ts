import axios from 'axios';
import { API_BASE_URL } from '../config';

export const login = async (phoneNumber: string, password: string): Promise<{ token: string, odooPartnerId: number }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/mobillogin`, { phoneNumber, password });
    if (response.status === 200) {
      if (response.data.message !== "User Successfully Logged In with Mobile!") {
        throw new Error('Kullanıcı Adı veya Şifre Yanlış');
      }
      const token = response.data.data.access_token;
      const odooPartnerId = response.data.data.data.odoo_partner_id;
      return { token, odooPartnerId };
    } else {
      throw new Error('Giriş başarısız!');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
