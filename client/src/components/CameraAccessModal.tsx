// CameraAccessModal.tsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface CameraAccessModalProps {
  visible: boolean;
  onConfirm: () => void;
  description?: string;
}

const CameraAccessModal: React.FC<CameraAccessModalProps> = ({visible, onConfirm, description}) => {
  if (!description) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onConfirm}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {description} 
            </Text> 
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
    color: 'black',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'black',
    textAlign: 'center',
  }
});

export default CameraAccessModal;
