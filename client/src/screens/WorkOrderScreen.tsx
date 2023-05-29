import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button, Image, SafeAreaView } from 'react-native';
import { getWorkById, getForm, postQualityControl } from '../services/workService'; 
import { getProductInfo } from '../services/productService'; 
import { getImageCounts } from '../services/imageService';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator'; 
import workstyles from '../components/WorkOrder';
import buttonstyles from '../components/Button';
import { WorkInfo } from '../models/WorkInfo';
import { QualityControl } from '../models/QualityControl';
import { ProductInfo } from '../models/ProductInfo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import cameraIcon from '../assets/camera_icon.png';
import { ImageCount } from '../models/ImageCount';

type WorkOrderScreenRouteProp = RouteProp<RootStackParamList, 'WorkOrderScreen'>;
type navigationProp = StackNavigationProp<RootStackParamList, 'PdfViewerScreen'> | StackNavigationProp<RootStackParamList, 'Kamera'>;

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
      setWork(data.workInfo);

      const formResponse = await getForm(productId, data.workInfo[0].vendor_id);
      setFormId(formResponse.form[0].id); 

      const qualityControlResponse = await postQualityControl(formResponse.form[0].id, workId); 

      const qualityControlIds = qualityControlResponse.qualitycontrol.map(qc => qc.id);
      const imageCountData = await getImageCounts(qualityControlIds, workId);
      const imageCountRecord: Record<string, number> = {};

      imageCountData.forEach(ic => {
        imageCountRecord[ic.quality_control_id] = ic.count;
      });

      const updatedQualityControlData = qualityControlResponse.qualitycontrol.map(qc => ({
        ...qc,
        imageCount: imageCountRecord[qc.id] || 0,
      }));

      setQualityControlData(updatedQualityControlData);

      const productInfoResponse = await getProductInfo(productId);
      setProductInfo(productInfoResponse.productInfo[0]);

      navigation.setOptions({ title: productInfoResponse.productInfo[0].name });
    };
    
    fetchData();
  }, [workId]);

  if (!work) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 80 }}>
    <View>
      {work.length > 0 ? (
        <>
          <Text>Work ID: {work[0].id}, Vendor ID: {work[0].vendor_id}, QR ID: {work[0].quality_responsible_id}, Form ID: {formId}</Text>
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
            renderItem={({item}) => {
              // Directly use item.imageCount
              const imageCount = item.imageCount;
              // If imageCount is not equal to sample_quantity, then render the item
              if(imageCount !== item.sample_quantity) {
                return (
                  <View style={workstyles.card}>
                      <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                              <Text style={workstyles.text}>{imageCount} / {item.sample_quantity}</Text>
                          </View>
                          <View style={{flex: 0.7}}>
                              <Text style={workstyles.text}>{item.step_name}</Text>
                              <Text style={workstyles.text}>Teknik Çizim Numarası: {item.technical_drawing_numbering}</Text>
                              <Text style={workstyles.text}>ID: {item.id}</Text>
                          </View>
                          <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Kamera', { example_visual_url: item.example_visual_url || null, workId: item.work_id , quality_control_id: item.id, productId: productId })}>
                              <Image source={cameraIcon} style={{width: 40, height: 40}} />
                            </TouchableOpacity>
                            <Text style={workstyles.text2}>Fotoğraf Çek</Text>
                          </View>
                      </View>
                  </View>
                );
              }
              else {
                return null;
              }
            }}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
    </SafeAreaView>
  );
};

export default WorkOrderScreen;
