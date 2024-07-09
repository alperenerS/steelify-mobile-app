import React from 'react';
import { View, StyleSheet } from 'react-native';
import AccordionView from '../components/ListView';
import CarouselView from '../components/GalleryView';

interface TasksScreenProps {
  isCarouselMode: boolean;
  setIsCarouselMode: (mode: boolean) => void;
}

const TasksScreen: React.FC<TasksScreenProps> = ({ isCarouselMode }) => {
  return (
    <View style={styles.container}>
      {isCarouselMode ? <CarouselView /> : <AccordionView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TasksScreen;
