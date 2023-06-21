import React, {useRef} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import {
  PinchGestureHandler,
  State,
  PinchGestureHandlerStateChangeEvent,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

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
  const scale = useRef(new Animated.Value(1)).current;
  const onPinchEvent = Animated.event<PinchGestureHandlerGestureEvent>(
    [{nativeEvent: {scale: scale}}],
    {useNativeDriver: true},
  );

  const onPinchStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
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
          <PinchGestureHandler
            onGestureEvent={onPinchEvent}
            onHandlerStateChange={onPinchStateChange}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <Animated.Image
                style={[styles.modalImage, {transform: [{scale: scale}]}]}
                source={
                  imageUri
                    ? {uri: imageUri}
                    : require('../assets/default_image.png')
                }
              />
            </TouchableOpacity>
          </PinchGestureHandler>
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
