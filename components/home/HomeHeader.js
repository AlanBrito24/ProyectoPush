import React from 'react'
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native'
import { Constants } from 'expo'

import Logo from './Logo'
import BlackRectangle from './BlackRectangle'
import PurpleRectangle from './PurpleRectangle'

{/*Este es un header solo para la pantalla de inicio, tiene el logo y todo incluido*/}

export default class HomeHeader extends React.Component {
  render() {
    var screenWidth = Dimensions.get('window').width; //ancho de la pantalla
    return (
          <View> 
          {/*los rectangulos empiezan separados del view mas abajo pero no se porq (el View si inicia al principio del display)*/}
            <BlackRectangle width={screenWidth} height={366} viewBox='0 0 414 366' style={{position:'absolute', top:25}} />
            <PurpleRectangle width={screenWidth} height={366} viewBox='0 0 414 366' />
            <View style={styles.logo}>
              <Logo  width='220' height='183' viewBox='0 0 236 183' /> 
            </View>{/*stas mdtos svg no se pueden poner mas grandes que la original*/}
          </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: '15%',  //deberia ser 0 pero asi es que se ve bien centrado el logo en mi tlf
    justifyContent: 'center',
    alignItems: 'center'
  }
});
