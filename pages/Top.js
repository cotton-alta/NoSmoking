import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CigarettesNumContext } from "../App";

import {
  createDailyTable,
  deleteDailyTable,
  getDailyTable,
  insertDailyColumn,
  updateDailyColumn,
  getDailyColumn
} from "../api/daily";

import { DBLoadContext } from "../App";

const Top = ({ navigation }) => {
  const { DBLoad, DBLoadDispatch } = useContext(DBLoadContext);
  const [numCigarettes, setNumCigarettes] = useState(0);
  const [viewType, setViewType] = useState("day");
  const [currentDate, setCurrentDate] = useState("2020-01-01");

  useEffect(() => {
    let current_date = new Date();
    let year = current_date.getFullYear();
    let month = current_date.getMonth() + 1;
    let day = current_date.getDate();
    current_date = year + "-" + month + "-" + day;
    setCurrentDate(current_date);

    const checkDateInit = async () => {
      const date = await getDailyColumn(current_date, "day");

      console.log(date.length);
      if(date.length == 0) {
        return true;
      } else {
        return false;
      }
    };

    const dbInit = async () => {
      // await deleteDailyTable();
      await createDailyTable();
      let date_exist = await checkDateInit();

      if(date_exist == true) {
        await insertDailyColumn(current_date);
      }
      DBLoadDispatch({
        type: "checkLoad",
        payload: true
      });

      const data = await getDailyColumn(current_date, "day");
      console.log(currentDate);
      setNumCigarettes(data[0].count);
    };
    dbInit();

  }, []);

  const getData = async () => {};

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

  const Count = () => {
    return (
      <Text style={styles.count_text}>{numCigarettes}</Text>
    );
  };

  const countUp = () => {
    setNumCigarettes(numCigarettes + 1);
    updateDailyColumn(currentDate, numCigarettes + 1);
  };

  const countDown = () => {
    if(Number(numCigarettes) > 0) {
      setNumCigarettes(numCigarettes - 1);
      updateDailyColumn(currentDate, numCigarettes - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll_container}>
        <Text style={styles.top_text}>今日の本数</Text>
        <View style={styles.count_wrapper}>
          <TouchableOpacity
            style={styles.count_down}
            onPress={countDown}
          >
            <Image
              source={require("../assets/left.png")}
              style={styles.count_img}
            />
          </TouchableOpacity>
          <View style={styles.count_box}>
            <Count />
          </View>
          <TouchableOpacity
            style={styles.count_up}
            onPress={countUp}
          >
            <Image
              source={require("../assets/right.png")}
              style={styles.count_img}
            />
          </TouchableOpacity>
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
    borderBottomColor: "#ededed",
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
  count_text: {
    height: "100%",
    width: "100%",
    lineHeight: 200,
    fontSize: 70,
    textAlign: "center"
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
