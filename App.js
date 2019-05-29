import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation"

import Home from './views/Home'
import Setup from './views/Setup'
import Game from './views/Game'
import Estadisticas from './views/Estadisticas'
import Resultados from './views/Resultados'

import PushButton from './components/PushButton'

//esto es para el routing entre vistas (recibe un objeto de configuracion de rutas y un objeto de opciones, retorna un componente)
const AppNavigator = createStackNavigator(
  { //rutas
    Home: Home,
    Setup: Setup,
    Game: Game,
    Estadisticas: Estadisticas,
    Resultados: Resultados 
  },
  { //opciones
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);
{/*Aja lee esto puton, se supone que las rutas son los componentes de la carpeta views porque son las vistas de la app
pero solo esta lista es la de home, por ahora estoy usando el componente de PushButton para hacer las pruebas de otra vista
pero ese componente solo debe retornar el botoncito para meterlo en las views de SoloGame y 1v1Game*/}
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}
