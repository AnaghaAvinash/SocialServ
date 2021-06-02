import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import Details from './screens/Details';
import NotificationScreen from './screens/NotificationScreen';
import { AppTabNavigator } from './components/AppTabNavigator';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen : {screen: WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab  : {screen: AppTabNavigator},
  Notification :{screen: NotificationScreen},
  Details:{screen:Details},
});

const AppContainer =  createAppContainer(switchNavigator);

