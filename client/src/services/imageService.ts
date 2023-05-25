import { ImageCount } from '../models/ImageCount';
import axios from 'axios'; 
import { getData, storeData } from '../utils/storage';
import NetInfo from "@react-native-community/netinfo"; 

const BASE_URL = 'https://portal-test.yenaengineering.nl';

export const getImageCounts = async (qualityControlIds: number[], workId: number): Promise<ImageCount[]> => {
  const netInfo = await NetInfo.fetch();
  const cacheKey = `imageCounts-${workId}`;

  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.post(`${BASE_URL}/api/images/count`, {
        work_id: workId,
        quality_control_ids: qualityControlIds
      });
      
      const imageCounts: ImageCount[] = response.data;
      // Save image count data to cache
      await storeData(cacheKey, JSON.stringify(imageCounts));

      return imageCounts;
    } catch (error) {
      // If an error occurred while fetching, get data from cache
      const cachedImageCounts = await getData(cacheKey);
      return cachedImageCounts ? JSON.parse(cachedImageCounts) : [];
    }
  } else {
    // If there's no internet connection, get data from cache
    const cachedImageCounts = await getData(cacheKey);
    return cachedImageCounts ? JSON.parse(cachedImageCounts) : [];
  }
};
