import React, { Component } from 'react';
import { Image, View,Text } from 'react-native';

export default class Timer extends Component {

  constructor(props) {
      super(props);
      this.state = {
        val:[10,20,30,40]
      };
   }
   componentDidMount() {
       this.timer = setInterval(() => {
         let arr = this.state.val;
         // let arr = new Date(); 
         arr.forEach(function(element) {
           element = element + 1;
         });
         this.setState({val:arr})
     }, 1000);
   }
   componentWillUnmount() {
     clearInterval(this.timer);
   }

   render() {
     return (
       <View>
       <Text> {this.state.val} </Text>
       </View>
     );
   }
 }
