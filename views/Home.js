import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { Constants } from 'expo'

import Header from '../components/home/HomeHeader'
import Boton from '../components/Boton'

var screenWidth = Dimensions.get('window').width; //ancho de la pantalla

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Image
          source={require('../assets/background.png')}
          style={styles.bkg}
        />
        <Header />
        <View style={styles.buttonContainer}>
          <Boton 
            texto={'SOLO'}
            onPress={() => this.props.navigation.navigate('Setup', {modo: 'SOLO'})} 
          />
          <Boton 
            texto={'1 VS 1'}
            onPress={() => this.props.navigation.navigate('Setup', {modo: '1 VS 1'})}
          />
          <Boton 
            texto={'ESTADISTICAS'}
            onPress={() => this.props.navigation.navigate('Estadisticas')}
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
    //paddingTop: Constants.statusBarHeight //se supone que esto deberia ponerse para que no haga overlap con la statusbar pero al parecer no se necesita en mi tlf
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly'
  },

  bkg: {
    position: 'absolute',
    width: 380,
    height: 380,
    top: 260,
  }
});
