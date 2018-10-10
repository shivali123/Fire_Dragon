
import React, {Component} from 'react';
import {Platform, StyleSheet,ListView, Text, View,AsyncStorage} from 'react-native';
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
import {StackNavigator} from 'react-navigation';
import Task from './app/containers/task';
import Login from './app/containers/login';
import Loginpage from './app/containers/loginpage';
import Taskdetails from './app/containers/taskDetails';
import Todo from './app/containers/todo';
import Toget from './app/containers/toget';
import Details from './app/containers/detail';
import Main from './app/containers/main';
// import StackedAreaExample from './app/containers/chart';
export const TaskStack = StackNavigator({
    Loginpage:{screen:Loginpage},
    Main:{screen:Main},
    Toget:{screen:Toget},
    Todo:{screen:Todo},
    Task:{screen: Task},
    Login:{screen:Login},
    Details:{screen:Details},
    Taskdetails:{screen:Taskdetails}
  },{
    title:'',
    headerMode:'float'
  })
  export const Loginstack = StackNavigator({
      Main:{screen:Main},
      Toget:{screen:Toget},
      Todo:{screen:Todo},
      Task:{screen: Task},
      Login:{screen:Login},
      Details:{screen:Details},
      Taskdetails:{screen:Taskdetails}
    },{
      title:'',
      headerMode:'float'
    })

export default class App extends Component<Props> {
 constructor (props){
        super(props)
          this.state = {
            login:false
          }
    }
 componentWillMount () {
   AsyncStorage.getItem('email',(err, result) => {
       if(result != undefined){
         this.setState({login :true,email:result})
       }
   })
 }
  render() {
    return (
      <View style={styles.container}>
        {(this.state.login == true) &&
          <Loginstack />
        }
        {(this.state.login == false) &&
          <TaskStack />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
