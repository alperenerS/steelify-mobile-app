// MeasuredValueInput.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface MeasuredValueInputProps {
  placeholder: string;
  onChangeText: (text: string) => void; // adding onChangeText prop
  value: string; // adding value prop
}

const MeasuredValueInput: React.FC<MeasuredValueInputProps> = ({ placeholder, onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder={placeholder} 
        onChangeText={onChangeText} 
        value={value} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default MeasuredValueInput;
