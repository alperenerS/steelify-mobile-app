import React, { useState, useRef } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { GestureHandlerStateChangeNativeEvent, TapGestureHandler, State } from 'react-native-gesture-handler';

interface ImageViewerModalProps {
  visible: boolean;
  onClose: () => void;
  imageUri: string | null;
}

const { width, height } = Dimensions.get('window');

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  visible,
  onClose,
  imageUri,
}) => {
  const [zoom, setZoom] = useState(1);
  const doubleTapRef = useRef(null);
  const zoomableViewRef = useRef(null);

  const onDoubleTap = ({ nativeEvent }: { nativeEvent: GestureHandlerStateChangeNativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setZoom(prevZoom => prevZoom === 1 ? 2 : 1);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <TapGestureHandler
          ref={doubleTapRef}
          numberOfTaps={2}
          onHandlerStateChange={onDoubleTap}
        >
          <ReactNativeZoomableView
            ref={zoomableViewRef}
            maxZoom={3}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={zoom}
            bindToBorders={true}
            style={styles.zoomableView}
          >
            <Image
              style={styles.modalImage}
              source={
                imageUri
                  ? { uri: imageUri }
                  : require('../assets/default_image.png')
              }
              resizeMode='contain'
            />
          </ReactNativeZoomableView>
        </TapGestureHandler>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  zoomableView: {
    width: width,
    height: height,
  },
  modalImage: {
    width: width,
    height: height,
  },
});

export default ImageViewerModal;
