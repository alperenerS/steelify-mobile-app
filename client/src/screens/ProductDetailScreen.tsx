import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, UIManager, LayoutAnimation, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { List, Button, Text } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import ImageViewerModal from '../components/ImageViewerModal';
import YoutubePlayer from 'react-native-youtube-iframe';
import { API_BASE_URL } from '../config';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  ProductDetail: { productId: string };
};

type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();
  const { productId } = route.params;
  const [expanded, setExpanded] = useState<number | null>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/product-recipe/product/${productId}`);
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
  }, [productId]);

  const handlePress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  const handleNext = (index: number) => {
    const nextIndex = index + 1;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (nextIndex < productDetails.length) {
      setExpanded(nextIndex);
    } else {
      setExpanded(null);
    }
  };

  const openCamera = (index: number) => {
    navigation.navigate('Camera', {
      existingPictures: [],
      example_visual_url: productDetails[index].image_url,
      workId: '123',
      quality_control_id: '456',
      productId: '789',
      technical_drawing_numbering: 'TD123',
      lower_tolerance: 'LT',
      upper_tolerance: 'UT',
      step_name: productDetails[index].name,
      order_number: 'ORD123',
      product_name: 'Product',
      vendor_id: 'Vendor123',
      description: productDetails[index].description,
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
            titleStyle={expanded === index ? styles.expandedTitle : styles.title}
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
