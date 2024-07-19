import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import ImageViewerModal from '../components/ImageViewerModal';
import { API_BASE_URL } from '../config';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

type RootStackParamList = {
  Camera: {
    existingPictures: string[];
    example_visual_url: string;
    workId: string;
    quality_control_id: string;
    productId: string;
    technical_drawing_numbering: string;
    lower_tolerance: string;
    upper_tolerance: string;
    step_name: string;
    order_number: string;
    product_name: string;
    vendor_id: string;
    description: string;
  };
};

type GalleryViewNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

const GalleryView: React.FC = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<GalleryViewNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/product-recipe/product/1`); // Placeholder productId
        setProductDetails(response.data.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Fetch product details error:', error);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleIndexChanged = (index: number) => {
    setActiveIndex(index);
  };

  const handleDotPress = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.scrollTo(index);
    }
  };

  const openCamera = () => {
    navigation.navigate('Camera', {
      existingPictures: [],
      example_visual_url: productDetails[activeIndex].image_url,
      workId: '123',
      quality_control_id: '456',
      productId: '789',
      technical_drawing_numbering: 'TD123',
      lower_tolerance: 'LT',
      upper_tolerance: 'UT',
      step_name: productDetails[activeIndex].name,
      order_number: 'ORD123',
      product_name: 'Product',
      vendor_id: 'Vendor123',
      description: productDetails[activeIndex].description,
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
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        onIndexChanged={handleIndexChanged}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderPagination={(index, total) => (
          <View style={styles.paginationContainer}>
            {productDetails.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex ? styles.activeDot : styles.inactiveDot,
                ]}
                onPress={() => handleDotPress(i)}
              >
                <Text style={styles.dotText}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      >
        {productDetails.map((item, index) => (
          <View style={styles.slide} key={index}>
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleImagePress(item.image_url)}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={handleNext} style={styles.button}>
                Tamamla!
              </Button>
              {item.isPhotoTake && (
                <Button mode="contained" onPress={openCamera} style={styles.button}>
                  Fotoğraf Çek
                </Button>
              )}
            </View>
          </View>
        ))}
      </Swiper>
      <ImageViewerModal
        visible={modalVisible}
        imageUri={selectedImage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  image: {
    width: viewportWidth * 0.8,
    height: viewportHeight * 0.4,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#FF6F00',
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  dot: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#57B1DB',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
  dotText: {
    color: 'white',
    fontSize: 12,
  },
  dotStyle: {
    width: 0,
    height: 0,
  },
  activeDotStyle: {
    width: 0,
    height: 0,
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

export default GalleryView;
