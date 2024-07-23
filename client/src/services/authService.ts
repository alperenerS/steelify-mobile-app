import axios from 'axios';
import { API_BASE_URL } from '../config';

export const login = async (phoneNumber: string, password: string): Promise<{ token: string, odooPartnerId: number, id: number }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/mobillogin`, { phoneNumber, password });
    if (response.status === 200) {
      if (response.data.message !== "User Successfully Logged In with Mobile!") {
        throw new Error('Kullanıcı Adı veya Şifre Yanlış');
      }
      const token = response.data.data.access_token;
      const odooPartnerId = response.data.data.data.odoo_partner_id;
      const id = response.data.data.data.id;
      return { token, odooPartnerId, id };
    } else {
      throw new Error('Giriş başarısız!');
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      throw new Error('Böyle bir hesap bulunamadı');
    }
    console.error('Login error:', error);
    throw error;
  }
};
