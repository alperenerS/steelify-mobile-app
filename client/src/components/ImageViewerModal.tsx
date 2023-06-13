// ImageViewerModal.tsx
import React from 'react';
import { View, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface ImageViewerModalProps {
  visible: boolean;
  onClose: () => void;
  imageUri: string | null;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({visible, onClose, imageUri}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
        <TouchableOpacity style={styles.modalContainer} onPress={onClose} activeOpacity={1}>
          <View style={styles.modalContentTouchable}>
            <TouchableOpacity activeOpacity={1}>
              <Image
                source={imageUri ? {uri: imageUri} : require('../assets/default_image.png')}
                style={styles.modalImage}
              />
            </TouchableOpacity>
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
