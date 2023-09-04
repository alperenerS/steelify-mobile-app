import React, {useRef, useState,} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet,} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import camerastyles from '../components/Camera';
import ImageViewerModal from '../components/ImageViewerModal';
import CameraAccessModal from '../components/CameraAccessModal';
import ReportViewerModal from '../components/ReportViewerModal'; // New Import
import { useFocusEffect } from '@react-navigation/core';



type CameraScreenRouteProp = RouteProp<RootStackParamList, 'Kamera'>;
type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Kamera'
>;

interface CameraScreenProps {
  route: CameraScreenRouteProp;
  navigation: CameraScreenNavigationProp;
}

const CameraScreen: React.FC<CameraScreenProps> = ({route, navigation}) => {
  const cameraRef = useRef<Camera | null>(null);
  const {existingPictures, example_visual_url, workId, quality_control_id, productId, technical_drawing_numbering, lower_tolerance, upper_tolerance, step_name, order_number, product_name, vendor_id} =
    route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [accessModalVisible, setAccessModalVisible] = useState(true);
  const [reportModalVisible, setReportModalVisible] = useState(false); // New State
  const [pictures, setPictures] = useState<string[]>(existingPictures || []);
  const [selectedOption, setSelectedOption] = useState('');
  const {description} = route.params;
  const [popupDescription, setPopupDescription] = useState('');
  const devices= useCameraDevices();
  const switchCameraIcon = require('../assets/switch_camera.png');
  const captureIcon = require('../assets/camera_capture.png');
  

  
  const [isActive, setIsActive] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity   style={camerastyles.reportButton}
 onPress={() => setReportModalVisible(true)}>
            <Image
              source={require('../assets/report_icon.png')}
              style={camerastyles.reportIcon}
            />
          </TouchableOpacity> 
          <Text style={{ color: 'black', paddingRight: 10 }}>Teknik Çizim No: {String(technical_drawing_numbering)}</Text>
        </View>
      ),
    });
  
  }, [navigation, technical_drawing_numbering]);
  useFocusEffect(
    React.useCallback(() => {
      // Ekrana dönüldüğünde kamerayı aktif hale getir
      setIsActive(true);

      return () => {
        // Ekrandan çıkıldığında kamerayı pasif hale getir
        setIsActive(false);
      };
    }, [])
  );

  const takePicture = async () => {
    
      if (cameraRef.current) {
        const data = await cameraRef.current.takePhoto({ qualityPrioritization: 'quality', flash: 'auto', enableAutoStabilization: true });
        const imagePath = `file://${data.path}`;
        const updatedPictures = [...existingPictures, imagePath]; // existingPictures dizisini güncelle
        setPictures(updatedPictures);
       navigation.navigate('Önizleme', { pictures: updatedPictures, example_visual_url, workId, quality_control_id, productId, technical_drawing_numbering, lower_tolerance, upper_tolerance, step_name, order_number, product_name, vendor_id, issue_text: selectedOption, description, issue_description: popupDescription });
      }
  };

  const [cameraType, setCameraType] = useState("back");

  // Kamera tipini değiştirecek bir fonksiyon ekliyoruz.
  const switchCameraType = () => {
    setCameraType(prevType => prevType === "back" ? "front" : "back");
  }

  // Kullanılacak kamera cihazını belirliyoruz.
  const device = cameraType === "back" ? devices.back : devices.front;

  if (device==null) {
    return null;
  }
  
  return (
    <View style={{flex: 1}}>
      <Camera
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      device={device}
      photo={true}
      enableZoomGesture={true}
      isActive={isActive}
    >
     
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={(e) => {
            const { locationX, locationY } = e.nativeEvent;
            // Odaklama işlemi için Camera API'sini burada kullanın.
          }}
        >
       
      </TouchableOpacity>
    </Camera>
  <TouchableOpacity
        style={camerastyles.topLeftCorner}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={example_visual_url ? {uri: example_visual_url} : require('../assets/default_image.png')}
          resizeMode='contain' 
          style={camerastyles.smallThumbnail}
        />
      </TouchableOpacity>
      <TouchableOpacity
          style={{ position: 'absolute', right: 20, bottom: 25 }}
          onPress={switchCameraType}
      >
          <Image 
              source={switchCameraIcon} 
              style={{ width: 60, height: 60 }} 
          />
      </TouchableOpacity>
    
      <ImageViewerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageUri={example_visual_url}
      />

      <CameraAccessModal
        visible={accessModalVisible}
        onConfirm={() => setAccessModalVisible(false)}
        description={description}
      />
      <ReportViewerModal
        visible={reportModalVisible}
        onClose={() => setReportModalVisible(false)}
        onOptionSelect={(option, description) => {
          setSelectedOption(option);
          setPopupDescription(description); // Add this line
        }}
      />
      <View style={camerastyles.bottomBar}>
      <TouchableOpacity
         style={camerastyles.captureButton}
          onPress={() => {
          
          takePicture();
   }}
>
          <Image source={captureIcon} style={camerastyles.captureIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;
