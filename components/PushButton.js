import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native'

import BackButton from './BackButton'

export default class PushButton extends Component {
	render() {
		return (
			<View style={styles.container}>
				
				<TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}>
					<View style={[styles.outerCircle, {borderColor: this.props.color}]}>
						<View style={[styles.innerCircle, {borderColor: this.props.color}]}>
						  <Text style={[styles.text, {color: this.props.color}]}>Push!</Text>	
						</View>
					</View>	
				</TouchableOpacity>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center', 
		alignItems: 'center'
	},

	text: {
		color: '#7cd0b9',
		fontSize: 40,
		fontWeight: 'bold'
	},

	outerCircle: {
		backgroundColor: '#2c3941',
		height: 300,
		width: 300,
		borderRadius: 300/2,
		borderColor: '#7cd0b9',
		borderWidth:15,
		justifyContent: 'center',
		alignItems: 'center'
	},

	innerCircle: {
		backgroundColor: '#2c3941',
		height: 240,
		width: 240,
		borderRadius: 240/2,
		borderColor: '#7cd0b9',
		borderWidth:15,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
