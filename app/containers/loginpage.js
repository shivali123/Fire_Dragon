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

export default class Loginpage extends Component<Props> {
  static navigationOptions = {
      headerTitle:"FIRE DRAGON",
      headerStyle: {backgroundColor: '#000000'
       },
      headerTintColor: 'white'}
  constructor (props){
        super(props)
          this.state = {
            email:'',
            verify:'',
            login:false
          }
        }
  componentWillMount(){
    // AsyncStorage.getItem('email',(err, result) => {
    //     if(result != undefined){
    //       this.setState({login :true,email:result})
    //     }
    //   })
  }

 _onPressHandler() {
     if(this.state.email == '' || this.state.verify == '') {
       ToastAndroid.showWithGravity('See all credentials !', ToastAndroid.SHORT,ToastAndroid.CENTER);
       return
     }
     this.loadingButton.showLoading(true);
     var basepath = 'http://192.168.1.63:3000/login/'+this.state.email

     fetch(basepath, {
       timeout:60000,
       method: "GET",
     })
     .then(response => response.json())
     .then(response => {

         if(response[0].password == this.state.verify){
           ToastAndroid.show('Successfully logged In !', ToastAndroid.SHORT);
           this.loadingButton.showLoading(false);
           AsyncStorage.setItem('email',response[0].email)
           this.props.navigation.navigate('Main')

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
            </View>
        </View>
        <View style={styles.icon}>
          <Image source={require('../images/dragon_c.png')} style={{width:'49%',height:'46%'}} />
        </View>
    </ImageBackground>
    );
  }
}
