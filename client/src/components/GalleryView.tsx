import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageViewerModal from '../components/ImageViewerModal';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const images = [
  { src: 'https://picsum.photos/200/300?random=1', description: 'Kesim işlemleri, hassas kesim', title: 'Kesim' },
  { src: 'https://picsum.photos/200/300?random=2', description: 'Büküm işlemleri, doğru ve hızlı büküm', title: 'Büküm' },
  { src: 'https://picsum.photos/200/300?random=3', description: 'Galvaniz kaplama, dayanıklılık artırma', title: 'Galvaniz' },
  { src: 'https://picsum.photos/200/300?random=4', description: 'Paketleme, güvenli ve düzenli paketleme', title: 'Paketleme' },
  { src: 'https://picsum.photos/200/300?random=5', description: 'Kaynak işlemleri, güçlü ve güvenilir kaynak', title: 'Kaynak' },
  { src: 'https://picsum.photos/200/300?random=6', description: 'Montaj, doğru ve hızlı montaj', title: 'Montaj' },
  { src: 'https://picsum.photos/200/300?random=7', description: 'Boyama, estetik ve koruyucu boyama', title: 'Boyama' },
  { src: 'https://picsum.photos/200/300?random=8', description: 'Test ve kontrol, kalite güvencesi', title: 'Test ve Kontrol' },
  { src: 'https://picsum.photos/200/300?random=9', description: 'Sevkiyat, güvenli ve zamanında teslimat', title: 'Sevkiyat' },
  { src: 'https://picsum.photos/200/300?random=10', description: 'Depolama, düzenli ve güvenli depolama', title: 'Depolama' },
];

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
      example_visual_url: images[activeIndex].src,
      workId: '123',
      quality_control_id: '456',
      productId: '789',
      technical_drawing_numbering: 'TD123',
      lower_tolerance: 'LT',
      upper_tolerance: 'UT',
      step_name: images[activeIndex].title,
      order_number: 'ORD123',
      product_name: 'Product',
      vendor_id: 'Vendor123',
      description: images[activeIndex].description,
    });
  };

  const handleImagePress = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setModalVisible(true);
  };

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
            {images.map((_, i) => (
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
        {images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Text style={styles.title}>{image.title}</Text>
            <TouchableOpacity onPress={() => handleImagePress(image.src)}>
              <Image source={{ uri: image.src }} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.description}>{image.description}</Text>
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={handleNext} style={styles.button}>
                Tamamla!
              </Button>
              <Button mode="contained" onPress={openCamera} style={styles.button}>
                Fotoğraf Çek
              </Button>
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
});

export default GalleryView;
