import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CigarettesNumContext } from "../App";

const Top = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  // const { state, dispatch } = useContext(CigarettesNumContext);

  useEffect(() => {}, []);

  const getData = async () => {};

  const deleteTask = async (id) => {};

  const Header = () => {
    return (
      <TouchableOpacity
        style={styles.header_wrapper}
        onPress={() => navigation.navigate("HOME")}
      >
        <Text style={styles.header_text}>Home</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll_container}>
        <Text style={styles.top_text}>今日の本数</Text>
        <View style={styles.count_wrapper}>
          <View style={styles.count_down}>
            <Image
              source={require("../assets/icon.png")}
              style={styles.count_img}
            />
          </View>
          <View style={styles.count_box}></View>
          <View style={styles.count_up}>
            <Image
              source={require("../assets/icon.png")}
              style={styles.count_img}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export {
  Top
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center"
  },
  scroll_container: {
    width: "90%",
  },
  header_wrapper: {
    width: "100%",
    height: 100,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    // alignItems: "flex-end"
    justifyContent: "flex-end"
  },
  header_text: {
    width: "20%",
    height: 70,
    lineHeight: 70,
    fontSize: 20,
    textAlign: "center",
  },
  top_text: {
    width: "100%",
    height: 100,
    lineHeight: 100,
    fontSize: 25,
    textAlign: "center"
  },
  count_wrapper: {
    width: "100%",
    height: 200,
    flexDirection: "row"
  },
  count_box: {
    width: "60%",
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10
  },
  count_down: {
    width: "20%",
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
  },
  count_up: {
    width: "20%",
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
  },
  count_img: {
    width: 50,
    height: 50,
  },
  task_wrapper: {
    width: "100%",
    height: 60,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  task_text: {
    fontSize: 20,
    lineHeight: 60,
  },
  check_wrapper: {
    height: 58,
    width: "15%",
  },
  check_box: {
    height: 58,
    width: "100%",
    backgroundColor: "red"
  },
  check_img: {
    margin: 9,
    height: 40,
    width: 40
  }
});
