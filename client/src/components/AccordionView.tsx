import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';

const images = [
  { src: 'https://picsum.photos/200/300?random=1', description: 'Description 1', title: 'Image 1' },
  { src: 'https://picsum.photos/200/300?random=2', description: 'Description 2', title: 'Image 2' },
  { src: 'https://picsum.photos/200/300?random=3', description: 'Description 3', title: 'Image 3' },
  { src: 'https://picsum.photos/200/300?random=4', description: 'Description 4', title: 'Image 4' },
  { src: 'https://picsum.photos/200/300?random=5', description: 'Description 5', title: 'Image 5' },
  { src: 'https://picsum.photos/200/300?random=6', description: 'Description 6', title: 'Image 6' },
  { src: 'https://picsum.photos/200/300?random=7', description: 'Description 7', title: 'Image 7' },
  { src: 'https://picsum.photos/200/300?random=8', description: 'Description 8', title: 'Image 8' },
  { src: 'https://picsum.photos/200/300?random=9', description: 'Description 9', title: 'Image 9' },
  { src: 'https://picsum.photos/200/300?random=10', description: 'Description 10', title: 'Image 10' },
  { src: 'https://picsum.photos/200/300?random=11', description: 'Description 11', title: 'Image 11' },
  { src: 'https://picsum.photos/200/300?random=12', description: 'Description 12', title: 'Image 12' },
  { src: 'https://picsum.photos/200/300?random=13', description: 'Description 13', title: 'Image 13' },
  { src: 'https://picsum.photos/200/300?random=14', description: 'Description 14', title: 'Image 14' },
  { src: 'https://picsum.photos/200/300?random=15', description: 'Description 15', title: 'Image 15' },
];


const AccordionView: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleNext = (index: number) => {
    if (index < images.length - 1) {
      setActiveIndex(index + 1);
    } else {
      setActiveIndex(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {images.map((image, index) => (
        <View key={index} style={styles.accordionContainer}>
          <TouchableOpacity onPress={() => setActiveIndex(activeIndex === index ? null : index)}>
            <Text style={styles.title}>{image.title}</Text>
          </TouchableOpacity>
          <Collapsible collapsed={activeIndex !== index}>
            <View style={styles.content}>
              <Image source={{ uri: image.src }} style={styles.image} />
              <Text style={styles.description}>{image.description}</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleNext(index)}>
                <Text style={styles.buttonText}>Tamamlandı!</Text>
              </TouchableOpacity>
            </View>
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordionContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 10,
  },
  image: {
    width: '80%',
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AccordionView;
