import {
  StyleSheet
} from 'react-native';
const Dimensions = require('Dimensions');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position:'absolute',
    paddingBottom:100
    // padding:20
  },
  icon:{
    justifyContent:'center',
    alignItems:'center',
  },
  input:{
    backgroundColor:'white',
    color:'#F0001E',
    width:'70%',
    height:'16%',
    marginBottom:5,
    borderRadius:3,
  },
  inputview :{
    justifyContent:'center',
    alignItems:'center',
    top:'16%',
    flexDirection:'row'
  },
  textinputview: {
    flex:0.7,
    justifyContent:'center',
    alignItems:'center'
  },
  login:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F0001E',
    width:60,
    height:60,
    borderRadius:30
  },
  text:{
    color:'#FF0000',
    fontSize:12,
    fontWeight:'bold',
    margin:10
  },
  done: {
    backgroundColor:'#212121',
    margin:5,
    width:Dimensions.get('window').width/2.7,
    textAlign:'center',
    color:'#FF0000',
    fontWeight:'bold',
    padding:6
  },
  grid: {
    width:Dimensions.get('window').width/2 - 10,
    height:Dimensions.get('window').width/1.2,
    backgroundColor:'#121212',
    padding:10,
    borderRadius:6,
    margin:3,
    borderWidth:3,
    borderColor:'#FF0011'
  }
});
  module.exports = styles;
