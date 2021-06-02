import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Card,Icon } from "react-native-elements";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import MyHeader from '../components/MyHeader';
import db from "../config.js";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser ? firebase.auth().currentUser.email : "unknown user",
      userName: "",
      recieverId: this.props.navigation.getParam("details")["user_id"],
      requestId: this.props.navigation.getParam("details")["request_id"],
      problemName: this.props.navigation.getParam("details")["problem_name"],
      problemDescription:this.props.navigation.getParam("details")["problem_description"],
      recieverName: "",
      recieverContact: "",
      recieverAddress: "",
      recieverRequestDocId: "",
    };
  }

  getRecieverDetails() {
    db.collection("users")
      .where("email_id", "==", this.state.recieverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverName: doc.data().first_name,
            recieverContact: doc.data().contact,
            recieverAddress: doc.data().address,
          });
        });
      });

    db.collection("requested_help")
      .where("request_id", "==", this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverRequestDocId: doc.id,
          });
        });
      });
  }

  getUserDetails = (userId) => {
    db.collection("users")
      .where("email_id", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().first_name + " " + doc.data().last_name,
          });
        });
      });
  };

 updateStatus = () => {
    db.collection("all_donations").add({
      problem_name: this.state.problemName,
      request_id: this.state.requestId,
      requested_by: this.state.recieverName,
      donor_id: this.state.userId,
      request_status: "Donor Interested",
    });
  };

  addNotification = () => {
    var message =
      this.state.userName + " has confirmed to help you";
    db.collection("all_notifications").add({
      targeted_user_id: this.state.recieverId,
      donor_id: this.state.userId,
      request_id: this.state.requestId,
      problem_name: this.state.problemName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: "unread",
      message: message,
    });
  };

  componentDidMount() {
    this.getRecieverDetails();
    this.getUserDetails(this.state.userId);
  }

  render() {
    return (
      <View style={{ flex: 1,backgroundColor:'#fbdf69' }}>
        <View style={{ flex: 0.1 }}>
          <MyHeader navigation ={this.props.navigation} title="Details" />
        </View>
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              flex: 0.3,
              flexDirection: "row",
              paddingTop: RFValue(10),
              paddingLeft: RFValue(10),
            }}
          >
            <View style={{ flex: 0.4,}}>
              <Image
                 source={require('../assets/help.png')}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
            </View>
            <View
              style={{
                flex: 0.7,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(30),
                  textAlign: "center",
                  color:'#191b1c'
                }}
              >
                {this.state.problemName}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(15),
                  textAlign: "center",
                  marginTop: RFValue(15),
                  color:'#5BCCF6'
                }}
              >
                use these details to help reach out to this person
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.7,
              padding: RFValue(20),
            }}
          >
            <View style={{ flex: 0.8 ,justifyContent:'center',marginTop:RFValue(20),borderWidth:3,backgroundColor:"#191b1c",borderColor:'#5BCCF6',padding:RFValue(10)}}>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(10),
                 color:'#5BCCF6'
                }}
              >
                Name:{this.state.recieverName}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(20),
                  color:'#5BCCF6'
                }}
              >
                Contact: {this.state.recieverContact}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(20),
                  color:'#5BCCF6'
                }}
              >
                Address: {this.state.recieverAddress}
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.recieverId !== this.state.userId ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.addNotification();
                    return Alert.alert("Wonderful! You've agreed to help this person, please reach out to them.");
                  }}
                >
                  <Text style = {{color:'#0d1239',fontWeight:'bold'}}>I want to help</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
           <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Help')}>
       <Image
              source={require('../assets/back.png')}
              style={styles.image}
            />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    marginTop:10,
    alignItems: "center",
    borderRadius: RFValue(60),
    backgroundColor: "#5BCCF6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  image:{
    marginLeft:10
  }
});
