import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser ? firebase.auth().currentUser.email : "unknown user",
     requestedHelpList: [],
    };
    this.requestRef = null;
  }

  getRequestedHelpList = () => {
    this.requestRef = db
      .collection("requested_help")
      .onSnapshot((snapshot) => {
        var requestedHelpList = snapshot.docs.map((doc) => doc.data());
        this.setState({
         requestedHelpList:requestedHelpList,
        });
      });
  };

  componentDidMount() {
    this.getRequestedHelpList();
  }

  componentWillUnmount() {
  this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <View style={{backgroundColor:"#fbdf69", marginBottom:10, borderBottomWidth:5, borderBottomColor:"191b1c"}}>
      <ListItem
      containerStyle={{backgroundColor:"#fbdf69"}}
        key={i}
        title={item.problem_name}
        subtitle={item.problem_description}
        subtitleStyle={{color:"#191b1c"}}
        titleStyle={{ color: "#5BCCF6", fontWeight: "bold",fontSize:30,alignSelf:"center"}}
        />
               <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Details", {
                details: item,
              });
            }}
          >
            <Text style={{ color: "#191b1c", alignSelf:"center" }}>Help</Text>
          </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.view}>
        <MyHeader navigation ={this.props.navigation} title="Help" />
        <View style={{ flex: 1,backgroundColor:"#fbdf69"}}>
          {this.state.requestedHelpList.length === 0 ? (
            <View style={{backgroundColor:"#fbdf69"}}>
              <Image
              source={require('../assets/nothing.gif')}
              style={styles.bigImage}
            />
            </View>
          ) : (
            <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedHelpList}
              renderItem={this.renderItem}
               />
               </View>
          )
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#5BCCF6",
    borderRadius:20,
    marginBottom:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  view:{
    flex: 1,
    backgroundColor: "#fbdf69"
  },
  bigImage:{
  alignSelf:'center',
}
});
