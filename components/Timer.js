import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native'

//Esta verga ya no se usa ni siquiera pero la deje pal recuerdo
export default class Timer extends Component {
  render() {
    return(
      <View style={styles.MainContainer}>

        {this.props.startTimer()}
        <Text style={[styles.timer, {color: this.props.color}]}>
          {this.state.time.min} : {this.state.time.sec < 10 ? '0'+this.state.time.sec : this.state.time.sec}
        </Text>
        
      </View>
    );
  }
} 
 
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  timer: {
    color: '#7cd0b9',
    fontSize: 42,
  }
});

/*
      CODIGO ANTERIOR DEL TIMER, LO DEJO AQUI POR SI ES NECESARIO
import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native'

//NO ME PREGUNTEN COMO FUNCIONA ESTO POQUE NO SE, ES DE INTERNET XD
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: this.props.time };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    
    let obj = {
      "min": minutes,
      "sec": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    
    if (seconds == 0) { 
      clearInterval(this.timer);
      this.props.navigate();
    }
  }

  render() {
    return(
      <View style={styles.MainContainer}>
        {this.startTimer()}
        <Text style={[styles.timer, {color: this.props.color}]}>
          {this.state.time.min} : {this.state.time.sec < 10 ? '0'+this.state.time.sec : this.state.time.sec}
        </Text>
      </View>
    );
  }
} 
 
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  timer: {
    color: '#7cd0b9',
    fontSize: 42,
  }
});*/