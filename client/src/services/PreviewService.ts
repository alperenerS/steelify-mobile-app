import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.REACT_APP_API_URL;

export const uploadImage = async (
  imageUri: string,
  workId: string,
  quality_control_id: string,
  status: string,
  folderPath: string,
  technical_drawing_numbering: string,
  step_name: string,
  imageName: string,
  issue_text: string | null,
  issue_description: string | null,
) => {
  const url = `${BASE_URL}/images`;
  const netInfo = await NetInfo.fetch();
  const imageKey = `offlineImage-${imageUri}`;

  // Create a new FormData object
  let formData = new FormData();

  const now = new Date();
  now.setHours(now.getHours() + 3); // Convert current date to GMT+3

  let timestamp = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(
    2,
    '0',
  )}_${String(now.getDate()).padStart(2, '0')}%${String(
    now.getHours(),
  ).padStart(2, '0')}_${String(now.getMinutes()).padStart(2, '0')}_${String(
    now.getSeconds(),
  ).padStart(2, '0')}`;

  let image = {
    uri: imageUri,
    type: 'image/jpeg',
    name: `${imageName}_${timestamp}.jpg`,
  };

  //INTERNET CONNECTION CHECK
  if (netInfo.isConnected && netInfo.isInternetReachable) {
    folderPath = folderPath.replace(/\s+/g, '_');
    formData.append('images', image);
    formData.append('work_id', workId);
    formData.append('quality_control_id', quality_control_id);
    formData.append('status', status);
    formData.append('folderPath', folderPath);
    formData.append('issues', issue_text);
    formData.append('issue_description', issue_description);
    // Send the request
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      return response.data;
    } catch (error) {
      console.error('Error uploading image: ', error);
      throw error;
    }
  }
};

export const uploadCachedImages = async () => {
  const netinfo = await NetInfo.fetch();
  if (netinfo.isConnected && netinfo.isInternetReachable) {
    const keys = await AsyncStorage.getAllKeys();
    const cachedPhotosKeys = keys.filter(key => key.startsWith("cachedPhoto_"));

    for (const key of cachedPhotosKeys) {
      const cachedImage: any = await AsyncStorage.getItem(key);
      const offlineImage = JSON.parse(cachedImage);
      if (offlineImage && offlineImage.uri) {
        try {
          const response = await uploadImage(
            offlineImage.uri,
            offlineImage.workId.toString(),
            offlineImage.quality_control_id.toString(),
            offlineImage.status,
            offlineImage.folderPath,
            offlineImage.technical_drawing_numbering,
            offlineImage.step_name,
            offlineImage.imageName,
            offlineImage.issue_text,
            offlineImage.issue_description,
          );
          console.log('Cached image uploaded successfully:', response);
          await AsyncStorage.removeItem(key); 
        } catch (error) {
          console.error('Error uploading cached image: ', error);
        }
      }
    }
  }
};
