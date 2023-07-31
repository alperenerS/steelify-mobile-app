import { StyleSheet } from 'react-native';

const previewstyles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      button: {
        position: 'absolute', 
        bottom: '5%', 
        right: '15%',
        backgroundColor: '#008CBA',
        borderRadius: 12,
        padding: 10,
        elevation: 2,
        width: 120, 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center', 
      },
      buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      centerButton: {
        position: 'absolute',
        bottom: '5%',
        left: '15%',
        backgroundColor: '#008CBA',
        borderRadius: 12,
        padding: 10,
        elevation: 2,
        width: 120, 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center', 
    },
      addPhotoContainer: {
        position: 'absolute', 
        bottom: 20, 
        alignSelf: 'center', 
        alignItems: 'center',
      },
      addPhotoIcon: {
        width: 30, 
        height: 30, 
        marginBottom: 5
      },
      addPhotoText: {
        color: 'black', 
        fontWeight: 'bold',
        fontSize: 10
      },
      toleranceContainer: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 1,
        flexDirection: 'row', // içerikleri yan yana sıralar
        justifyContent: 'center', // içerikleri yatay eksende merkeze hizalar
        alignItems: 'center', // içerikleri dikey eksende merkeze hizalar
      },
      toleranceText: {
        fontSize: 16,
        color: 'gray', 
        marginHorizontal: 10, // Metinler arasında boşluk sağlar
        // ...diğer metin stilleri...
      },
  });
  


export default previewstyles;