import React, {Component} from 'react';
import {Platform,TextInput,AsyncStorage, StyleSheet,ListView, Text, View,TouchableOpacity} from 'react-native';
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
import AnalogClock from '../components/AnalogClock';
import Pie from 'react-native-pie';

export default class Details extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
      headerTitle:"Task",
      headerStyle: {backgroundColor: '#39373c'},
      headerTintColor: 'white',
    })
  constructor (props){
        super(props)
          this.state = {
            email:'',
            verify:'',
            login:false,
            left:0
          }
    }
  componentWillMount(){
    var localDate = new Date(this.props.navigation.state.params.task.res.sendingTime)
    var currentDate = new Date();
    var timeDiff = Math.abs(localDate.getTime() - currentDate.getTime());
    let diffSec = (this.props.navigation.state.params.task.res.duration * 3600) - ((this.props.navigation.state.params.task.res.duration * 3600) - (timeDiff/1000))
    var per = Math.abs(diffSec/(this.props.navigation.state.params.task.res.duration * 3600)) * 100
    this.setState({left:per})
  }

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row',flex:0.2,backgroundColor:'red'}}>
          <Text style={styles.text}> {this.props.navigation.state.params.task.res.sender}</Text>
        </View>
        <View style={{margin:20,justifyContent:'center',alignItems:'center'}}>
          <AnalogClock
            time={new Date()}
            minuteHandLength={30}
          />
          <Text style={styles.text}>{this.props.navigation.state.params.task.res.message} </Text>
          <Pie
               radius={30}
               series={[20,20,30,40]}
               colors={['lime', 'red', 'blue', 'yellow']} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    // justifyContent:'center',
    // alignItems:'center'
  },
  input:{
    backgroundColor:'grey',
    color:'white',
    margin:10,
    borderRadius:10,
  },
  text:{
    color:'white',
    fontSize:12,
    fontWeight:'bold',
    margin:10  }
});
