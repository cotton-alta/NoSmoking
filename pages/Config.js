import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CigarettesNumContext } from "../App";
import { ConfigSection } from "../components/Section";

const Config = ({ navigation }) => {
  // const { state, dispatch } = useContext(CigarettesNumContext);

  const Header = () => {
    return (
      <TouchableOpacity
        style={styles.header_wrapper}
        onPress={() => navigation.navigate("HOME")}
      >
        <Text style={styles.header_text}>Config</Text>
      </TouchableOpacity>
    );
  };

  const sections = {
    headline: "銘柄",
    content: [
      { title: "1箱あたりの本数", to: "SETTING_NUM" },
      { title: "1箱あたりの価格", to: "SETTING_PRICE" },
    ]
  };

  const style = {
    marginTop: 20
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll_container}>
        <ConfigSection styles={style} sections={sections} />
      </ScrollView>
    </View>
  );
}

export {
  Config
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
    borderBottomColor: "#ededed",
    borderBottomWidth: 1,
    justifyContent: "flex-end",
    backgroundColor: "#90CECC"
  },
  header_text: {
    width: "20%",
    height: 70,
    lineHeight: 70,
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  task_wrapper: {
    width: "100%",
    height: 60,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
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
