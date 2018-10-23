
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
var PushNotification = require('react-native-push-notification');
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen} from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import Signup from './app/containers/signup';

export const TaskStack = StackNavigator({
  Loginpage:{screen:Loginpage},
  Signup:{screen:Signup},
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
async componentDidMount() {
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const action = notificationOpen.action;
        const notification: Notification = notificationOpen.notification;
        var seen = [];
        alert(JSON.stringify(notification.data, function(key, val) {
            if (val != null && typeof val == "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }));
    }
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');

// Create the channel
    firebase.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        // Process your notification as required
        notification
            .android.setChannelId('test-channel')
            .android.setSmallIcon('ic_launcher');
        firebase.notifications()
            .displayNotification(notification);

    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        var seen = [];
        alert(JSON.stringify(notification.data, function(key, val) {
            if (val != null && typeof val == "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }));
        firebase.notifications().removeDeliveredNotification(notification.notificationId);

    });
}

componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
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
//
//implementation 'com.google.firebase:firebase-core:16.0.1'
// compile fileTree(dir: "libs", include: ["*.jar"])
// compile "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
// compile "com.facebook.react:react-native:+"  // From node_modules
// compile project(':react-native-firebase')
// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
// import firebase from 'react-native-firebase';
// import type { Notification, NotificationOpen } from 'react-native-firebase';
// import DeviceInfo from 'react-native-device-info';
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//////
// var obj;
// export default class App extends Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//         text:''
//       };
//    }
//     componentWillMount(){
//       firebase.messaging().getToken()
//       .then(fcmToken=>{
//         if(fcmToken){
//             this.setState({text:fcmToken})
//             // alert(fcmToken)
//         }
//         else{
//
//         }
//       })
//
//     }
//     async componentDidMount() {
//         const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
//         if (notificationOpen) {
//             const action = notificationOpen.action;
//             const notification: Notification = notificationOpen.notification;
//             var seen = [];
//             alert(JSON.stringify(notification.data, function(key, val) {
//                 if (val != null && typeof val == "object") {
//                     if (seen.indexOf(val) >= 0) {
//                         return;
//                     }
//                     seen.push(val);
//                 }
//                 return val;
//             }));
//         }
//         const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
//                 .setDescription('My apps test channel');
//
// // Create the channel
//         firebase.notifications().android.createChannel(channel);
//         this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
//             // Process your notification as required
//             // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//         });
//         this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
//             // Process your notification as required
//             notification
//                 .android.setChannelId('test-channel')
//                 .android.setSmallIcon('ic_launcher');
//             firebase.notifications()
//                 .displayNotification(notification);
//
//         });
//         this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
//             // Get the action triggered by the notification being opened
//             const action = notificationOpen.action;
//             // Get information about the notification that was opened
//             const notification: Notification = notificationOpen.notification;
//             var seen = [];
//             alert(JSON.stringify(notification.data, function(key, val) {
//                 if (val != null && typeof val == "object") {
//                     if (seen.indexOf(val) >= 0) {
//                         return;
//                     }
//                     seen.push(val);
//                 }
//                 return val;
//             }));
//             firebase.notifications().removeDeliveredNotification(notification.notificationId);
//
//         });
//     }
//
//     componentWillUnmount() {
//         this.notificationDisplayedListener();
//         this.notificationListener();
//         this.notificationOpenedListener();
//     }
//
// render() {
//   obj=this;
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//         <Text>{DeviceInfo.getDeviceId()}</Text>
//         <Text selectable={true}>{obj.state.text}</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
