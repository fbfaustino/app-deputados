import React from 'react';
import { createStackNavigator } from 'react-navigation'
import Explore from './screens/Explore'
import Produtos from './screens/Produtos'
import Detalhes from './screens/Detalhes';
import { Title } from 'native-base';


export default createStackNavigator({
  Home: {
    screen: Explore,
  },
  Produtos: {
    screen: Produtos
  },
  Detalhes: {
    screen: Detalhes
  },

});