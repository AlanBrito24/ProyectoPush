import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { LinearGradient } from 'expo'
import { Constants } from 'expo'

import BackButton from './BackButton'
{/*Este es un header general para usar en las diversas vistas*/}

var screenWidth = Dimensions.get('window').width; //ancho de la pantalla

export default class Header extends React.Component {
  render() {
    return (
						<LinearGradient
		          colors={["#D2C5FB", "#C8B9FA", "#BBA9F9", "#B29EF8", "#AA93F8"]}
		          start={[0, 0]}
		          end={[1, 0]}
		          style={styles.wrapper} >
		          <View style={styles.boton}><BackButton onPress={() => this.props.goBack()} /></View>
							<Text style={styles.titulo} >{this.props.titulo}</Text>
       			</LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
	wrapper: {
		height: 100,
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: Constants.statusBarHeight,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0
	},

	titulo: {
		color: 'white',
		fontSize: 40,
		fontWeight: 'bold',
	},

	boton: {
		position: 'absolute',
		top: '50%',
		left: 10
	}
});
