import React, { Component } from 'react';
import { Image, View,Text } from 'react-native';
import * as Progress from 'react-native-progress';
import {StyleSheet} from 'react-native';

export default class ProgressTiming extends Component {

  constructor(props) {
      super(props);
      this.state = {timingState : 1};
  }

  componentDidMount() {
    let d  = new Date(this.props.time.toget)
    let now = new Date();
    if(d>now){
        this.timer = setInterval(() => {
          let cel = this.returntime()
          this.setState({timingState :cel})
        },1000);
    }
    else{
      this.setState({timingState:1})
    }
  }

  returntime =()=>{
    let d  = new Date(this.props.time.toget)
    let now = new Date();
    if(d > now){
        ms = d - now
        var seconds = ms / 1000;
        var hours = parseInt( seconds / 3600 );
        var minutes = parseInt( seconds / 60 );
        let dur = parseInt(this.props.time.duration * 60)
        let per =  ((dur - minutes ) / dur ) * 100
        return ((100-per)/100)
      }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <View style={{flexDirection:'row',margin:10}}>
        <View style={styles.circles}>

              <Progress.Pie color={'#FF0000'} progress={this.state.timingState} size={50} />
              <Text style={{color:'#FF0000',margin:5}}> {(this.state.timingState * 100).toString().substring(0,6)}%</Text>
        </View>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },
});
ProgressTiming.defaultProps = {
  backgroundImage: './img/clockBack.png',
};
