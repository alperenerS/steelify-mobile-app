import React from 'react';
import { View, StyleSheet } from 'react-native';
import ListView from '../components/ListView';
import GalleryView from '../components/GalleryView';

interface TasksScreenProps {
  isCarouselMode: boolean;
  setIsCarouselMode: (mode: boolean) => void;
}

const TasksScreen: React.FC<TasksScreenProps> = ({ isCarouselMode }) => {
  return (
    <View style={styles.container}>
      {isCarouselMode ? <GalleryView /> : <ListView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TasksScreen;
