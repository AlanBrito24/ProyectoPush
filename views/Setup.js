import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, Alert } from 'react-native'
import { Constants } from 'expo'

import Header from '../components/Header'
import Boton from '../components/Boton'
import BackButton from '../components/BackButton'

var screenWidth = Dimensions.get('window').width; //ancho de la pantalla

export default class SoloSetup extends Component {
  state = {
    tiempo: 0,
    mostrarLista: false
  }

  showAlert = () => {
    Alert.alert('Selecciona un tiempo primero!')
  }

  handleClick = () => {
    this.setState((prevState) => ({
      mostrarLista: !prevState.mostrarLista
    }));
  }

  setTime = (time) => {
    this.setState((prevState) => ({
      mostrarLista: !prevState.mostrarLista,
      tiempo: time
    }));
  }

  render() {
    const modo = this.props.navigation.getParam('modo', 'REVISA');
    return (
      <View style={styles.container}>

        <Header titulo={modo} goBack={this.props.navigation.goBack} />
        <View style={styles.cuadroMorado} />
        <View style={styles.CuadroNegro} />
        <View style={styles.textView}>
          <Text style={[styles.texto, {fontSize: 25, lineHeight: 30, marginBottom: 30}]}>Instrucciones</Text> 
          <Text style={styles.texto}>1.Escoge el tiempo de duracion</Text>
          <Text style={styles.texto}>2.Coloca tu telefono en una</Text>
          <Text style={styles.texto}>posicion comoda</Text>
          <Text style={styles.texto}>3.Presiona INICIAR</Text>
          <Text style={styles.texto}>4.Toca la pantalla con la nariz</Text>
          <Text style={styles.texto}>o dedo cada flexion!</Text>
        </View>          
        {/*renderizado condicional de la lista de tiempos (cuando se le da al boton tiempo se muestra la lista)*/}
        {this.state.mostrarLista && 
          <View style={styles.lista}>
              <View style={styles.tituloLista}>
                <Text style={[styles.textoLista]}>SELECCIONE</Text>
              </View>
              <TouchableOpacity style={styles.itemLista} activeOpacity={0.7} onPress={() => this.setTime(30)}>
                <Text style={styles.textoLista}>30s</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemLista} activeOpacity={0.7} onPress={() => this.setTime(60)}>  
                <Text style={styles.textoLista}>1min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemLista} activeOpacity={0.7} onPress={() => this.setTime(90)}>
                <Text style={styles.textoLista}>1min 30s</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.itemLista, {borderBottomWidth: 0}]} activeOpacity={0.7} onPress={() => this.setTime(120)}>
                <Text style={styles.textoLista}>2min</Text>
              </TouchableOpacity>
          </View>
        }
        <View style={styles.buttonContainer}>
          <View style={{marginBottom: 20}}>
            <Boton texto={'TIEMPO'}
                   onPress={this.handleClick} 
            />
          </View>
          <Boton 
            texto={'INICIAR'} 
            onPress={() => this.state.tiempo > 0 ? 
                           this.props.navigation.navigate('Game', {tiempo: this.state.tiempo, modo: modo, turno: 1}) : 
                           this.showAlert()} 
          />    
        </View>
        
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1, //por default es flexDirection column
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
  lista: {
    position: 'absolute',
    top: 140,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 10,
    borderColor: '#2c3942',
    borderWidth: 2,
    width: '60%'
  },
  
  itemLista: {
    padding: 15,
    borderColor: '#2c3942',
    borderBottomWidth: 2
  },

  tituloLista: {
    backgroundColor: '#C8B9FA',
    padding: 15,
    borderColor: '#2c3942',
    borderBottomWidth: 2
  },

  textoLista: {
    color: '#2c3942',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 32,
    textAlign: 'center'
  },

  cuadroMorado: {
    backgroundColor: '#C8B9FA',
    height: 250,
    width: '80%',
    transform: [{translateX: -15}, {translateY: 55}, {rotate: '-70deg'}],

  },

  CuadroNegro: {
    backgroundColor: '#2c3942',
    height: 250,
    width: '80%',
    transform: [{translateX: 30}, {translateY: -195}, {rotate: '-70deg'}]
  },
  
  textView: {
    transform: [{translateY: -455}, {translateX: 30}]
  },

  texto: {
    color:'white',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 28
  },

  buttonContainer: {
    transform: [{translateY: -360}],
  }
});
