import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { getWorkById, getForm, postQualityControl } from '../services/workService'; 
import { getProductInfo } from '../services/productService'; 
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator'; 
import workstyles from '../components/WorkOrder';
import buttonstyles from '../components/Button';
import { WorkInfo } from '../models/WorkInfo';
import { QualityControl } from '../models/QualityControl';
import { ProductInfo } from '../models/ProductInfo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

type WorkOrderScreenRouteProp = RouteProp<RootStackParamList, 'WorkOrderScreen'>;
type navigationProp = StackNavigationProp<RootStackParamList, 'PdfViewerScreen'>;

const WorkOrderScreen = ({route}: {route: WorkOrderScreenRouteProp}) => {
  const [work, setWork] = useState<WorkInfo[]>([]);
  const { workId, productId } = route.params;
  const [formId, setFormId] = useState<number | null>(null);
  const [qualityControlData, setQualityControlData] = useState<QualityControl[]>();
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const navigation = useNavigation<navigationProp>();
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWorkById(workId);
      console.log('getWorkById response: ', data);
      setWork(data.workInfo);
      console.log('SetWork: ', data.workInfo);

      const formResponse = await getForm(productId, data.workInfo[0].vendor_id);
      console.log('getForm response: ', formResponse);
      setFormId(formResponse.form[0].id); 
      console.log('SetFormId: ', formResponse.form[0].id);

      const qualityControlResponse = await postQualityControl(formResponse.form[0].id, workId); 
      setQualityControlData(qualityControlResponse.qualitycontrol);
      console.log('setQualityControlData: ', qualityControlResponse.qualitycontrol);

      const productInfoResponse = await getProductInfo(productId);
      console.log('getProductInfo response: ', productInfoResponse);
      setProductInfo(productInfoResponse.productInfo[0]);
      console.log('SetProductInfo: ', productInfoResponse.productInfo[0]);

      navigation.setOptions({ title: productInfoResponse.productInfo[0].name });
    };
    
    fetchData();
  }, [workId]);

  if (!work) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View>
      {work.length > 0 ? (
        <>
          <Text>Work ID: {work[0].id}</Text>
          <Text>Vendor ID: {work[0].vendor_id}</Text>
          <Text>Quality Responsible ID: {work[0].quality_responsible_id}</Text>
          <Text>Form ID: {formId}</Text>
          {productInfo ? (
          <View style={buttonstyles.buttonContainer}>
            <Button
              title="Teknik Çizim"
              onPress={() => {
                if (productInfo?.technicaldrawingurl) {
                  navigation.navigate('PdfViewerScreen', { pdfUrl: productInfo.technicaldrawingurl })
                }
              }}
            />
            <Button
              title="Kılavuz"
              onPress={() => {
                if (productInfo?.guideurl) {
                  navigation.navigate('PdfViewerScreen', { pdfUrl: productInfo.guideurl })
                }
              }}
            />
          </View>
        ) : (
          <Text>Loading product info...</Text>
        )}
          <FlatList 
            data={qualityControlData}
            keyExtractor={(item, index) => `key-${index}`}
            renderItem={({item}) => (
              <TouchableOpacity>
                  <View style={workstyles.card}>
                      <Text style={workstyles.text}>{item.step_name}</Text>
                      <Text style={workstyles.text}>Teknik Çizim Numarası: {item.technical_drawing_numbering}</Text>
                      <Text style={workstyles.text}>Work ID: {item.work_id}</Text>
                      <Icon name="camera" size={30} color="#000" /> 
                  </View>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
);

};

export default WorkOrderScreen;