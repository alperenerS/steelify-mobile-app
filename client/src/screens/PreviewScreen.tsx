import React, {useState, useEffect} from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import previewstyles from '../components/Preview';
import {uploadImage} from '../services/PreviewService';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWorkById} from '../services/workService';
import {WorkInfo} from '../models/WorkInfo';
import {getVendorInfo} from '../services/vendorService';
import {Dimensions} from 'react-native';
import {FlatList} from 'react-native';

global.Buffer = global.Buffer || require('buffer').Buffer;

type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Önizleme'>;
type PreviewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Önizleme'
>;

interface PreviewScreenProps {
  route: PreviewScreenRouteProp;
  navigation: PreviewScreenNavigationProp;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({route, navigation}) => {
  const {
    pictures,
    example_visual_url,
    workId,
    quality_control_id,
    productId,
    technical_drawing_numbering,
    lower_tolerance,
    upper_tolerance,
    step_name,
    order_number,
    product_name,
    vendor_id,
    issue_text,
    description,
    issue_description,
  } = route.params;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [workInfo, setWorkInfo] = useState<WorkInfo[] | null>(null);
  const [vendorInfo, setVendorInfo] = useState<any | null>(null);
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  const [selectedIndex, setSelectedIndex] = useState(pictures.length - 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [existingPictures, setExistingPictures] = useState(pictures);

  const deletePhoto = (index: number) => {
    setExistingPictures(prevPictures => {
      const newPictures = prevPictures.filter((_, i) => i !== index);
      if (selectedIndex === index) {
        setSelectedIndex(newPictures.length - 1);
      }
      return newPictures;
    });
  };

  const renderPicture = (
    uri: string,
    index: number,
    isSelected: boolean,
    onSelect: (index: number) => void,
    onDelete: (index: number) => void,
  ) => (
    <View>
      <TouchableOpacity onPress={() => onSelect(index)}>
        <Image
          source={{uri}}
          style={[
            previewstyles.smallThumbnail,
            isSelected ? previewstyles.selectedThumbnail : {},
          ]}
        />
      </TouchableOpacity>
      {isSelected && (
        <TouchableOpacity
          onPress={() => onDelete(index)}
          style={previewstyles.deleteButton}>
          <Text style={previewstyles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  useEffect(() => {
    const fetchVendorInfo = async () => {
      try {
        const vendorInfo = await getVendorInfo(vendor_id);
        setVendorInfo(vendorInfo);
        if (vendorInfo) {
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
        const {workInfo} = await getWorkById(workId);
        setWorkInfo(workInfo); // workInfo state'ini güncelleyin.
        if (workInfo.length > 0) {
        }
      } catch (error) {
        console.error('Error fetching work info: ', error);
      }
    };

    fetchWorkInfo();
  }, [workId]);

  const sendPicture = async () => {
    setIsButtonDisabled(true);

    const netInfo = await NetInfo.fetch();
    const project_number = workInfo && workInfo[0].project_number;

    let projectNumberString: string;
    let issue_text: string;
    let issue_description: string;
    if (project_number === null) {
      projectNumberString = 'unknown';
    } else {
      projectNumberString = project_number.toString();
    }

    const folderPath = `${projectNumberString}/${order_number}_${vendorInfo.name}/${product_name}/`;

    existingPictures.forEach(async (pictureUri, index) => {
      const imageKey = `cachedPhoto_${Date.now()}_${index}`;
      const imageName = `${projectNumberString}_${product_name}_${step_name}_${technical_drawing_numbering}_i${index}`;
      if (!netInfo.isConnected || !netInfo.isInternetReachable) {
        try {
          await AsyncStorage.setItem(
            imageKey,
            JSON.stringify({
              uri: pictureUri,
              workId,
              quality_control_id,
              status: 'pending',
              folderPath: folderPath,
              technical_drawing_numbering: technical_drawing_numbering,
              step_name: step_name,
              imageName: imageName,
              issue_text: issue_text,
              issue_description: issue_description,
            }),
          );
          console.log('Image cached successfully');
        } catch (error) {
          console.error('Error caching image: ', error);
        }
      } else {
        try {
          uploadImage(
            pictureUri,
            workId.toString(),
            quality_control_id.toString(),
            'pending',
            folderPath,
            technical_drawing_numbering,
            step_name,
            imageName,
            issue_text,
            issue_description,
          )
            .then(response => {
              console.log('Image uploaded successfully: ', response);
            })
            .catch(error => {
              console.error('Error uploading image: ', error);
            });
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      }
    });

    navigation.navigate('WorkOrderScreen', {workId, productId});

    setTimeout(() => setIsButtonDisabled(false), 2000);
  };

  const addPhoto = () => {
    navigation.navigate('Camera', {
      existingPictures: existingPictures,
      example_visual_url,
      workId,
      quality_control_id,
      productId,
      technical_drawing_numbering,
      lower_tolerance,
      upper_tolerance,
      step_name,
      order_number,
      product_name,
      vendor_id,
      description,
    });
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View
      style={[
        previewstyles.container,
        existingPictures.length === 1
          ? {alignItems: 'center', justifyContent: 'center'}
          : {},
      ]}>
      <Image
        source={{uri: existingPictures[selectedIndex]}} // Seçili fotoğrafı göster
        style={{
          width: SCREEN_WIDTH,
          height: 'auto',
          aspectRatio: 1,
        }}
      />
      {existingPictures.length > 1 && (
        <FlatList // Alt galeri
          data={existingPictures}
          renderItem={({item, index}) =>
            renderPicture(
              item,
              index,
              selectedIndex === index,
              handleSelect,
              deletePhoto,
            )
          }
          keyExtractor={(_, index) => index.toString()}
          horizontal
        />
      )}
      <View style={previewstyles.toleranceContainer}>
        <Text style={previewstyles.toleranceText}>
          Lower Tolerance: {lower_tolerance}
        </Text>
        <Text style={previewstyles.toleranceText}>
          Upper Tolerance: {upper_tolerance}
        </Text>
      </View>
      <TouchableOpacity
        style={previewstyles.button}
        onPress={isButtonDisabled ? undefined : sendPicture}
        disabled={isButtonDisabled}>
        <Text style={previewstyles.buttonText}>Gönder</Text>
      </TouchableOpacity>
      <TouchableOpacity style={previewstyles.centerButton} onPress={addPhoto}>
        <Text style={previewstyles.buttonText}>Fotoğraf Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PreviewScreen;
