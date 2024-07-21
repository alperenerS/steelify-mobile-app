import { StyleSheet } from 'react-native';

const loginstyles = StyleSheet.create({
  logo: {
    height: 150, // Daha büyük bir boyut ayarladık
    width: 300, // Daha büyük bir boyut ayarladık
    marginBottom: 40,
    resizeMode: 'contain', // Resmin tam olarak görünmesini sağladık
  },
  container: {
    flex: 5,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0
  },
  loginText: {
    color: "black",
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#FF6F00", // Rengi güncelledik
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 75,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default loginstyles;
