import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, Alert } from 'react-native'
import { Constants } from 'expo'

import Header from '../components/Header'
import PushButton from '../components/PushButton'
import Boton from '../components/Boton'
import Timer from '../components/Timer'

var screenWidth = Dimensions.get('window').width; //ancho de la pantalla

export default class Game extends Component {
  state = {
    count: 0,
    time: {}, 
    seconds: this.props.navigation.getParam('tiempo', 6969),
    timeElapsed: 0
  }

  //vainas del timer
  timer = 0

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    Alert.alert(
      'Prepárate!',
      'El tiempo iniciará al tocar OK',
      [
        {text: 'OK', onPress: () => this.startTimer()}
      ],
      {cancelable: false}
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
      timeElapsed: this.state.timeElapsed + 1
    });

    if (seconds == 0) { 
      this.navegar();
    }
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

  //vainas de la pantalla game
  sumar = () => {
    this.setState((prevState) => {
      return {count: prevState.count + 1}
    });
  }
  
  navegar = () => {
    clearInterval(this.timer);
    const { navigation } = this.props;
    const modo = navigation.getParam('modo', 'REVISA');
    const tiempo = navigation.getParam('tiempo', 6969);
    const tiempoTranscurrido = this.state.timeElapsed;

    if (modo == 'SOLO') {
      var score = [this.state.count];
      navigation.navigate('Resultados', {modo: modo, score: score, tiempo: tiempo, transcurrido: tiempoTranscurrido}); 
      return;
    }
    //caso de 2 jugadores (se envia un arreglo de 2 numeros con ambos resultados)
    if (modo == '1 VS 1') {
      if (navigation.getParam('turno', 1) == 1) { //turno jugador 1
        var scoreAux = [this.state.count];
        var transcurridoAux = [this.state.timeElapsed];
        navigation.push('Game', {modo: modo, tiempo: tiempo, turno: 2, score: scoreAux, transcurrido: transcurridoAux});
      } else if (navigation.getParam('turno', 0) == 2) { //turno jugador 2
        var scoreFinal = navigation.getParam('score', null);
        var transcurridoFinal = navigation.getParam('transcurrido', null);
        scoreFinal[1] = this.state.count;
        transcurridoFinal[1] = this.state.timeElapsed;
        navigation.navigate('Resultados', {modo: modo, tiempo: tiempo, score: scoreFinal, transcurrido: transcurridoFinal});
      }
    }
  }

  render() {
    const { navigation } = this.props;
    const modo = navigation.getParam('modo', 'REVISA');
    //esto es para pintar las cosas del color del jugador
    var color = modo == 'SOLO' ? '#7cd0b9' : '#aa93f8'; 
    if (modo == '1 VS 1' && navigation.getParam('turno', 1) == 1) {
      color = '#7cd0b9' 
    }
    return (
      <View style={styles.container}>
        
        <Header titulo={modo} goBack={navigation.goBack} />
        {/*verga condicional para el modo 1v1*/} 
        {modo == '1 VS 1' && 
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
            <Text style={styles.textoTurno}>Turno: </Text>
            <Text style={[styles.textoTurno, {color: color}]}>Jugador {navigation.getParam('turno', 0)}</Text>
          </View>
        }
        <View>
          <PushButton 
            onPress={this.sumar} 
            color={color}
          /> 
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16}}>
            
            <Text style={[styles.timer, {color: color}]}>
              {this.state.time.min} : {this.state.time.sec < 10 ? '0'+this.state.time.sec : this.state.time.sec}
            </Text>
            <Boton 
              texto={'ME RINDO'} 
              onPress={() => this.navegar()} 
              ancho={150}
              color={color}
            />
          </View>  
        </View>
        <View style={styles.footer}>
          <Text style={[styles.pushUps, {color: color}]}>{this.state.count}</Text>
        </View>

      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  timer: {
    color: '#7cd0b9',
    fontSize: 42,
  },

  textoTurno: {
    color: '#2c3942',
    fontSize: 32,
    fontWeight: 'bold'
  },

  footer: {
    backgroundColor: '#2c3942',
    width: screenWidth,
    height: 75,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  pushUps: {
    color: '#7cd0b9',
    fontSize: 40,
    fontWeight: 'bold'
  }
});
