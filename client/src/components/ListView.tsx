import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, UIManager, LayoutAnimation, Platform, TouchableOpacity } from 'react-native';
import { List, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageViewerModal from '../components/ImageViewerModal';
import YoutubePlayer from 'react-native-youtube-iframe';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  { src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Sample YouTube Video', title: 'YouTube Video', videoId: 'dQw4w9WgXcQ' }, // YouTube video
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

type ListViewNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

const ListView: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(0);
  const navigation = useNavigation<ListViewNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  const handleNext = (index: number) => {
    const nextIndex = index + 1;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (nextIndex < images.length) {
      setExpanded(nextIndex);
    } else {
      setExpanded(null);
    }
  };

  const openCamera = (index: number) => {
    navigation.navigate('Camera', {
      existingPictures: [],
      example_visual_url: images[index].src,
      workId: '123',
      quality_control_id: '456',
      productId: '789',
      technical_drawing_numbering: 'TD123',
      lower_tolerance: 'LT',
      upper_tolerance: 'UT',
      step_name: images[index].title,
      order_number: 'ORD123',
      product_name: 'Product',
      vendor_id: 'Vendor123',
      description: images[index].description,
    });
  };

  const handleImagePress = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      {images.map((image, index) => (
        <List.Accordion
          key={index}
          title={image.title}
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
            {image.videoId ? (
              <YoutubePlayer
                height={200}
                play={false}
                videoId={image.videoId}
              />
            ) : (
              <TouchableOpacity onPress={() => handleImagePress(image.src)}>
                <Image source={{ uri: image.src }} style={styles.image} />
              </TouchableOpacity>
            )}
            <Text style={styles.description}>{image.description}</Text>
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={() => handleNext(index)} style={styles.button}>
                Tamamla!
              </Button>
              <Button mode="contained" onPress={() => openCamera(index)} style={styles.button}>
                Fotoğraf Çek
              </Button>
            </View>
          </View>
        </List.Accordion>
      ))}
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
});

export default ListView;
