import { StyleSheet } from 'react-native';

const profilestyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    fontSize: 20,
    flex: 1,
  },
  loadingText: {
    alignSelf: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#0f4570',
    padding: 10,
    borderRadius: 5,
  },
  profileIconContainer: {
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: '#0f4570',
    width: 150,
    height: 150,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileIconText: {
    color: 'white',
    fontSize: 24,
  },
});

export default profilestyles;
