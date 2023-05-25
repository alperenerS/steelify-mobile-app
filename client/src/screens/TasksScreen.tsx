import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { WorkProducts } from '../models/WorkProducts'; 
import { getWorks } from '../services/workService'; 
import { getData } from '../utils/storage'; 
import { useIsFocused, useNavigation } from '@react-navigation/native';
import taskstyles from '../components/Task';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type navigationProp = StackNavigationProp<RootStackParamList, 'WorkOrderScreen'>;

const TasksScreen = () => {
  const navigation = useNavigation<navigationProp>();
  const [workProducts, setWorkProducts] = useState<WorkProducts[]>([]);
  const isFocused = useIsFocused(); 

  useEffect(() => {
    const fetchData = async () => {
      const token = await getData('userToken');
      if (token) {
        const data = await getWorks(token);
        setWorkProducts(data.workProducts);
      } else {
        console.log('No token found');
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handlePress = (workId: number, productId: number) => {
    navigation.navigate('WorkOrderScreen', { workId: workId, productId: productId });
  };

  return (
    <View>
      <FlatList 
        data={workProducts}
        keyExtractor={item => `${item.work_id}-${item.product_id}`}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item.work_id, item.product_id)}>
            <View style={taskstyles.card}>
              <Text style={taskstyles.text}>Product ID: {item.product_id}</Text>
              <Text style={taskstyles.text}>Work ID: {item.work_id}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


export default TasksScreen;
