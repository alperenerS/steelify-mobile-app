import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

interface ReportViewerModalProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: string, description: string) => void;
}

const ReportViewerModal: React.FC<ReportViewerModalProps> = ({
  visible,
  onClose,
  onOptionSelect,
}) => {
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      onOptionSelect(selectedOption, description);
    }
    setSelectedOption(null);
    setDescription('');
    onClose();
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
        {!selectedOption && (
            <>
          <Text style={styles.modalText}>Sağ üstte yazılı olan teknik çizim numarasındaki hatayı aşağıdan seçiniz</Text>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionSelect("Major Hata")}>
                <Text style={styles.optionText}>Major Hata</Text>
                <Text style={styles.optionDescription}>Önemli bir hatayı rapor et</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionSelect("Bu Ölçü Ölçülemiyor")}>
                <Text style={styles.optionText}>Bu Ölçü Ölçülemiyor</Text>
                <Text style={styles.optionDescription}>Ölçümün yapılmasının mümkün olmadığını rapor et</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionSelect("Gereksiz Ölçü")}>
                <Text style={styles.optionText}>Gereksiz Ölçü</Text>
                <Text style={styles.optionDescription}>Bu ölçümün gereksiz olduğunu rapor et</Text>
              </TouchableOpacity>
            </>
          )}

          {selectedOption && (
            <View>
              <Text style={styles.selectedOption}>{selectedOption}</Text>
              <Text style={styles.inputLabel}>Açıklama:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Açıklama girin..."
                multiline
              />
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Onayla</Text>
              </TouchableOpacity>
            </View>
          )}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  selectedOption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ReportViewerModal;
