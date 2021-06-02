import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Help from '../screens/Help';
import Details  from '../screens/Details';




export const AppStackNavigator = createStackNavigator({
  Help : {
    screen : Help,
    navigationOptions:{
      headerShown : false
    }
  },
  Details : {
    screen : Details,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'Help'
  }
);
