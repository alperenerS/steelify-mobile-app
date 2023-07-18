import React, {useRef, useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native'; // Added Text import
import {RNCamera} from 'react-native-camera';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNavigator';
import camerastyles from '../components/Camera';
import captureIcon from '../assets/camera_capture.png';
import ImageViewerModal from '../components/ImageViewerModal';
import CameraAccessModal from '../components/CameraAccessModal';

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
  const {example_visual_url, workId, quality_control_id, productId, technical_drawing_numbering, step_name, order_number, product_name, vendor_id} =
    route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [accessModalVisible, setAccessModalVisible] = useState(true);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: 10 }}>
          <Text>Teknik Çizim No: {String(technical_drawing_numbering)}</Text>
        </View>
      ),
    });
  }, [navigation, technical_drawing_numbering]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      navigation.navigate('Önizleme', { pictureUri: data.uri, example_visual_url, workId, quality_control_id, productId, technical_drawing_numbering, step_name, order_number, product_name, vendor_id});
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
            style={camerastyles.smallThumbnail}
          />
        </TouchableOpacity>
      </RNCamera>

      <ImageViewerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageUri ={example_visual_url}
      />

      <CameraAccessModal // New Modal
        visible={accessModalVisible}
        onConfirm={() => setAccessModalVisible(false)}
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
