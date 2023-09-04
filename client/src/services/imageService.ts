import { ImageCount } from '../models/ImageCount';
import axios from 'axios'; 
import { getData, storeData } from '../utils/storage';
import NetInfo from "@react-native-community/netinfo"; 

const BASE_URL = process.env.REACT_APP_API_URL;

export const getImageCounts = async (qualityControlIds: number[], workId: number): Promise<ImageCount[]> => {
  const netInfo = await NetInfo.fetch();
  const cacheKey = `imageCounts-${workId}`;

  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.post(`${BASE_URL}/images/count`, {
        work_id: workId,
        quality_control_ids: qualityControlIds
      });
      const imageCounts: ImageCount[] = response.data;
      await storeData(cacheKey, JSON.stringify(imageCounts));
      return imageCounts;
    } catch (error) {
      console.log(error);
      throw error;  // Hata oluştuğunda hatayı doğrudan fırlatıyoruz.
    }
  } else {
    const cachedImageCounts = await getData(cacheKey);
    return cachedImageCounts ? JSON.parse(cachedImageCounts) : [];
  }
};