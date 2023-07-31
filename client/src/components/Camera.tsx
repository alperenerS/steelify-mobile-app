import { StyleSheet } from 'react-native';

const camerastyles = StyleSheet.create({
  topLeftCorner: {
    position: 'absolute',
    top: 15,
    left: 30,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeftCorner: {
    position: 'absolute',
    left: 30,
    bottom: 15,
  },
  smallThumbnail: {
    width: 60, 
    height: 60
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff99',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 15,
  },
  captureIcon: {
    width: 40, 
    height: 40
  },
  reportIcon: { // New Style
    width: 30, 
    height: 30,
    marginRight: 15,
  },
  reportButton: {
    position: 'absolute',
    top: 50, // you can adjust this as needed
    right: 10, // you can adjust this as needed
  },
});

export default camerastyles;
