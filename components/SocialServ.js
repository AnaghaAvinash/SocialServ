import React from 'react';
import LottieView from 'lottie-react-native';

export default class Animation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/social.json')}
      style={{width:"80%",alignSelf:'center'}}
      autoPlay loop />
    )
  }
}
