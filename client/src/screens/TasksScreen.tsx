import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  StatusBar,
} from 'react-native';
import {WorkProducts} from '../models/WorkProducts';
import {
  getWorks,
  getWorkById,
  getForm,
  postQualityControl,
} from '../services/workService';
import {getData} from '../utils/storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import taskstyles from '../components/Task';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import {getProductInfo} from '../services/productService';
import pdfIcon from '../assets/pdfIcon.png';
import SearchBar from '../components/SearchBar';
import {uploadCachedImages} from '../services/PreviewService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';

type navigationProp = StackNavigationProp<
  RootStackParamList,
  'WorkOrderScreen' | 'PdfViewerScreen'
>;

const TasksScreen = () => {
  const navigation = useNavigation<navigationProp>();
  const [workProducts, setWorkProducts] = useState<WorkProducts[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const isFocused = useIsFocused();
  const [isCached, setIsCached] = useState<boolean | null>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getData('userToken');
      if (token) {
        const workProductsData = await getWorks(token);

        // For each workProduct, get the product info and attach it to the workProduct
        const workProducts = await Promise.all(
          workProductsData.workProducts.map(
            async (workProduct: {product_id: number; work_id: number}) => {
              const productInfoData = await getProductInfo(
                workProduct.product_id,
              );

              const workInfoData = await getWorkById(workProduct.work_id);
              const formId = await getForm(
                workProduct.product_id,
                workInfoData.workInfo[0].vendor_id,
              );
              const formIds = formId.form.map(id => id.id);
              for (const formId of formIds) {
                await postQualityControl(formId, workProduct.work_id);
              }

              return {
                ...workProduct,
                productInfo: productInfoData.productInfo[0],
                order_number: workInfoData.workInfo[0].order_number,
              };
            },
          ),
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

  useEffect(() => {
    async function isCachedImage() {
      const keys = await AsyncStorage.getAllKeys();
      const cachedPhotosKeys: any = keys.filter(key =>
        key.startsWith('cachedPhoto_'),
      );
      for (const key of cachedPhotosKeys) {
        const cachedImage: any = await AsyncStorage.getItem(key);
        const isCachedImage = JSON.parse(cachedImage);
        if (isCachedImage !== null) {
          return setIsCached(true);
        }
      }
      setIsCached(false);
      console.log(isCached);
    }
    if (isFocused) {
      isCachedImage();
    }
  }, [isFocused, isCached]);

  const filteredWorkProducts = workProducts.filter(
    workProduct =>
      workProduct.status !== 'Closed' &&
      `${workProduct.work_id}-${workProduct.productInfo?.name}-${workProduct.order_number}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const handlePress = (workId: number, productId: number) => {
    navigation.navigate('WorkOrderScreen', {
      workId: workId,
      productId: productId,
    });
  };

  const handlePDFPress = (
    pdfUrl: string | null | undefined,
    workId: number,
    productId: number,
  ) => {
    if (pdfUrl) {
      navigation.navigate('PdfViewerScreen', {
        pdfUrl: pdfUrl,
        workId,
        productId,
      });
    }
  };

  const handleUploadImageWithError = async () => {
    setIsButtonDisabled(true);
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      if (isCached) {
        showMessage({
          message: 'HATA !',
          type: 'warning',
          description: 'İnternet bağlantısı ile tekrar deneyin !',
        });
      }
    } else {
      showMessage({
        message: 'Başarılı !',
        type: 'success',
        description: 'Resimler başarıyla yüklendi !',
      });
      uploadCachedImages();
    }
    setTimeout(() => setIsButtonDisabled(false), 2000);
  };

  return (
    <View>
      {isCached ? (
        <Button
          title="İnternet kapalı iken çekilen resimleri yükle."
          onPress={handleUploadImageWithError}
          disabled={isButtonDisabled}
        />
      ) : null}
      <FlashMessage
        position="top"
        hideStatusBar={false}
        statusBarHeight={StatusBar.currentHeight}
      />
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={newSearchQuery => setSearchQuery(newSearchQuery)}
      />
      <FlatList
        contentContainerStyle={{paddingBottom: 80}}
        data={filteredWorkProducts}
        keyExtractor={item => `${item.work_id}-${item.product_id}`}
        renderItem={({item}) => (
          <View style={taskstyles.card}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{flex: 0.8}}
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
                  style={{
                    flex: 0.2,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={() =>
                    item.productInfo?.technicaldrawingurl
                      ? handlePDFPress(
                          item.productInfo?.technicaldrawingurl,
                          item.work_id,
                          item.product_id,
                        )
                      : null
                  }>
                  <Image source={pdfIcon} style={{width: 40, height: 40}} />
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
