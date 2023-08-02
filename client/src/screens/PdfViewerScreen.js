import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { useNavigation } from '@react-navigation/native';

const PdfViewerScreen = ({route}) => {
  const { pdfUrl, workId, productId } = route.params; // İlgili parametreleri alın
  const navigation = useNavigation();

  const source = {uri: pdfUrl, cache: true};

  return (
    <View style={{flex: 1}}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('WorkOrderScreen', {
            workId: workId,
            productId: productId,
          })}
          style={{ padding: 10, backgroundColor: 'blue' }}
        >
          <Text style={{ color: 'white' }}>İşe Git</Text>
        </TouchableOpacity>
      </View>
      <Pdf
        trustAllCerts={false}
        source={source}
        onError={(error) => {
          console.log(error);
        }}
        style={{flex: 1}}
      />
    </View>
  );
};

export default PdfViewerScreen;
