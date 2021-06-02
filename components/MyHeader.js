import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import { DrawerActions } from 'react-navigation';
import NotificationScreen from '../screens/NotificationScreen';
import db from '../config'
import firebase from 'firebase';

export default class MyHeader extends Component{
  constructor(props){
    super(props)
    this.state={
      userId : firebase.auth().currentUser ? firebase.auth().currentUser.email : "unknown user",
      value:""
    }
  }

getNumberOfUnreadNotifications(){
  db.collection('all_notifications').where('notification_status','==',"unread").where('targeted_user_id','==',this.state.userId)
  .onSnapshot((snapshot)=>{
    var allNotifications = snapshot.docs.map((doc) => doc.data())
    this.setState({
      value: allNotifications.length
    })
  })
}

componentDidMount(){
  this.getNumberOfUnreadNotifications()
}

 BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#fbdf69' size={25}
          onPress={() =>this.props.navigation.navigate('Notification')}/>
         <Badge
          value={this.state.value}
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }

  render(){
    return(
        <Header
        leftComponent={<Icon name='bars' type='font-awesome' color='#fbdf69'  onPress={() => this.props.navigation.toggleDrawer()}/>}
          centerComponent={{ text: this.props.title, style: { color: '#191b1c', fontSize:20,fontWeight:"bold",fontFamily:'Brittanic' } }}
          rightComponent={<this.BellIconWithBadge {...this.props}/>}
          backgroundColor = "#5BCCF6"
        />
  )
 }
}

