import React, { useState, useRef } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { GestureHandlerStateChangeNativeEvent, TapGestureHandler, State } from 'react-native-gesture-handler';

interface ImageViewerModalProps {
  visible: boolean;
  onClose: () => void;
  imageUri: string | null;
}

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
      setZoom(prevZoom => prevZoom === 1 ? 1.5 : 1);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={onClose}
        activeOpacity={1}>
        <View style={styles.modalContentTouchable}>
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
              style={styles.modalImage}
            >
              <Image
                style={styles.modalImage}
                source={
                  imageUri
                    ? {uri: imageUri}
                    : require('../assets/default_image.png')
                }
              />
            </ReactNativeZoomableView>
          </TapGestureHandler>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContentTouchable: {
    width: '80%',
    aspectRatio: 1,
    borderColor: 'white',
    borderWidth: 1,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
});

export default ImageViewerModal;
