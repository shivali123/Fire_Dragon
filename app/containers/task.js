
import React, {Component} from 'react';
import {Platform,Image,ScrollView,AsyncStorage, TextInput,StyleSheet,ListView, Text, View,TouchableOpacity} from 'react-native';
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
import LinearGradient from 'react-native-linear-gradient';
const color = ['#4D4C6D','#A0E400','#615F60','#FF563A','#00C0B6','#FB59337','#313136','#E6C200','#AF00AD','#2F69B3','#32353E']
import { FloatingAction } from 'react-native-floating-action';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
var obj;
import { url } from '../../style/base';
import CountDown from 'react-native-countdown-component';
import Pie from 'react-native-pie'
import Timer from '../components/timer';
import * as Progress from 'react-native-progress';
import ProgressTiming from '../components/progresstiming';

const actions = [{
    text: 'Create Task',
    icon: require('../images/floating.png'),
    name: 'bt_accessibility',
    position: 2
  }]

export default class Task extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
      headerTitle:"Fire dragon",
      headerStyle: {backgroundColor: '#39373c',height:30},
      headerTintColor: 'white',
      headerRight: <TouchableOpacity onPress={()=>obj.login()}>
                        <Image source={require('../images/menu.png')} style={{height:15,width:20,margin:3}}/>
                  </TouchableOpacity>
    })
  constructor (props){
        super(props)
          this.state = {
            dataSource      :ds.cloneWithRows([]),
            tasks      :ds.cloneWithRows([]),
            isModalVisible  :false,
            members         :[],
            task            :'',
            list            :0,
            email:'',
            copyData:[],
            val:[1,1,1,1],
            message:'',
            showState:0,
            secondState:0
        }
    }
  componentWillMount(){

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
                  res:response[i],

                }
                d.push(data)
              }
              this.setState({dataSource:ds.cloneWithRows(d),copyData:d})
          })
          .catch((error) => {
              alert(error)
            })
          var basepath = url.staging + 'task/complete/'+ this.state.email
            fetch(basepath, {
              timeout:60000,
              method: "GET",
            })
            .then(response => response.json())
            .then(response => {
              let d = []
              for(i=0;i<response.length;i++){
                let data = {
                  res:response[i],

                }
                d.push(data)
              }
                this.setState({tasks:ds.cloneWithRows(d)})

            })
            .catch((error) => {
                alert(error)
            })
        }
      })

   var basepath = url.staging + 'members'
   fetch(basepath, {
     timeout:60000,
     method: "GET",
    })
    .then(response => response.json())
    .then(response => {
      let copyEmail = []
      for(i=0;i<response.length;i++){
        if(response[i].email != null){
          let local = {
            value : response[i].email
          }
          copyEmail.push(local)
           }
        }
        this.setState({members:copyEmail})
      })
    .catch((error) => {
        alert(error)
      })
   }
   login =()=>{
     this.props.navigation.navigate('Login')
   }
  setColor =()=>{
    let i = Math.floor(Math.random() * 9) + 0
    return color[i];
  }
  createTask = () => {
    let priority = [{
      value: 'URGENT',
    }, {
      value: 'HIGH',
    },{
      value : 'LOW'
    }];
    let duration = [{
      value: 1,
    }, {
      value: 2,
    },{
      value : 3
    }];
    // alert(this.state.members)
    return(
      <ScrollView>
        <View style={{margin:5}}>
          <Dropdown
                ref="receiver"
                label='RECEIVER'
                data={this.state.members}
                itemPadding={5}
                baseColor={'white'}
                itemTextStyle={{color:'white'}}
                />
        </View>
        <View style={{margin:5}}>
          <Dropdown
                ref="duration"
                label='DURATION'
                data={duration}
                itemPadding={5}
                baseColor={'white'}
                />
        </View>
        <View style={{margin:5}}>
          <Dropdown
                ref="priority"
                label='PRIORITY'
                data={priority}
                itemPadding={5}
                baseColor={'white'}
                />
        </View>
        <View style={{margin:5}}>
        <TextInput
                        style={[styles.input]}
                        autoFocus={false}
                        returnKeyType='search'
                        underlineColorAndroid='transparent'
                        placeholder="task"
                        value={this.state.task}
                        onChangeText={(text) => this.setState({task:text})}
                        placeholderTextColor={'rgb(173,176,177)'}
                        />
          <TextInput
                          style={[styles.input]}
                          autoFocus={false}
                          returnKeyType='search'
                          underlineColorAndroid='transparent'
                          placeholder="task"
                          value={this.state.message}
                          onChangeText={(text) => this.setState({message:text})}
                          placeholderTextColor={'rgb(173,176,177)'}
                          />
        </View>

      </ScrollView>
    )
  }
  assignTask =()=>{
    this.setState({isModalVisible:false})
    // alert(JSON.stringify(this.refs.receiver.selectedItem()))
    let data  = {
      'receiver' : this.refs.receiver.selectedItem().value,
      'duration' : this.refs.duration.selectedItem().value,
      'priority' : this.refs.priority.selectedItem().value,
      'sender'   : this.state.email,
      'sendingTime' :'task',
      'task'        : this.state.task,
      'message'     :this.state.message
     }
     // alert(JSON.stringify(data))
     var basepath = url.staging + 'task'
       fetch(basepath, {
       timeout:60000,
       method : "POST",
       headers: {'Content-Type': 'application/json'},
       body   : JSON.stringify(data)
       })
      .then(response => response.json())
      .then(response => {
        alert(JSON.stringify(response))
          })
    .catch((error) => {
        alert(error)
      })
  }
  confirmTime =(data)=>{
    var date = data
    var localDate = new Date(date);
    let time = localDate.getFullYear() + '-' + localDate.getMonth() + '-' + localDate.getDate() + ',' + localDate.getHours() + '-' + localDate.getMinutes() + '-' + localDate.getSeconds();
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
  progress= (data)=>{
    // alert(JSON.stringify(this.state.copyData[3].res.duration * 60))
    // return
    var date = data.sendingTime
    var tocomplete = data.duration * 60
    var localDate = new Date(date)
    var currentDate = new Date()
    var timeDiff = Math.abs(localDate.getTime() - currentDate.getTime());
    var diffDays = Math.floor(timeDiff/60000)
    return Math.ceil((diffDays/tocomplete) * 100)
  }
  setTimer =(id,data)=>{
    let copy = this.state.copyData
    for(i=0;i<copy.length;i++){
      if(i==id){
        copy[i].showUp = !copy[i].showUp
      }
    }
    this.setState({dataSource:ds.cloneWithRows(copy),copyData:copy})
  }
  returnSeconds = (data,info)=>{
    // if (data == '1-hour'){
    //   return 60*60
    // }
    // if (data == '2-hour'){
    //   return 120*60
    // }
    // if (data == '3-hour'){
    //   return 180*60
    // }
    var localDate = new Date(info)
    var currentDate = new Date();
    var timeDiff = Math.abs(localDate.getTime() - currentDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000));
    return diffDays
  }
  returnColor =()=>{
    if(this.state.secondState == 1){
      return 'green'
    }
    if(this.state.showState == 1){
      return 'green'
    }
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
  completeTask =(task)=>{
    let t = this.getcurrent(task.res)
    let d = this.returnSeconds(task.res.duration,task.res.sendingTime)
    let data  = {
      'receiver' : task.res.receiver,
      'duration' : task.res.duration,
      'priority' : task.res.priority,
      'sender'   : task.res.sender,
      'sendingTime' :task.res.sendingTime,
      'task'        : task.res.task,
      'message'     :task.res.message,
      'status'      :1,
      'progress'    :t,
      'captured'    :d
     }
     // alert(JSON.stringify(data))
     var basepath = url.staging + 'task/'+task.res._id
       fetch(basepath, {
       timeout:60000,
       method : "PUT",
       headers: {'Content-Type': 'application/json'},
       body   : JSON.stringify(data)
       })
      .then(response => response.json())
      .then(response => {
        alert(JSON.stringify(response))
          })
    .catch((error) => {
        alert(error)
      })
  }

  render() {
    obj = this;
    const val = [10,20,30,40]
    return (
      <LinearGradient colors={['#1C1C1C', '#272727', '#2A2A2A','#252525','#1F1F1F']}
      style={styles.container}>
      <View style={{flex:0.1,margin:10,flexDirection:'row'}} >
        <TouchableOpacity onPress={()=> this.setState({list:0})}
          style={{justifyContent:'center',alignItems:'center',margin:2,flex:0.5,backgroundColor:'green',borderRadius:5}}>
          <Text style={{color:'white'}}> To-do</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.setState({list:1})}
          style={{justifyContent:'center',alignItems:'center',margin:2,flex:0.5,backgroundColor:'red',borderRadius:5}}>
          <Text style={{color:'white'}}> To-get</Text>
        </TouchableOpacity>

      </View>
      {(this.state.list == 1)&&
        <ListView
              dataSource={this.state.dataSource}
              enableEmptySections={true}
              renderRow={(rowData, sectionID, rowID, higlightRow) =>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Taskdetails' ,{task:rowData})}
                      style={{margin:10,backgroundColor:this.setColor(),borderRadius:10,borderWidth:0,flexDirection:'row',alignItems:'center'}}>
                  <View style={{flexDirection:'column'}}>
                      <Text style={{margin:10,color:'white'}}> {rowData.res.task}</Text>
                      <Text style={{margin:10,color:'white'}}> {this.confirmTime(rowData.res.sendingTime)}</Text>
                      <Text style={{margin:10,color:'white'}}> {rowData.res.duration}-hour</Text>
                  </View>
                  <View style={{backgroundColor:'white',width:2,height:'100%',selfAlign:'center'}} />
                  <View style={{margin:10}}>
                    {(rowData.res.status == 0) &&
                    <CountDown
                      until={this.returnSeconds(rowData.res.duration,rowData.res.sendingTime)}
                      onFinish={() => alert('finished')}
                      size={10}
                      />
                    }
                    {(rowData.res.status == 1) &&
                    <Text> Done in {(rowData.res.duration * 60)-(rowData.res.captured/60)} </Text>
                    }
                    <ProgressTiming time={rowData.res} />
                     <Text style={{color:'white',margin:10}}>{this.returnTime(rowData.res.sendingTime)}</Text>
                   </View>
                </TouchableOpacity>
              }>
        </ListView>
        }

        {(this.state.list ==0) &&
          <ListView
                      dataSource={this.state.tasks}
                      enableEmptySections={true}
                      renderRow={(rowData, sectionID, rowID, higlightRow) =>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Taskdetails' ,{task:rowData})}
                        style={{margin:10,backgroundColor:this.setColor(),borderRadius:10,borderWidth:0,flexDirection:'row',alignItems:'center',borderColor:'white',borderWidth:1}}>
                        <View style={{flexDirection:'column'}}>

                          <Text style={{margin:10,color:'white'}}> {rowData.res.task}</Text>
                          <Text style={{margin:10,color:'white'}}> {this.confirmTime(rowData.res.sendingTime)}</Text>
                          <Text style={{margin:10,color:'white'}}> {rowData.res.duration}-hour</Text>
                          </View>
                          <View style={{backgroundColor:'white',width:2,height:'100%',selfAlign:'center'}} />

                          <View style={{margin:10}}>
                          {(this.returnTime(rowData.res.sendingTime) !== 'Task is over') &&
                          <CountDown
                            until={this.returnSeconds(rowData.res.duration,rowData.res.sendingTime)}
                            onFinish={() => alert('finished')}
                            size={10}
                            />
                          }
                          <Text onPress={()=>this.completeTask(rowData)}> Done </Text>

                          <Text style={{color:'white'}}>{this.returnTime(rowData.res.sendingTime)}</Text>
                          </View>
                        </TouchableOpacity>
                      }>
          </ListView>
        }

          <FloatingAction
                  actions={actions}
                  onPressItem={
                    () => {
                      this.setState({isModalVisible:true})
                    }
                  }
                />
          <Modal isVisible={this.state.isModalVisible}>
                  <View style={{ flex:0.6,backgroundColor:'#313136' }}>
                  <View style={{flex:0.1,flexDirection:'row'}}>
                      <TouchableOpacity
                      onPress={()=>this.setState({isModalVisible:false})}
                      style={{flex:0.5,backgroundColor:'#FF563A',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontWeight:'bold'}}>CLOSE</Text>

                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>this.assignTask()}
                      style={{flex:0.5,backgroundColor:'#2F69B3',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontWeight:'bold'}}>DONE</Text>

                      </TouchableOpacity>
                  </View>
                    {this.createTask()}
                  </View>
                </Modal>
      </LinearGradient>
    );
   }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text:{
    color:'white',
    margin:5,

  },
  input:{
    backgroundColor:'white',
    color:'grey',
    margin:5
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
},
});
// <Text style={{color:'white',margin:10}}>{this.progress(rowData.res)}</Text>
