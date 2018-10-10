import React, { Component } from 'react';
import { Image, View } from 'react-native';

export default class AnalogClock extends Component {

  constructor(props) {
      super(props);

      let d = new Date();
      // let d = this.props.time;

      this.state = {
        time : this.props.time,
        sec: d.getSeconds() * 6,
        min: d.getMinutes() * 6 + (d.getSeconds() * 6) / 60,
        hour: ((d.getHours() % 12)/ 12) * 360 + 90 +
          (d.getMinutes() * 6 + (d.getSeconds() * 6) / 60) / 12,
      };
   }
  componentDidMount() {
      this.timer = setInterval(() => {

      // let d = this.updateTime();
      let d = new Date();

      this.setState({sec: d.getSeconds() * 6});
      this.setState({min: d.getMinutes() * 6 +
        (d.getSeconds() * 6) / 60});
      this.setState({hour: ((d.getHours() % 12)/ 12) * 360 + 90 +
        (d.getMinutes() * 6 + (d.getSeconds() * 6) / 60) / 12});
    }, 1000);
  }
    componentWillUnmount() {
      clearInterval(this.timer);
    }
  // updateTime = ()=>{
  //
  //   let data = this.state.time
  //   // if(data.getSeconds < 60){
  //   //    data.setSeconds(data.getSeconds() + 1)
  //   // }
  //   // if(data.getMinutes < 60 && data.getSeconds == 60){
  //   //   data.setMinutes(data.getMinutes() + 1)
  //   // }
  //   // if(data.getHours <= 24 && data.getMinutes == 60) {
  //   //   data.setHours(data.getHours() + 1)
  //   // }
  //   data.setSeconds(data.getSeconds() + 1)
  //   this.setState({time:data})
  //   return(data)
  // }


  clockFrame() {
    return {
      width: this.props.clockSize,
      height: this.props.clockSize,
      position: 'relative',
      borderColor: 'white',
      borderWidth: this.props.clockBorderWidth,
      borderRadius: this.props.clockSize/2
    }
  }

  clockHolder() {
    return {
      width: this.props.clockSize,
      height: this.props.clockSize,
      position: 'absolute',
      right: -this.props.clockBorderWidth,
      bottom: -this.props.clockBorderWidth
    }
  }

  clockFace() {
    return {
      width: this.props.clockCentreSize,
      height: this.props.clockCentreSize,
      backgroundColor: this.props.clockCentreColor,
      borderRadius: this.props.clockCentreSize / 2,
      top: (this.props.clockSize - this.props.clockCentreSize) / 2,
      left: (this.props.clockSize - this.props.clockCentreSize) / 2
    }
  }

  hourHandStyles() {
    return {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: this.props.hourHandColor,
      top: this.props.clockSize/2,
      left: this.props.clockSize/2,
      marginVertical: -this.props.hourHandWidth,
      marginLeft: -this.props.hourHandLength/2,
      paddingVertical: this.props.hourHandWidth,
      paddingLeft: this.props.hourHandLength,
      borderTopLeftRadius: this.props.hourHandCurved ?
                           this.props.hourHandWidth : 0,
      borderBottomLeftRadius: this.props.hourHandCurved ?
                              this.props.hourHandWidth : 0
    }
  }

  minuteHandStyles() {
    return {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: this.props.minuteHandColor,
      top: this.props.clockSize/2,
      left: this.props.clockSize/2,
      marginTop: -(this.props.minuteHandLength/2),
      marginHorizontal: -this.props.minuteHandWidth,
      paddingTop: this.props.minuteHandLength,
      paddingHorizontal: this.props.minuteHandWidth,
      borderTopLeftRadius: this.props.minuteHandCurved ?
                           this.props.minuteHandWidth : 0,
      borderTopRightRadius: this.props.minuteHandCurved ?
                            this.props.minuteHandWidth : 0
    }
  }

  secondHandStyles() {
    return {
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: 'white',
      top: this.props.clockSize/2,
      left: this.props.clockSize/2,
      marginTop: -(this.props.secondHandLength/2),
      marginHorizontal: -this.props.secondHandWidth,
      paddingTop: this.props.secondHandLength,
      paddingHorizontal: this.props.secondHandWidth,
      borderTopLeftRadius: this.props.secondHandCurved ?
                           this.props.secondHandWidth : 0,
      borderTopRightRadius: this.props.secondHandCurved ?
                            this.props.secondHandWidth : 0
    }
  }

  render() {
    return (
      <View style={ this.clockFrame() }>
        {
        <Image
          style={{width: this.props.clockSize - this.props.clockBorderWidth*2,
            height: this.props.clockSize - this.props.clockBorderWidth*2}}
          resizeMode='stretch'
          source={require('../images/clockBack.png')}
        />
        }

        <View style={ this.clockHolder() }>

          <View style={[ this.hourHandStyles(),
            {transform:[{ rotate: this.state.hour + 'deg' },
            {translateX: -(this.props.hourHandOffset +
                           this.props.hourHandLength/2) }]}]}
          />

          <View style={[ this.minuteHandStyles(),
            {transform:[{ rotate: this.state.min + 'deg' },
            { translateY: -(this.props.minuteHandOffset +
                            this.props.minuteHandLength/2) }]}]}
          />

          <View style={[ this.secondHandStyles(),
            {transform:[{ rotate: this.state.sec + 'deg' },
            {translateY: -(this.props.secondHandOffset +
                           this.props.secondHandLength/2) }]}]}
          />

          <View style={ this.clockFace() }/>

        </View>
      </View>
    )
  };
};

AnalogClock.defaultProps = {
  backgroundImage: './img/clockBack.png',
  clockSize: 70,
  clockBorderWidth: 1,
  clockCentreSize: 10,
  clockCentreColor: 'white',
  hourHandColor: 'white',
  hourHandCurved: true,
  hourHandLength: 20,
  hourHandWidth: 1.5,
  hourHandOffset: 0,
  minuteHandColor: 'white',
  minuteHandCurved: true,
  minuteHandLength: 10,
  minuteHandWidth: 1,
  minuteHandOffset: 0,
  secondHandColor: 'white',
  secondHandCurved: false,
  secondHandLength: 30,
  secondHandWidth: 1,
  secondHandOffset: 0,
};
