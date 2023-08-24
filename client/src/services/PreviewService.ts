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
    console.log('internet var');
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
  } else {
    //INTERNET YOKSA
    console.log('internet yok');
    // const base64Image = await uploadOfflineImage(image.uri);
    // console.log(base64Image);

    const imageName = Math.random().toString(36).substring(7) + '.jpg';
    const imagePath = `${RNFS.DocumentDirectoryPath}/${imageName}`;

    await RNFS.copyFile(imageUri, imagePath);

    const offlineImages = await AsyncStorage.getItem('offlineImages');
    const updatedImages = offlineImages ? JSON.parse(offlineImages) : [];
    updatedImages.push(imagePath);

    try {
      await AsyncStorage.setItem(
        'offlineImages',
        JSON.stringify(updatedImages),
      );
    } catch (error) {
      console.error(error);
    }
  }
};

export const uploadCachedImages = async () => {
  const offlineImages = await AsyncStorage.getItem('offlineImages');
  const netInfo = await NetInfo.fetch();

  if (offlineImages && netInfo.isConnected && netInfo.isInternetReachable) {
    const imagePaths = JSON.parse(offlineImages);

    for (const imagePath of imagePaths) {
      const imageBase64 = await RNFS.readFile(imagePath, 'base64');
      await uploadImage(
        imageBase64,
        '55',
        'deneme',
        'deneme',
        'deneme',
        'deneme',
        'deneme',
        'deneme',
        null,
        null,
      );
    }
    await AsyncStorage.removeItem('offlineImages');
  }
};

export const uploadOfflineImage = async (imageUri: string): Promise<string> => {
  console.log(imageUri);
  const image = await RNFS.readFile(imageUri, 'base64');
  return image;
};

export const uploadOfflineImageToDB = async () => {
  const offlineImage = await AsyncStorage.getItem('offlineImage');
  const netInfo = await NetInfo.fetch();

  try {
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      // const response = await uploadImage(
      //   offlineImage,
      //   '55',
      //   'deneme',
      //   'deneme',
      //   'deneme',
      //   'deneme',
      //   'deneme',
      //   'deneme',
      //   null,
      //   null,
      // );
      // console.log(response);

      // await AsyncStorage.removeItem('offlineImage');
      // return response;
      console.log('denememmememeemme');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
