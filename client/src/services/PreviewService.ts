import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://portal-test.yenaengineering.nl';

export const uploadImage = async (imageUri: string, workId: string, quality_control_id: string, status: string) => {
  const url = `${BASE_URL}/mobilapi/images`;

  // Create a new FormData object
  let formData = new FormData();

  // Generate a unique id for the image
  let uniqueId = uuidv4();
  
  let image = {
    uri: imageUri,
    type: 'image/jpeg',
    name: `${uniqueId}.jpg`, // Use the unique id as the image name
  };
  
  formData.append('images', image);
  formData.append('work_id', workId);
  formData.append('quality_control_id', quality_control_id);
  formData.append('status', status);

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
};
