import { StyleSheet } from 'react-native';

const previewstyles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      button: {
        position: 'absolute', 
        bottom: '3%', 
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
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      centerButton: {
        position: 'absolute',
        bottom: '3%',
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
        alignItems: 'center', // içerikleri dikey eksende merkeze hizalar
      },
      toleranceText: {
        fontSize: 16,
        color: 'white', 
        marginHorizontal: 10, // Metinler arasında boşluk sağlar
        // ...diğer metin stilleri...
      },
      smallThumbnail: {
        width: 75,
        height: 75,
        margin: 5,
      },
      thumbnailsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // Diğer stil özelliklerini burada belirleyebilirsiniz.
      },
      selectedThumbnail: {
        borderWidth: 2,
        borderColor: 'red', // veya seçiminizi vurgulamak için başka bir renk
      },
      deleteButton: {
        position: 'absolute', 
        right: 0, 
        top: 0, 
        backgroundColor: 'red', 
        padding: 5
      },
      deleteButtonText: {
        color: 'white', 
        fontWeight: 'bold'
      }
  });
  


export default previewstyles;