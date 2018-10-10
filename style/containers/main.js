import { StyleSheet } from 'react-native';
const Dimensions = require('Dimensions');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    // alignItems: 'center'
  },
  todo: {
    backgroundColor:'#111222',
    margin:10,
    width: Dimensions.get('window').width - 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:6
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
  module.exports = styles;
