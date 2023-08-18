import { Work } from '../models/Work';
import { WorkSteps } from '../models/WorkSteps';
import { WorkProducts } from '../models/WorkProducts';
import { WorkInfo } from '../models/WorkInfo';
import { Form } from '../models/Form';
import { QualityControl } from '../models/QualityControl';
import axios from 'axios';
import { getData, storeData } from '../utils/storage';
import NetInfo from '@react-native-community/netinfo';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getWorks = async (token: string): Promise<{ works: Work[], workSteps: WorkSteps[], workProducts: WorkProducts[] }> => {
  const netInfo = await NetInfo.fetch();

  const worksKey = `works-${token}`;
  const workStepsKey = `workSteps-${token}`;
  const workProductsKey = `workProducts-${token}`;

  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.get(`${BASE_URL}/worksbyid`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) throw new Error('Works request failed!');
      
      const works = response.data;
      const ids = works.map((work: Work) => work.id);

      const workStepsResponse = await axios.post(`${BASE_URL}/worksteps`, { ids });
      if (workStepsResponse.status !== 200) throw new Error('WorkSteps request failed!');
      
      const workSteps = workStepsResponse.data;
      const workIds = workSteps.map((workStep: { work_id: number }) => workStep.work_id);

      const workProductsResponse = await axios.post(`${BASE_URL}/workproducts`, { ids: workIds });
      if (workProductsResponse.status !== 200) throw new Error('WorkProducts request failed!');

      const workProducts = workProductsResponse.data;

      await storeData(worksKey, JSON.stringify(works));
      await storeData(workStepsKey, JSON.stringify(workSteps));
      await storeData(workProductsKey, JSON.stringify(workProducts)); 
      return { works, workSteps, workProducts };
      
    } catch (error) {
      console.log(error);
      throw error;  // Hata oluştuğunda hatayı doğrudan fırlatıyoruz.
    }
  } else {
    // İnternet bağlantısı yoksa verileri cache'den alıyoruz.
    const cachedWorks = await getData(worksKey);
    const cachedWorkSteps = await getData(workStepsKey);
    const cachedWorkProducts = await getData(workProductsKey);
    
    return { 
      works: cachedWorks ? JSON.parse(cachedWorks) : [], 
      workSteps: cachedWorkSteps ? JSON.parse(cachedWorkSteps) : [],
      workProducts: cachedWorkProducts ? JSON.parse(cachedWorkProducts) : [], 
    };
  }
};

export const getWorkById = async (workId: number): Promise<{ workInfo: WorkInfo[] }> => {
  const netInfo = await NetInfo.fetch();

  const workInfoKey = `workInfo-${workId}`;

  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.get(`${BASE_URL}/work/${workId}`);
      
      if (response.status !== 200) throw new Error('Failed to fetch work by ID!');

      const workInfo: WorkInfo[] = response.data;
      // Save work to cache
      await storeData(workInfoKey, JSON.stringify(workInfo));
      return { workInfo };
    } catch (error) {
      console.log(error);
      throw error;  // Hata oluştuğunda hatayı doğrudan fırlatıyoruz.
    }
  } else {
    // İnternet bağlantısı yoksa verileri cache'den alıyoruz.
    const cachedWork = await getData(workInfoKey);
    return {
      workInfo: cachedWork ? JSON.parse(cachedWork) : [],
    }
  }
};

export const getForm = async (productId: number, vendorId: number): Promise<{ form: Form[] }> => {
  const netInfo = await NetInfo.fetch();
  const cacheKey = `form-${productId}-${vendorId}`;

  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.post(`${BASE_URL}/formids`, {
        product_id: productId,
        vendor_id: vendorId
      });

      if (response.status !== 200) throw new Error('Failed to fetch form data!');

      const form: Form[] = response.data;
      // Save post data to cache
      await storeData(cacheKey, JSON.stringify(form));
      return { form };
    } catch (error) {
      console.log(error);
      throw error;  // Hata oluştuğunda hatayı doğrudan fırlatıyoruz.
    }
  } else {
    // İnternet bağlantısı yoksa verileri cache'den alıyoruz.
    const cachedForm = await getData(cacheKey);
    return {
      form: cachedForm ? JSON.parse(cachedForm) : [],
    };
  }
};

export const postQualityControl = async (formId: number, workId: number): Promise<{ qualitycontrol: QualityControl[] }> => {
  const netInfo = await NetInfo.fetch();
  const cacheKey = `qualityControl-${formId}-${workId}`;

  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.post(`${BASE_URL}/qualitycontrol`, {
        form_id: formId,
        work_id: workId
      });

      if (response.status !== 200) throw new Error('Failed to fetch quality control data!');

      const qualitycontrol: QualityControl[] = response.data;
      // Save post data to cache
      await storeData(cacheKey, JSON.stringify(qualitycontrol));

      return { qualitycontrol };
    } catch (error) {
      console.log(error);
      throw error;  // Hata oluştuğunda hatayı doğrudan fırlatıyoruz.
    }
  } else {
    // İnternet bağlantısı yoksa verileri cache'den alıyoruz.
    const cachedQualityControl = await getData(cacheKey);
    return {
      qualitycontrol: cachedQualityControl ? JSON.parse(cachedQualityControl) : [],
    };
  }
};