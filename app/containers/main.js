
import React, {Component} from 'react';
import {Platform, StyleSheet,ScrollView,TextInput,TouchableOpacity,ImageBackground, Text, View,AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import styles from '../../style/containers/main';
import { FloatingAction } from 'react-native-floating-action';
import Modal from "react-native-modal";
import BarChart from './Barchart';
import { Dropdown } from 'react-native-material-dropdown';
const actions = [{
    text: 'Create Task',
    icon: require('../images/floating.png'),
    name: 'bt_accessibility',
    position: 2
  }]

  const colors = {
    chartBlue:'#4286F5',
    chartRed:'#DC4437',
    chartYellow:'#F5B400'
  }

export default class Main extends Component<Props> {
  static navigationOptions = {
      header:null
    }
  constructor (props){
          super(props)
            this.state = {
              isModalVisible  :false,
              members:[],
              email:'',
              task:'',
              message:'',
              chart :  {
                      values: [
                        [3,10, 20, 30, 40]
                      ],
                      colors: {
                        labelsColor : ['#4286F5', '#DC4437', '#F5B400'],
                        axisColor : 'rgba(216, 216, 216, 1)',
                      },
                      labels: [],
                      selected: 2,
                       axis: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN'],
                    },
               count: 3,
          }
    this.selectChart = this.selectChart.bind(this);
    }
  componentDidMount () {
    AsyncStorage.getItem('email',(err, result) => {
        if(result != undefined){
          this.setState({email:result})
        }
      })
    var basepath = 'http://192.168.43.31:3000/members'
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
        'receiver': this.refs.receiver.selectedItem().value,
        'duration': this.refs.duration.selectedItem().value,
        'priority': this.refs.priority.selectedItem().value,
        'sender': this.state.email,
        'sendingTime': 'task',
        'task': this.state.task,
        'message': this.state.message,
        'status': 0
       }
       // alert(JSON.stringify(data))
       var basepath = 'http://192.168.43.31:3000/task'
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
  selectChart(index) {
    let chart = this.state.chart;
    chart["selected"] = index;
    this.setState({chart:chart});
  }
  removeSelected(){
    let chart = this.state.chart;
    chart["selected"] = null
    this.setState({chart:chart});
  }

  render() {
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

    return (
      <ImageBackground source={require('../images/background.jpg')}
      style={styles.container}>
      <BarChart selected={this.state.barSelected} onPressItem={this.selectChart} height={180} chart={this.state.chart} />

        <TouchableOpacity style={styles.todo} onPress={()=>this.props.navigation.navigate('Todo')}>
          <Text style={styles.title}> To-do </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.todo} onPress={()=>this.props.navigation.navigate('Toget')}>
          <Text style={styles.title}> To-get </Text>
        </TouchableOpacity>
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
      </ImageBackground>
    );
  }
}
