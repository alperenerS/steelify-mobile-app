import { StyleSheet } from 'react-native';

const previewstyles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: 'white',
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
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 10
      }
  });
  


export default previewstyles;