import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import previewstyles from '../components/Preview';
import { updatePhotoStatus } from '../services/productDetailService';

type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Önizleme'>;
type PreviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Önizleme'>;

interface PreviewScreenProps {
  route: PreviewScreenRouteProp;
  navigation: PreviewScreenNavigationProp;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ route, navigation }) => {
  const {
    pictures,
    example_visual_url,
    productId,
    step_name,
    order_number,
    product_name,
    vendor_id,
    description,
    stepId, // stepId'yi ekliyoruz
  } = route.params;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const [selectedIndex, setSelectedIndex] = useState(pictures.length - 1);
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
          source={{ uri: uri }}
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

  const sendPicture = async () => {
    setIsButtonDisabled(true);

    existingPictures.forEach(async (pictureUri, index) => {
      // Görsel yükleme işlemi burada gerçekleştirilecek
    });

    try {
      await updatePhotoStatus(stepId); // Fotoğraf durumu güncellemesi yapılıyor
      console.log('Photo status updated successfully');
    } catch (error) {
      console.error('Failed to update photo status:', error);
    }

    navigation.navigate('ProductDetail', { productId });

    setTimeout(() => setIsButtonDisabled(false), 2000);
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View
      style={[
        previewstyles.container,
        existingPictures.length === 1
          ? { alignItems: 'center', justifyContent: 'center' }
          : {},
      ]}>
      <Image
        source={{ uri: existingPictures[selectedIndex] }} // Seçili fotoğrafı göster
        style={{
          width: SCREEN_WIDTH,
          height: 'auto',
          aspectRatio: 1,
        }}
      />
      {existingPictures.length > 1 && (
        <FlatList // Alt galeri
          data={existingPictures}
          renderItem={({ item, index }) =>
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
      <TouchableOpacity
        style={previewstyles.button}
        onPress={isButtonDisabled ? undefined : sendPicture}
        disabled={isButtonDisabled}>
        <Text style={previewstyles.buttonText}>Gönder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PreviewScreen;
