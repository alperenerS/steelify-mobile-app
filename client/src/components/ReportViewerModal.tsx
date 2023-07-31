import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

interface ReportViewerModalProps {
  visible: boolean;
  onClose: () => void;
}

const ReportViewerModal: React.FC<ReportViewerModalProps> = ({
  visible,
  onClose,
}) => {
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
          <Text style={styles.modalText}>Lütfen bir hata türü seçin:</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              // Perform Major Error action
            }}>
            <Text style={styles.optionText}>Major Hata</Text>
            <Text style={styles.optionDescription}>Önemli bir hatayı rapor et</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              // Perform Unmeasurable action
            }}>
            <Text style={styles.optionText}>Bu Ölçü Ölçülemiyor</Text>
            <Text style={styles.optionDescription}>Ölçümün yapılmasının mümkün olmadığını rapor et</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              // Perform Unnecessary action
            }}>
            <Text style={styles.optionText}>Gereksiz Ölçü</Text>
            <Text style={styles.optionDescription}>Bu ölçümün gereksiz olduğunu rapor et</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  optionDescription: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ReportViewerModal;
