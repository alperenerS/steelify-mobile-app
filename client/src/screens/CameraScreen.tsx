import React, {useRef, useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import camerastyles from '../components/Camera';
import captureIcon from '../assets/camera_capture.png';
import ImageViewerModal from '../components/ImageViewerModal';
import CameraAccessModal from '../components/CameraAccessModal';
import ReportViewerModal from '../components/ReportViewerModal'; // New Import

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
  const cameraRef = useRef<RNCamera | null>(null);
  const {existingPictures, example_visual_url, workId, quality_control_id, productId, technical_drawing_numbering, lower_tolerance, upper_tolerance, step_name, order_number, product_name, vendor_id} =
    route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [accessModalVisible, setAccessModalVisible] = useState(true);
  const [reportModalVisible, setReportModalVisible] = useState(false); // New State
  const [pictures, setPictures] = useState<string[]>(existingPictures || []);
  const [selectedOption, setSelectedOption] = useState('');
  const {description} = route.params;
  const [popupDescription, setPopupDescription] = useState('');

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

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const updatedPictures = [...existingPictures, data.uri];  // existingPictures dizisini güncelle
      setPictures(updatedPictures);
     navigation.navigate('Önizleme', { pictures: updatedPictures, example_visual_url, workId, quality_control_id, productId, technical_drawing_numbering, lower_tolerance, upper_tolerance, step_name, order_number, product_name, vendor_id, issue_text: selectedOption, description, issue_description: popupDescription });
    }
  };
  
  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}>
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
      </RNCamera>

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
          onPress={takePicture}
        >
          <Image source={captureIcon} style={camerastyles.captureIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;
