

import React, {Component} from 'react';
import {Platform,TextInput,AsyncStorage, StyleSheet,ListView, Text, View,TouchableOpacity} from 'react-native';
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
var obj;
import { url } from '../../style/base';

export default class Login extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
      headerTitle:"LOGIN",
      headerStyle: {backgroundColor: '#39373c'},
      headerTintColor: 'white'
    })
  constructor (props){
        super(props)
          this.state = {
            email:'',
            verify:'',
            login:false
          }
        }
  componentWillMount(){
    AsyncStorage.getItem('email',(err, result) => {
        if(result != undefined){
          this.setState({login :true,email:result})
        }
      })
  }
 login =(goBack)=>{
   // alert(this.state.email)
   if(this.state.email == '' || this.state.verify == '') {
     alert("Please enter all details")
     return
   }
   var basepath = url.staging + 'login/'+this.state.email

   fetch(basepath, {
     timeout:60000,
     method: "GET",
   })
   .then(response => response.json())
   .then(response => {
      
       if(response[0].password == this.state.verify){
         alert("login successfull")
         AsyncStorage.setItem('email',response[0].email)
         goBack()
       }
   })
   .catch((error) => {
       alert(error)
     })
 }
 logout =()=>{
   alert("login successfull")
   AsyncStorage.setItem('email','')
   // goBack()
 }
  render() {
    obj = this;
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
      {(this.state.login == false) &&
        <View style={{flex:1,justifyContent:'center'}}>
      <TextInput
                      style={[styles.input]}
                      autoFocus={false}
                      returnKeyType='search'
                      underlineColorAndroid='transparent'
                      placeholder="email"
                      value={this.state.email}
                      onChangeText={(text) => this.setState({email:text})}
                      placeholderTextColor={'rgb(173,176,177)'}
                      />
      <TextInput
                      style={[styles.input]}
                      autoFocus={false}
                      returnKeyType='search'
                      underlineColorAndroid='transparent'
                      placeholder="password"
                      value={this.state.password}
                      onChangeText={(text) => this.setState({verify:text})}
                      placeholderTextColor={'rgb(173,176,177)'}
                      />
    <TouchableOpacity
          onPress={()=>this.login(goBack)}
          style={{justifyContent:'center',alignItems:'center',backgroundColor:'red',
          margin:10,borderRadius:10,flex:0.1
        }}>
        <Text style={{color:'white',fontWeight:'bold'}}>LOGIN</Text>
    </TouchableOpacity>
    </View>
  }
  {(this.state.login == true) &&
    <Text style={{textAlign:'center'}}>{this.state.email}</Text>
  }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent:'center',
    // alignItems:'center'
  },
  input:{
    backgroundColor:'grey',
    color:'white',
    margin:10,
    borderRadius:10,
  }
});
