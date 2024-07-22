import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, UIManager, LayoutAnimation, Platform, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { List, Button, Text } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageViewerModal from '../components/ImageViewerModal';
import YoutubePlayer from 'react-native-youtube-iframe';
import { fetchProductDetails, updateStepStatus } from '../services/productDetailService';
import { API_BASE_URL } from '../config';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type RootStackParamList = {
  Camera: {
    existingPictures: string[];
    example_visual_url: string;
    productId: string;
    step_name: string;
    order_number: string;
    product_name: string;
    vendor_id: string;
    description: string;
    stepId: string; // stepId ekliyoruz
  };
  ProductDetail: { 
    productId: string;
    photoSent?: boolean;
    updatedStepId?: string;
  };
};

type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();
  const { productId, photoSent, updatedStepId } = route.params;
  const [expanded, setExpanded] = useState<number | null>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchProductDetails(productId);
        if (photoSent && updatedStepId) {
          const updatedDetails = details.map((detail: any) =>
            detail.id === updatedStepId ? { ...detail, isPhotoTake: true } : detail
          );
          setProductDetails(updatedDetails.sort((a: any, b: any) => a.step_number - b.step_number));
        } else {
          setProductDetails(details.sort((a: any, b: any) => a.step_number - b.step_number));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Fetch product details error:', error);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [productId, photoSent, updatedStepId]);

  const handlePress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  const handleNext = async (index: number) => {
    try {
      const stepId = productDetails[index].id;
      if (productDetails[index].photo && !productDetails[index].isPhotoTake) {
        Alert.alert("Fotoğraf Çekme İşlemini Tamamlayın!");
        return;
      }
      await updateStepStatus(stepId);
      const updatedDetails = productDetails.map((detail, i) =>
        i === index ? { ...detail, status: 'completed' } : detail
      );
      setProductDetails(updatedDetails.sort((a: any, b: any) => a.step_number - b.step_number));
      const nextIndex = index + 1;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (nextIndex < productDetails.length) {
        setExpanded(nextIndex);
      } else {
        setExpanded(null);
      }
    } catch (error) {
      console.error('Failed to update step status:', error);
    }
  };

  const openCamera = (index: number) => {
    navigation.navigate('Camera', {
      existingPictures: [],
      example_visual_url: productDetails[index].image_url,
      productId,
      step_name: productDetails[index].name,
      order_number: 'ORD123',
      product_name: 'Product',
      vendor_id: 'Vendor123',
      description: productDetails[index].description,
      stepId: productDetails[index].id,
    });
  };

  const handleImagePress = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {productDetails.map((item, index) => {
        const hasMedia = (item.image_url && item.image_url !== "null") || (item.video_url && item.video_url !== "null");

        return (
          <List.Accordion
            key={index}
            title={item.name}
            expanded={expanded === index}
            onPress={() => handlePress(index)}
            titleStyle={item.status === 'completed' ? styles.completedTitle : (expanded === index ? styles.expandedTitle : styles.title)}
            right={props => (
              <Image
                {...props}
                source={expanded === index ? require('../assets/chevron_down_icon.png') : require('../assets/chevron_right_icon.png')}
                style={styles.chevronIcon}
              />
            )}
          >
            <View style={styles.content}>
              {hasMedia && (
                <>
                  {item.video_url && item.video_url !== "null" ? (
                    <YoutubePlayer
                      height={200}
                      play={false}
                      videoId={item.video_url}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => handleImagePress(item.image_url)}>
                      <Image source={{ uri: item.image_url }} style={styles.image} />
                    </TouchableOpacity>
                  )}
                </>
              )}
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={() => handleNext(index)} style={styles.button}>
                  Tamamla!
                </Button>
                {item.photo && (
                  <Button mode="contained" onPress={() => openCamera(index)} style={styles.button}>
                    Fotoğraf Çek
                  </Button>
                )}
              </View>
            </View>
          </List.Accordion>
        );
      })}
      <ImageViewerModal
        visible={modalVisible}
        imageUri={selectedImage}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'black',
  },
  expandedTitle: {
    color: '#57B1DB',
  },
  completedTitle: {
    color: 'green',
  },
  content: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#FF6F00',
  },
  chevronIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ProductDetailScreen;
