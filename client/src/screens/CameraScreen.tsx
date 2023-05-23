import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity, } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator'; 
import captureIcon from '../assets/camera_capture.png';
import camerastyles from '../components/Camera';

type CameraScreenRouteProp = RouteProp<RootStackParamList, 'Kamera'>;

const CameraScreen = ({route}: {route: CameraScreenRouteProp}) => {
  const cameraRef = useRef<RNCamera | null>(null);
  const { example_visual_url } = route.params;
  console.log('Example Image URL' ,example_visual_url);

  const [lastPictureUri, setLastPictureUri] = useState<string | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      setLastPictureUri(data.uri);
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
      >
        <View style={camerastyles.topLeftCorner}>
        <Image
            source={{ uri: example_visual_url }}
            style={camerastyles.smallThumbnail}
            onLoadStart={() => console.log('Load start')}
            onLoad={() => console.log('Load successful')}
            onError={(error) => console.log('Load error', error)}
        />
        </View>
      </RNCamera>

      <View style={camerastyles.bottomBar}>
        {lastPictureUri && 
          <View style={camerastyles.bottomLeftCorner}>
            <Image 
              source={{ uri: lastPictureUri }}
              style={camerastyles.smallThumbnail} 
            />
          </View>
        }
        <TouchableOpacity style={camerastyles.captureButton} onPress={takePicture}>
          <Image source={captureIcon} style={camerastyles.captureIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;