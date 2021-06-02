import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AskForHelpScreen from '../screens/AskForHelp';
import HelpScreen from '../screens/Help';

export const AppTabNavigator = createBottomTabNavigator({
   Help : {
    screen: HelpScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/help.png")} style={{width:25, height:25}}/>,
      tabBarLabel : "Help",
    }
  },
   AskForHelp : {
    screen: AskForHelpScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/ask.png")} style={{width:25, height:25}}/>,
      tabBarLabel : "Ask for help",
    }
  },
})