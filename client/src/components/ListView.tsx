import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, UIManager, LayoutAnimation, Platform } from 'react-native';
import { List, Button, Text } from 'react-native-paper';

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
  { src: 'https://picsum.photos/200/300?random=10', description: 'Depolama, düzenli ve güvenli depolama', title: 'Depolama' },
];

const ListView: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(0); // İlk adım açık

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

  return (
    <ScrollView style={styles.container}>
      {images.map((image, index) => (
        <List.Accordion
          key={index}
          title={image.title}
          expanded={expanded === index}
          onPress={() => handlePress(index)}
          titleStyle={expanded === index ? styles.expandedTitle : styles.title}
        >
          <View style={styles.content}>
            <Image source={{ uri: image.src }} style={styles.image} />
            <Text style={styles.description}>{image.description}</Text>
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={() => handleNext(index)} style={styles.button}>
                Tamamla!
              </Button>
              <Button mode="contained" onPress={() => {}} style={styles.button}>
                Fotoğraf Çek
              </Button>
            </View>
          </View>
        </List.Accordion>
      ))}
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
    color: '#57B1DB'
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
});

export default ListView;
