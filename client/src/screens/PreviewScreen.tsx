import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import previewstyles from '../components/Preview';
import { uploadImage } from '../services/PreviewService';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWorkById } from '../services/workService';
import { WorkInfo } from '../models/WorkInfo';
//import MeasuredValueInput from '../components/MeasuredValueInput';
import { getVendorInfo } from '../services/vendorService';
import { Dimensions } from 'react-native';

global.Buffer = global.Buffer || require('buffer').Buffer;

type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Önizleme'>;
type PreviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Önizleme'>;

interface PreviewScreenProps {
  route: PreviewScreenRouteProp;
  navigation: PreviewScreenNavigationProp;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ route, navigation }) => {
  const { pictureUri, example_visual_url, workId, quality_control_id, productId, technical_drawing_numbering, lower_tolerance, upper_tolerance, step_name, order_number, product_name, vendor_id } = route.params;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [workInfo, setWorkInfo] = useState<WorkInfo[] | null>(null);
  const [vendorInfo, setVendorInfo] = useState<any | null>(null);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  useEffect(() => {
    const fetchVendorInfo = async () => {
      try {
        const vendorInfo = await getVendorInfo(vendor_id);
        setVendorInfo(vendorInfo);
        if(vendorInfo){
        }
      } catch (error) {
        console.error('Error fetching vendor info: ', error);
      }
    };
  
    fetchVendorInfo();
  }, [vendor_id]);


  useEffect(() => {
    const fetchWorkInfo = async () => {
      try {
        const { workInfo } = await getWorkById(workId);
        setWorkInfo(workInfo); // workInfo state'ini güncelleyin.
        if(workInfo.length > 0){
        }
      } catch (error) {
        console.error('Error fetching work info: ', error);
      }
    };
  
    fetchWorkInfo();
  }, [workId]);
  
  // Set measured values' states
  //const [mv1, setMv1] = useState("");
  //const [mv2, setMv2] = useState("");
  //const [mv3, setMv3] = useState("");

  useEffect(() => {
    const handleConnectivityChange = async (state: NetInfoState) => {
      if (state.isConnected && state.isInternetReachable) {
        try {
          const cachedPhoto = await AsyncStorage.getItem('cachedPhoto');
          if (cachedPhoto != null) {
            const project_number = workInfo && workInfo[0].project_number;

            let projectNumberString;
            if (project_number === null) {
                projectNumberString = 'unknown';
            } else {
                projectNumberString = project_number.toString();
            }
            const { uri, workId, quality_control_id, status } = JSON.parse(cachedPhoto);
            const folderPath = `${projectNumberString}/${order_number}_${vendorInfo.name}/${product_name}/`;
            const imageName= `${projectNumberString}_${product_name}_${step_name}_${technical_drawing_numbering}`;
            const response = await uploadImage(pictureUri, workId.toString(), quality_control_id.toString(), 'pending', folderPath, technical_drawing_numbering, step_name, imageName);
            console.log('Image uploaded successfully: ', response);
            await AsyncStorage.removeItem('cachedPhoto'); // Remove the photo from cache after successful upload
          }
        } catch (error) {
          console.error('Error uploading cached image: ', error);
        }
      }
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    // Clean up function
    return () => {
      unsubscribe();
    };
  }, []);

  const sendPicture = async () => {
    setIsButtonDisabled(true);

    const netInfo = await NetInfo.fetch();
    const project_number = workInfo && workInfo[0].project_number;

    let projectNumberString;
    if (project_number === null) {
        projectNumberString = 'unknown';
    } else {
        projectNumberString = project_number.toString();
        
    }
    const folderPath = `${projectNumberString}/${order_number}_${vendorInfo.name}/${product_name}/`;
    const imageName= `${projectNumberString}_${product_name}_${step_name}_${technical_drawing_numbering}`;
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
        try {
            await AsyncStorage.setItem('cachedPhoto', JSON.stringify({
            uri: pictureUri,
            workId,
            quality_control_id,
            status: 'status',
            folderPath: folderPath,
            }));
            console.log('Image cached successfully');
        } catch (error) {
            console.error('Error caching image: ', error);
        }
    } else {
        try {
            const response = await uploadImage(pictureUri, workId.toString(), quality_control_id.toString(), 'pending', folderPath, technical_drawing_numbering, step_name, imageName);
            console.log('Image uploaded successfully: ', response);
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    }
    navigation.navigate('WorkOrderScreen', {workId, productId});

    setTimeout(() => setIsButtonDisabled(false), 2000);
};


  const navigateToCameraScreen = () => {
    navigation.navigate('Kamera', {example_visual_url, workId, quality_control_id , productId, technical_drawing_numbering, lower_tolerance, upper_tolerance, step_name, order_number, product_name, vendor_id });
  };
  
  return (
    <View style={previewstyles.container}>
      <Image
        source={{uri: pictureUri}}
        style={{
          width: SCREEN_WIDTH,
          height: 'auto',
          aspectRatio: 1 // Bu, orijinal resim oranını korumaya yardımcı olur
        }}
      />
      <View style={previewstyles.toleranceContainer}>
        <Text style={previewstyles.toleranceText}>Lower Tolerance: {lower_tolerance}</Text>
        <Text style={previewstyles.toleranceText}>Upper Tolerance: {upper_tolerance}</Text>
      </View>
      <TouchableOpacity 
        style={previewstyles.button} 
        onPress={isButtonDisabled ? undefined : sendPicture}
        disabled={isButtonDisabled}
      >
        <Text style={previewstyles.buttonText}>Gönder</Text>
      </TouchableOpacity>
      <TouchableOpacity style={previewstyles.centerButton} onPress={navigateToCameraScreen}>
        <Text style={previewstyles.buttonText}>Yeniden Çek</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PreviewScreen;
