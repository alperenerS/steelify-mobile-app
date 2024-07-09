import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Switch, Text } from 'react-native-paper';
import AccordionView from '../components/AccordionView';
import CarouselView from '../components/CarouselView';

const TasksScreen: React.FC = () => {
  const [isCarouselMode, setIsCarouselMode] = useState(false);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{isCarouselMode ? 'Galeri Görünümü' : 'Liste Görünümü'}</Text>
        <Switch
            value={isCarouselMode}
            onValueChange={() => setIsCarouselMode(!isCarouselMode)}
          />
        </View>
      </Appbar.Header>
      {isCarouselMode ? <CarouselView /> : <AccordionView />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingRight: 16,
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default TasksScreen;