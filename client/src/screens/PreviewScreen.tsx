import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import previewstyles from '../components/Preview';
import { uploadImage } from '../services/PreviewService';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

global.Buffer = global.Buffer || require('buffer').Buffer;

type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Önizleme'>;
type PreviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Önizleme'>;

interface PreviewScreenProps {
  route: PreviewScreenRouteProp;
  navigation: PreviewScreenNavigationProp;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ route, navigation }) => {
  const { pictureUri, example_visual_url, workId, quality_control_id, productId  } = route.params;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const handleConnectivityChange = async (state: NetInfoState) => {
      if (state.isConnected && state.isInternetReachable) {
        try {
          const cachedPhoto = await AsyncStorage.getItem('cachedPhoto');
          if (cachedPhoto != null) {
            const { uri, workId, quality_control_id, status } = JSON.parse(cachedPhoto);
            const response = await uploadImage(uri, workId.toString(), quality_control_id.toString(), status);
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
  
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      try {
        await AsyncStorage.setItem('cachedPhoto', JSON.stringify({
          uri: pictureUri,
          workId,
          quality_control_id,
          status: 'status',
        }));
        console.log('Image cached successfully');
      } catch (error) {
        console.error('Error caching image: ', error);
      }
    } else {
      try {
        const response = await uploadImage(pictureUri, workId.toString(), quality_control_id.toString(), 'status');
        console.log('Image uploaded successfully: ', response);
      } catch (error) {
        console.error('Error uploading image: ', error);
      }
    }
    navigation.navigate('WorkOrderScreen', {workId, productId});

    setTimeout(() => setIsButtonDisabled(false), 2000);
  };

  const navigateToCameraScreen = () => {
    navigation.navigate('Kamera', {example_visual_url, workId, quality_control_id , productId});
  };

  return (
    <View style={previewstyles.container}>
      <Image
        source={{uri: pictureUri}}
        style={previewstyles.image}
      />
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
