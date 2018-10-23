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
import AnimateLoadingButton from 'react-native-animate-loading-button';
const loginwidth = Dimensions.get('window').width * 0.3;
const loginheight = Dimensions.get('window').height * 0.1;
import styles from '../../style/containers/loginpage';
import firebase from 'react-native-firebase';
import { url } from '../../style/base';

export default class Loginpage extends Component<Props> {
  static navigationOptions = {
      headerTitle:"FIRE DRAGON",
      headerStyle: {backgroundColor: '#000000'},
      headerTintColor: 'white'
    }

  constructor (props){
        super(props)
          this.state = {
            email:'',
            verify:'',
            login:false,
            text: ''
          }
        }

 _onPressHandler() {
     if(this.state.email == '' || this.state.verify == '') {
       ToastAndroid.showWithGravity('See all credentials !', ToastAndroid.SHORT,ToastAndroid.CENTER);
       return
     }
     this.loadingButton.showLoading(true);
     var basepath =  url.staging+ 'login/'+this.state.email

     fetch(basepath, {
       timeout:60000,
       method: "GET",
     })
     .then(response => response.json())
     .then(response => {
         if(response[0].password == this.state.verify){
           this.updatedeviceToken(response)
           return
           // ToastAndroid.show('Successfully logged In !', ToastAndroid.SHORT);
           // this.loadingButton.showLoading(false);
           // AsyncStorage.setItem('email',response[0].email)
           // AsyncStorage.setItem('token',response[0].devicetoken)
           // this.props.navigation.navigate('Main')

         }
         else{
           ToastAndroid.showWithGravity('Incorrect password or username !', ToastAndroid.SHORT,ToastAndroid.CENTER);
           this.loadingButton.showLoading(false);

         }
     })
     .catch((error) => {
         this.loadingButton.showLoading(false);
         ToastAndroid.showWithGravity('Incorrect password or username !', ToastAndroid.SHORT,ToastAndroid.CENTER);

         // alert(error)
       })
   }
  updatedeviceToken = (response)=>{
    let obj = {}
    firebase.messaging().getToken()
    .then(fcmToken=>{
      if(fcmToken){
        obj = {
          "devicetoken": fcmToken,
          "email": response[0].email,
          "password":response[0].password
        }
        var basepath = url.staging + 'login/'+ response[0]._id
        fetch(basepath, {
          timeout:60000,
          method: "PUT",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(response => {
            ToastAndroid.show('Successfully logged In !', ToastAndroid.SHORT);
            this.loadingButton.showLoading(false);
            AsyncStorage.setItem('email',response.email)
            AsyncStorage.setItem('token',response.devicetoken)
            this.props.navigation.navigate('Main')
        })
        .catch((error) => {
            this.loadingButton.showLoading(false);
            alert(error)
          })
      }
      else{

      }
    })
  }

  render() {
    return (
      <ImageBackground
          source={require('../images/background.jpg')}
          style={styles.container}>
          <View style={styles.inputview}>
              <View style={styles.textinputview}>
              <TextInput
                              style={[styles.input]}
                              autoFocus={false}
                              returnKeyType='done'
                              autoCapitalize='none'
                              underlineColorAndroid='transparent'
                              placeholder="email"
                              value={this.state.email}
                              onChangeText={(text) => this.setState({email:text})}
                              placeholderTextColor={'grey'}
                              />
              <TextInput
                              style={[styles.input]}
                              autoFocus={false}
                              returnKeyType='done'
                              underlineColorAndroid='transparent'
                              placeholder="password"
                              autoCapitalize='none'
                              value={this.state.password}
                              secureTextEntry={true}
                              onChangeText={(text) => this.setState({verify:text})}
                              placeholderTextColor={'grey'}
                              />
            </View>
            <View style={{flex:0.3,marginRight:30}}>
            <AnimateLoadingButton
              ref={c => (this.loadingButton = c)}
              width={loginwidth}
              height={loginheight}
              title="LOGIN"
              titleFontSize={20}
              titleColor="rgb(255,255,255)"
              backgroundColor="#F0001E"
              borderRadius={4}
              onPress={this._onPressHandler.bind(this)}
            />
            <View style={{flex:0.3,margin:10}}>

            <AnimateLoadingButton
              width={loginwidth}
              height={loginheight}
              title="SIGN -UP"
              titleFontSize={20}
              titleColor="rgb(255,255,255)"
              backgroundColor="#F0001E"
              borderRadius={4}
              style={{margin: 10}}
              onPress={()=> this.props.navigation.navigate('Signup')}
            />
             </View>
            </View>
        </View>
        <View style={styles.icon}>
          <Image source={require('../images/dragon_c.png')} style={{width:'49%',height:'46%'}} />
        </View>
    </ImageBackground>
    );
  }
}
