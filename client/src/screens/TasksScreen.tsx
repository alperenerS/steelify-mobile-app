import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {WorkProducts} from '../models/WorkProducts';
import {getWorks, getWorkById} from '../services/workService';
import {getData} from '../utils/storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import taskstyles from '../components/Task';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import {getProductInfo} from '../services/productService';
import pdfIcon from '../assets/pdfIcon.png'
import SearchBar from '../components/SearchBar';

type navigationProp = StackNavigationProp<
  RootStackParamList,
  'WorkOrderScreen' | 'PdfViewerScreen'
>;

const TasksScreen = () => {
  const navigation = useNavigation<navigationProp>();
  const [workProducts, setWorkProducts] = useState<WorkProducts[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getData('userToken');
      if (token) {
        const workProductsData = await getWorks(token);

        // For each workProduct, get the product info and attach it to the workProduct
        const workProducts = await Promise.all(
          workProductsData.workProducts.map(async workProduct => {
            const productInfoData = await getProductInfo(workProduct.product_id);
            
            const workInfoData = await getWorkById(workProduct.work_id);
            return {
              ...workProduct,
              productInfo: productInfoData.productInfo[0],
              order_number: workInfoData.workInfo[0].order_number, 
            };
          }),
        );

        setWorkProducts(workProducts);
      } else {
        console.log('No token found');
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const filteredWorkProducts = workProducts.filter(workProduct =>
    (`${workProduct.work_id}-${workProduct.productInfo?.name}-${workProduct.order_number}`.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handlePress = (workId: number, productId: number) => {
    navigation.navigate('WorkOrderScreen', {
      workId: workId,
      productId: productId,
    });
  };

  const handlePDFPress = (pdfUrl: string | null | undefined, workId: number , productId: number) => {
    if (pdfUrl) {
      navigation.navigate('PdfViewerScreen', {pdfUrl: pdfUrl, workId, productId});
    }
  };

  return (
    <View>
       <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={(newSearchQuery) => setSearchQuery(newSearchQuery)}
      />
      <FlatList
        data={filteredWorkProducts }
        keyExtractor={item => `${item.work_id}-${item.product_id}`}
        renderItem={({item}) => (
          <View style={taskstyles.card}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{ flex: 0.8 }}
                onPress={() => handlePress(item.work_id, item.product_id)}>
                <Text style={taskstyles.text}>
                  Product Name: {item.productInfo?.name}
                </Text>
                <Text style={taskstyles.text}>Work ID: {item.work_id}</Text>
                <Text style={taskstyles.text}>
                  Order Number: {item.order_number}
                </Text>
              </TouchableOpacity>
              {item.productInfo?.technicaldrawingurl && (
              <TouchableOpacity
                style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center' }}
                onPress={() =>
                  item.productInfo?.technicaldrawingurl
                    ? handlePDFPress(item.productInfo?.technicaldrawingurl,item.work_id,item.product_id)
                    : null
                }
              >
                <Image source={pdfIcon} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TasksScreen;