import { StyleSheet } from 'react-native';

const loginstyles = StyleSheet.create({
    logo:{
        height:110,
        width:225,
        marginBottom:40
      },
    container: {
        flex:5,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
      },
      
    loginText:{
        color:"white"
      },
    loginBtn:{
        width:"50%",
        backgroundColor:"#0f4570",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:75,

      },
      inputText:{
        height:50,
        color:"black"
      },
      inputView: {
        width: "80%",
        backgroundColor: "#ffffff",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        borderWidth: 1, // eklenen satır
        borderColor: '#D9D9D9', // eklenen satır
        shadowColor: '#000', // eklenen satır
        shadowOffset: { width: 0, height: 2 }, // eklenen satır
        shadowOpacity: 0.25, // eklenen satır
        shadowRadius: 3.84, // eklenen satır
        elevation: 5, // eklenen satır
      },
      
  });

  export default loginstyles;