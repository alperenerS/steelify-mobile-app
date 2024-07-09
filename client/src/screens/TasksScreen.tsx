import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AccordionView from '../components/AccordionView';
import CarouselView from '../components/CarouselView';

const TasksScreen: React.FC = () => {
  const [isCarouselMode, setIsCarouselMode] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Works</Text>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsCarouselMode(!isCarouselMode)}
        >
          <Text style={styles.switchButtonText}>
            {isCarouselMode ? 'Accordion Mode' : 'Carousel Mode'}
          </Text>
        </TouchableOpacity>
      </View>
      {isCarouselMode ? <CarouselView /> : <AccordionView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  switchButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TasksScreen;
