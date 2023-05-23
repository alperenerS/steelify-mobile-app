import React from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewerScreen = ({route}) => {
    const { pdfUrl } = route.params; // PDF URL'nin dinamik olarak alındığı yer

    const source = {uri: pdfUrl, cache: true};

    return (
        <View style={{flex: 1}}>
            <Pdf
                trustAllCerts={false} // Sertifika ayarı canlıya çıkarken silincek.
                source={source}
                onLoadComplete={(numberOfPages, filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                style={{flex: 1}}
            />
        </View>
    );
};

export default PdfViewerScreen;
