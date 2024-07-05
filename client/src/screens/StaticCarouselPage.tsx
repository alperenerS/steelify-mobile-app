import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import BackButtonHeader from '../components/BackButtonHeader';

const { width: viewportWidth } = Dimensions.get('window');

interface ImageData {
  src: string;
  description: string;
}

const images: ImageData[] = [
  { src: 'https://picsum.photos/200/300?random=1', description: 'Description 1' },
  { src: 'https://picsum.photos/200/300?random=2', description: 'Description 2' },
  { src: 'https://picsum.photos/200/300?random=3', description: 'Description 3' },
  { src: 'https://picsum.photos/200/300?random=4', description: 'Description 4' },
  { src: 'https://picsum.photos/200/300?random=5', description: 'Description 5' },
  { src: 'https://picsum.photos/200/300?random=6', description: 'Description 6' },
  { src: 'https://picsum.photos/200/300?random=7', description: 'Description 7' },
  { src: 'https://picsum.photos/200/300?random=8', description: 'Description 8' },
  { src: 'https://picsum.photos/200/300?random=9', description: 'Description 9' },
  { src: 'https://picsum.photos/200/300?random=10', description: 'Description 10' },
  { src: 'https://picsum.photos/200/300?random=11', description: 'Description 11' },
  { src: 'https://picsum.photos/200/300?random=12', description: 'Description 12' },
  { src: 'https://picsum.photos/200/300?random=13', description: 'Description 13' },
  { src: 'https://picsum.photos/200/300?random=14', description: 'Description 14' },
  { src: 'https://picsum.photos/200/300?random=15', description: 'Description 15' },
];

const StaticCarouselPage: React.FC = () => {
  const swiperRef = useRef<Swiper>(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  return (
    <View style={styles.container}>
      <BackButtonHeader title="Static Carousel" />
      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        showsButtons={false}
        loop={true}
      >
        {images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image source={{ uri: image.src }} style={styles.image} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{image.description}</Text>
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Tamamlandı!</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Swiper>
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
  },
  image: {
    width: viewportWidth * 0.8,
    height: '40%',
    resizeMode: 'cover',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginLeft: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StaticCarouselPage;
