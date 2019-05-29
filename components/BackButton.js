import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native'

export default class BackButton extends Component {
	render() {
		return (
			<TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}>
				<View style={styles.circulo}>
					<Text style={styles.texto}>{'<'}</Text>
				</View>
			</TouchableOpacity>
		);	
	}
}

var size = 45;

const styles = StyleSheet.create({
	circulo: {
		width: size,
    height: size,
    borderRadius: size/2,
    backgroundColor: '#2c3942',
    alignItems: 'center',
    justifyContent: 'center'
	},
	texto: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 32,
		paddingBottom: 5
	}
});