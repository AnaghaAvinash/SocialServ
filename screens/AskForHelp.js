import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,
  Image,
  TextInput
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import MyHeader from "../components/MyHeader";

export default class DetailsScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser ? firebase.auth().currentUser.email : "unknown user",
      problemName: "",
      problemDescription: "",
      requestedHelpName: "",
      requestId: "",
      userDocId: "",
      docId: "",
      showFlatlist: false,
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = async (problemName, problemDescription) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();


    db.collection("requested_help").add({
      user_id: userId,
      problem_name: problemName,
      problem_description: problemDescription,
      request_id: randomRequestId,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    this.setState({
      problemName: "",
      problemDescription: "",
      requestId: randomRequestId,
    });

    return Alert.alert("Your problem is submitted, a helper will get back to you soon");
  };
  
  render() {
    return (
      <View style={{ flex: 1,backgroundColor:"#fbdf69"}}>
         <MyHeader navigation ={this.props.navigation} title="Ask for help" />
           <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Problem's title"}
            containerStyle={{ marginTop: RFValue(80) }}
             onChangeText={(text) => {
                  this.setState({
                    problemName: text,
                  });
                }}
            value={this.state.problemName}
          />
           </View>
           
            <View style={{ alignItems: "center" }}>
              <TextInput
                style={[styles.formTextInput,{height:300}]}
                containerStyle={{ marginTop: RFValue(40) }}
                multiline
                numberOfLines={8}
                placeholder={"Describe your problem..."}
                onChangeText={(text) => {
                  this.setState({
                    problemDescription: text,
                  });
                }}
                value={this.state.problemDescription}
              />
              <TouchableOpacity
                style={styles.Bbutton}
                onPress={() => {
                    this.addRequest(
                    this.state.problemName,
                    this.state.problemDescription,
                  );
                }}
              >
                <Text
                  style={styles.requestbuttontxt}
                >
                  Ask for help
                </Text>
              </TouchableOpacity>
                 
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: 300,
    height: RFValue(45),
    borderColor:'#5BCCF6',
    borderWidth: 3,
    marginTop:23,
    padding: 10,
    borderRadius:5,
    color:'#030e12',
  },
  requestbuttontxt:{
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#5BCCF6",
  },
   Bbutton: {
    width: RFValue(200),
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#030e12",
    shadowColor: "fff",
    marginTop:20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
