import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { useNavigation } from '@react-navigation/native';

const PdfViewerScreen = ({route}) => {
  const { pdfUrl, workId, productId } = route.params;
  const navigation = useNavigation();

  const source = {uri: pdfUrl, cache: true};

  return (
    <View style={{flex: 1}}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onError={(error) => {
          console.log(error);
        }}
        style={{flex: 1}}
      />
      <View
        style={{
          position: 'absolute', // Bu satırı ekledim
          left: 10,
          bottom: 30,
          backgroundColor: 'turquoise',
          padding: 15,
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('WorkOrderScreen', {
            workId: workId,
            productId: productId,
          })}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>İşe Git</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PdfViewerScreen;
