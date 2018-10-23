import React, {Component} from 'react';
import {
  TextInput,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ToastAndroid
} from 'react-native';
const Dimensions = require('Dimensions');
import styles from '../../style/containers/todo';
const data =[]
import { url } from '../../style/base';
import GridView from "react-native-easy-grid-view";
var ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import CountDown from 'react-native-countdown-component';
import Pie from 'react-native-pie'
import Timer from '../components/timer';
import * as Progress from 'react-native-progress';
import ProgressTiming from '../components/progresstiming';
import LinearGradient from 'react-native-linear-gradient';
var obj;
export default class Toget extends Component<Props> {
  static navigationOptions = {
      headerTitle:"To-get",
      headerStyle: {backgroundColor: '#000000'
       },
      headerTintColor: 'white'}
  constructor (props){
        super(props)
        this.state = {
            dataSource: ds.cloneWithCells(data,2),
            cellWidth: 0,
            cellHeight: 0,
            copyData:[]
          }
        }
   componentDidMount (){
     AsyncStorage.getItem('email',(err, result) => {
         if(result != undefined){
           this.setState({email :result})
           var basepath = url.staging + 'task/'+result
           fetch(basepath, {
             timeout:60000,
             method: "GET",
           })
           .then(response => response.json())
           .then(response => {
               let d = []
               for(i=0;i<response.length;i++){
                 let data = {
                   res:response[i]
                 }
                 d.push(data)
               }
               this.setState({dataSource: ds.cloneWithCells(d,2),copyData:d})
              })
           .catch((error) => {
               alert(error)
             })
          }})

   }
   confirmTime =(data)=>{
     var date = data
     var localDate = new Date(date);
     let time =localDate.getFullYear() + '-' + localDate.getMonth() + '-' + localDate.getDate() + ',' + localDate.getHours() + '-' + localDate.getMinutes() + '-' + localDate.getSeconds();
     return time
   }
   returnTime =(data)=>{
     var date = data
     var localDate = new Date(date)
     var currentDate = new Date();
     var timeDiff = Math.abs(localDate.getTime() - currentDate.getTime());
     var diffDays = Math.ceil(timeDiff / (1000 * 60 ));
     if(localDate>currentDate){
       return 'Task is running!'
     }
     if(localDate<currentDate){
       return 'Task is over'
     }
     if(localDate == currentDate){
       return 'Todays todo.'
     }
     return diffDays.toString()
   }
   returnSeconds = (data,info)=>{
     var localDate = new Date(info)
     var currentDate = new Date();
     var timeDiff = Math.abs(localDate.getTime() - currentDate.getTime());
     var diffDays = Math.ceil(timeDiff / (1000));
     return diffDays
   }
   getcurrent =(time)=>{
     let d  = new Date(time.sendingTime)
     let now = new Date();
     if(d > now){
         ms = d - now
         var seconds = ms / 1000;
         var hours = parseInt( seconds / 3600 );
         var minutes = parseInt( seconds / 60 );
         let dur = parseInt(time.duration * 60)
         let per =  ((dur - minutes ) / dur ) * 100
         return ((100-per)/100)
       }
   }

  _renderCell(cell) {
          return <View>
              <LinearGradient colors={['#191919', '#1A1A1A', '#1B1B1B','#1C1C1C','#1D1D1D','#201F22','#29282B','#282828','#272629','#252527','#222222','#202020']}
              style={styles.grid}>
              <TouchableOpacity onPress={()=> obj.props.navigation.navigate('Details' ,{task:cell})}>
                  <Text style={styles.text}>{cell.res.task}</Text>
                  <Text style={styles.text}>{this.confirmTime(cell.res.sendingTime)}</Text>
                  <Text style={styles.text}>{cell.res.duration}-hour</Text>
                  {(this.returnTime(cell.res.sendingTime) !== 'Task is over') &&
                  <View>
                    <CountDown
                      until={this.returnSeconds(cell.res.duration,cell.res.toget)}
                      onFinish={() => alert('finished')}
                      size={10}
                      />
                  <ProgressTiming time={cell.res} />
                  </View>
                  }
                  {(cell.res.status == 1) &&
                  <View>
                    <Text style={styles.text}> Done in {((cell.res.duration * 60)-(cell.res.captured/60)).toString().substring(0,5)} minutes </Text>
                  </View>
                  }
                  </TouchableOpacity>
              </LinearGradient>
          </View>
      }
  render() {
    obj=this;
    return (
      <ImageBackground
          source={require('../images/background.jpg')}
          style={styles.container}>
          {(this.state.copyData.length>0) &&
          <GridView dataSource={this.state.dataSource}
                      spacing={6}
                      style={{flex:1,marginTop:60,marginBottom:60}}
                      enableEmptySections={true}
                      renderCell={this._renderCell.bind(this)}

            />
          }
    </ImageBackground>
    );
  }
}
