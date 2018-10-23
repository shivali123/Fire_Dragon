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
    position:'absolute'
  },
  icon:{
    justifyContent:'center',
    alignItems:'center',
  },
  input:{
    backgroundColor:'white',
    color:'#F0001E',
    width:'70%',
    height:'10%',
    marginBottom:5,
    borderRadius:3,
  },
  inputview :{
    justifyContent:'center',
    alignItems:'center',
    top:'30%',
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
  }
});
  module.exports = styles;
