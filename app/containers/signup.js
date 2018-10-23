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
import { url } from '../../style/base';
import AnimateLoadingButton from 'react-native-animate-loading-button';
const loginwidth = Dimensions.get('window').width * 0.3;
const loginheight = Dimensions.get('window').height * 0.1;
import styles from '../../style/containers/signup';
import firebase from 'react-native-firebase';

export default class Signup extends Component<Props> {
  static navigationOptions = {
      headerTitle:"FIRE DRAGON",
      headerStyle: {backgroundColor: '#000000'
       },
      headerTintColor: 'white'}
  constructor (props){
        super(props)
          this.state = {
            email:'',
            password:'',
            login:false,
            text: '',
            name: '',
            password: '',
            city: '',
            number: '',
            description: ''
          }
        }
  componentWillMount(){
    
  }

 _onPressHandler() {
     if(this.state.email == '' || this.state.password == '' ||
       this.state.name == '' || this.state.description == '' ||
       this.state.city == '' || this.state.number == '') {
       ToastAndroid.showWithGravity('See all credentials !', ToastAndroid.SHORT,ToastAndroid.CENTER);
       return
     }
     let obj = {}
     firebase.messaging().getToken()
     .then(fcmToken=>{
       if(fcmToken){
         obj = {
           "name": this.state.name,
           "description": this.state.description,
           "email": this.state.email,
           "password": this.state.password,
           "city": this.state.city,
           "number": this.state.number,
           "devicetoken" : fcmToken
         }
         // alert(JSON.stringify(obj))
         // return
         this.loadingButton.showLoading(true);
         var basepath = url.staging + 'profile'

         fetch(basepath, {
           timeout:60000,
           method: "POST",
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(obj)
         })
         .then(response => response.json())
         .then(response => {

             ToastAndroid.showWithGravity('Successfully logged in!', ToastAndroid.SHORT,ToastAndroid.CENTER);
             this.props.navigation.navigate('Main',{token:response.devicetoken })
             this.loadingButton.showLoading(false);

         })
         .catch((error) => {
             this.loadingButton.showLoading(false);
             // ToastAndroid.showWithGravity('Incorrect password or username !', ToastAndroid.SHORT,ToastAndroid.CENTER);

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
                              onChangeText={(text) => this.setState({password:text})}
                              placeholderTextColor={'grey'}
                              />
              <TextInput
                              style={[styles.input]}
                              autoFocus={false}
                              returnKeyType='done'
                              autoCapitalize='none'
                              underlineColorAndroid='transparent'
                              placeholder="name"
                              value={this.state.name}
                              onChangeText={(text) => this.setState({name:text})}
                              placeholderTextColor={'grey'}
                              />
              <TextInput
                              style={[styles.input]}
                              autoFocus={false}
                              returnKeyType='done'
                              underlineColorAndroid='transparent'
                              placeholder="description"
                              autoCapitalize='none'
                              value={this.state.description}
                              onChangeText={(text) => this.setState({description:text})}
                              placeholderTextColor={'grey'}
                              />
              <TextInput
                              style={[styles.input]}
                              autoFocus={false}
                              returnKeyType='done'
                              underlineColorAndroid='transparent'
                              placeholder="number"
                              autoCapitalize='none'
                              value={this.state.number}
                              onChangeText={(text) => this.setState({number:text})}
                              placeholderTextColor={'grey'}
                              />
              <TextInput
                              style={[styles.input]}
                              autoFocus={false}
                              returnKeyType='done'
                              underlineColorAndroid='transparent'
                              placeholder="city"
                              autoCapitalize='none'
                              value={this.state.city}
                              onChangeText={(text) => this.setState({city:text})}
                              placeholderTextColor={'grey'}
                              />
            </View>
            <View style={{flex:0.3,marginRight:30}}>
            <AnimateLoadingButton
              ref={c => (this.loadingButton = c)}
              width={loginwidth}
              height={loginheight}
              title="SIGN-UP"
              titleFontSize={20}
              titleColor="rgb(255,255,255)"
              backgroundColor="#F0001E"
              borderRadius={4}
              onPress={this._onPressHandler.bind(this)}
            />
            </View>
        </View>
        <View style={styles.icon}>
          <Image source={require('../images/dragon_c.png')} style={{width:'49%',height:'46%'}} />
        </View>
        <Text style={{color:'#fff'}}>{this.state.text}</Text>
    </ImageBackground>
    );
  }
}
