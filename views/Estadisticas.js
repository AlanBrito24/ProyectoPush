import React, { Component } from 'react'
import { StyleSheet, View, Text, AsyncStorage, ScrollView, ListView } from 'react-native'

import Header from '../components/Header'
export default class Estadisticas extends Component {
	
	state = {
		data: []
	}
	
	async componentDidMount() {
		try {
			const value = await AsyncStorage.getItem('stats');
				console.log(value);
				this.setState({data: JSON.parse(value)});
				console.log('state: ', this.state.data);
		} catch (error) {
			console.log(error);
		}
	}

	parseData(){
		if(this.state.data){
			return this.state.data.map((data, i) => {
				return (
					 <View styles={styles.lista} key={i}>

					 	<View style={styles.tituloLista}>
                			<Text style={[styles.textoLista]}> Sesion N {i + 1}</Text>
              			</View>
					 		<View style={styles.itemLista} >
					 		<Text></Text>
					 		<Text style={styles.textoLista}>Flexiones: {data.flexiones}, tiempo: {data.min}:{data.sec}</Text>
					 		<Text></Text>
					 		 </View>
					    </View>
					 
					)
			})
		}

	}


	render() {
		const {data} = this.state;
		return (
			<ScrollView>
			<View style={styles.container}>	

				<Header titulo={'STATS'} goBack={this.props.navigation.goBack} />
				
				{this.parseData()}
				
			</View>
			</ScrollView>
		);
	}
}


const styles = StyleSheet.create({
	container: {
    flex:1, 
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  	  lista: {
    position: 'absolute',
    top: 150,
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
    borderRightWidth: 2,
    borderLeftWidth: 2,
    width: 500,
    height: 90,
  },

  tituloLista: {
    backgroundColor: '#C8B9FA',
    padding: 15,
    borderColor: '#2c3942',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
  },

  textoLista: {
    color: '#2c3942',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 32,
    textAlign: 'center'
  },

});