import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, AsyncStorage } from 'react-native'

import Header from '../components/Header'
import Boton from '../components/Boton'

var screenWidth = Dimensions.get('window').width;

export default class Resultados extends Component {
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

  ganador() {
  	const score = this.props.navigation.getParam('score', 999);
  	if (score[0] > score[1]) 
  		return <Text style={{color: '#2c3942', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
  							El ganador fue: <Text style={{fontSize: 60, color: '#7cd0b9'}}>Jugador 1!</Text>
  						</Text>

  	if (score[1] > score[0]) 
			return <Text style={{color: '#2c3942', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
						  	El ganador fue: <Text style={{fontSize: 60, color: '#aa93f8'}}>Jugador 2!</Text>
						  </Text>
  	
  		return <Text style={{color: '#7cd0b9', fontSize: 40, fontWeight: 'bold', textAlign: 'center'}}>
  						 Ha sido <Text style={{color: '#aa93f8'}}>un empate!</Text>
  						</Text>
  }

  mensaje() {
  	let score = this.props.navigation.getParam('score', null);
		if (score[0] > score[1]) 
			return <Text style={styles.mensaje}>
						    <Text style={{color: '#aa93f8'}}>Jugador 2</Text> te falta fororo mano...		
			   		 </Text>

		if (score[1] > score[0])
			return <Text style={styles.mensaje}>
						    <Text style={{color: '#7cd0b9'}}>Jugador 1</Text> te falta fororo mano...	
			   		 </Text>

		return <Text style={{color: '#2c3942', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginLeft: 2}}>
						  Parece que tendrá que haber una revancha!		
			   		</Text>
  }

	flexionesPorMinuto(flexiones, tiempo) {
		let fpm = (flexiones * 60) / tiempo;

		return <Text style={[styles.mensaje, {fontSize: 20}]}>{fpm} flexiones por minuto</Text>
	}

	async componentDidMount() {
		if (this.props.navigation.getParam('modo', 'REVISA') == 'SOLO') {
			//crear objeto con resultados actuales
			const score = this.props.navigation.getParam('score', 999);
			const tiempo = this.secondsToTime(this.props.navigation.getParam('transcurrido', 0)); 
			const newStats = {
				flexiones: score[0],
				min: tiempo.min,
				sec: tiempo.sec
			}
			//sacar el array que estaba guardado antes para meterle el objeto nuevo
			try {
				const statsString = await AsyncStorage.getItem('stats');
				let stats = JSON.parse(statsString);
				//si el arreglo estaba vacio entonces es la primera vez que se guardan datos, asi que se crea uno nuevo
				if (!stats) {
					stats = []
				}
				//meter los stats del jugador actual al arreglo
				stats.push(newStats);
				//guardar el arreglo otra vez
				await AsyncStorage.setItem('stats', JSON.stringify(stats));
				console.log('arreglo guardado cheveroso');
			} catch(error) {
				alert(error);
			}
		}
	}

	render() {
		const { navigation } = this.props;
		const modo = navigation.getParam('modo', 'REVISA');
		const score = navigation.getParam('score', 999); //array de 2 posiciones con el nro de pushups final del jugador 1 y jugador 2
		//el 0, el 999 y el REVISA son valores para saber si da error la obtencion del parametro
		const tiempo = this.secondsToTime(navigation.getParam('tiempo', 0));

		const transcurrido = ( modo == 'SOLO' ? this.secondsToTime(navigation.getParam('transcurrido', 0)) : navigation.getParam('transcurrido', null) );
		var transcurrido1;
		var transcurrido2;
		if (modo == '1 VS 1') {
			transcurrido1 = this.secondsToTime(transcurrido[0]);
			transcurrido2 = this.secondsToTime(transcurrido[1]);
		}
		return (
			<View style={styles.container}>
			
				<Header titulo={modo} goBack={navigation.goBack} />
				{modo == 'SOLO' && 
					<View style={{flex: 1, justifyContent: 'space-around', width: screenWidth}}>
						<Text style={styles.tiempo}>
							Tiempo!

						</Text>
							<View style={{alignItems: 'stretch', backgroundColor: '#aa93f8'}}>
								<Text style={{textAlign: 'center', color: '#2c3942', fontSize: 35, fontWeight: 'bold'}}>Resultado:</Text>
							</View>
						<View>
							<Text style={{color: '#aa93f8', fontSize: 45, fontWeight: 'bold', textAlign: 'center'}}>
								{score[0]}{' '}
								<Text style={{color: '#2c3942', fontSize: 35}}>
									flexiones
								</Text>
							</Text>
							<Text style={{color: '#7cd0b9', fontSize: 45, fontWeight: 'bold', textAlign: 'center'}}>
								{transcurrido.min} <Text style={{color: '#2c3942', fontSize: 35}}>min </Text>
								<Text>
									{transcurrido.sec} <Text style={{color: '#2c3942', fontSize: 35}}>seg</Text>
								</Text>	
							</Text>
						</View>
						<View>
							{this.flexionesPorMinuto(score[0], navigation.getParam('transcurrido', 0))}	
						</View>
					</View>			
				}
				{/*mostrar esto si era en 1v1*/}
				{modo == '1 VS 1' && 
					<View style={{flex: 1, justifyContent: 'space-around', width: screenWidth}}>
						<Text style={styles.tiempo}>
							Tiempo!
						</Text>
						{this.ganador()}
						{this.mensaje()}
						<View>	
							<Text style={{color: '#7cd0b9', fontSize: 21, fontWeight: 'bold', textAlign: 'center'}}>
								Jugador 1 {' '}  
								<Text style={{color: '#2c3942'}}>
									hizo {score[0]} flexiones en {transcurrido1.min} : {transcurrido1.sec}
								</Text>
							</Text>
							<Text style={{color: '#aa93f8', fontSize: 21, fontWeight: 'bold', textAlign: 'center'}}>
								Jugador 2 {' '}  
								<Text style={{color: '#2c3942'}}>
									hizo {score[1]} flexiones en {transcurrido2.min} : {transcurrido2.sec}
								</Text>
							</Text>
						</View>
					</View>
				}
				<View style={styles.footer}>
					<Boton 
						texto={'HOME'}
            			onPress={() => navigation.navigate('Home')} 
          			/>
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
	
	tiempo: {
		color: '#2c3942', 
		fontSize: 55, 
		fontWeight: 'bold', 
		textAlign: 'center'
	},

	mensaje: {
		color: '#2c3942', 
		fontSize: 16, 
		fontWeight: 'bold', 
		textAlign: 'center', 
		marginLeft: 2
	},

	footer: {
    backgroundColor: '#2c3942',
    width: screenWidth,
    height: 100,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }

});