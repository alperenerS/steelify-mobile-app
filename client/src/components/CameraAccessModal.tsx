// CameraAccessModal.tsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface CameraAccessModalProps {
  visible: boolean;
  onConfirm: () => void;
}

const CameraAccessModal: React.FC<CameraAccessModalProps> = ({visible, onConfirm}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onConfirm}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Kamera erişimine izin vermek üzeresiniz. Devam etmek için 'Tamam'ı tıklayın.</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
  }
});

export default CameraAccessModal;
