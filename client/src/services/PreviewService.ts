import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const uploadImage = async (imageUri: string, workId: string, quality_control_id: string, status: string, folderPath: string, technical_drawing_numbering: string, step_name: string) => {
  const url = `${BASE_URL}/images`;

  // Create a new FormData object
  let formData = new FormData();
  
  const now = new Date();
  now.setHours(now.getHours() + 3); // Convert current date to GMT+3
  
  let timestamp = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}_${String(now.getDate()).padStart(2, '0')}%${String(now.getHours()).padStart(2, '0')}_${String(now.getMinutes()).padStart(2, '0')}_${String(now.getSeconds()).padStart(2, '0')}`;
  
  let image = {
    uri: imageUri,
    type: 'image/jpeg',
    name: `${step_name}_${technical_drawing_numbering}_${timestamp}.jpg`,
  };
  folderPath = folderPath.replace(/\s+/g, "_");
  formData.append('images', image);
  formData.append('work_id', workId);
  formData.append('quality_control_id', quality_control_id);
  formData.append('status', status);
  formData.append('folderPath', folderPath);
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
