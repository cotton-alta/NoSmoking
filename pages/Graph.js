import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CigarettesNumContext } from "../App";
import { LineChart } from "react-native-chart-kit";
import RNPickerSelect from "react-native-picker-select";

const Graph = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  // const { state, dispatch } = useContext(CigarettesNumContext);

  useEffect(() => {}, []);

  const getData = async () => {};

  const deleteTask = async (id) => {};

  const clicks = () => {

  };

  const Header = () => {
    return (
      <TouchableOpacity
        style={styles.header_wrapper}
        onPress={() => navigation.navigate("HOME")}
      >
        <Text style={styles.header_text}>Graph</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scroll_container}
      >
        <View style={styles.button_wrapper}>
          <View
            style={styles.button_day}
            onClick={clicks}
          >
            <Text style={styles.button_text}>day</Text>
          </View>
          <View
            style={styles.button_month}
            onClick={clicks}
          >
            <Text style={styles.button_text}>month</Text>
          </View>
          <View
            style={styles.button_year}
            onClick={clicks}
          >
            <Text style={styles.button_text}>year</Text>
          </View>
        </View>
        <View style={styles.picker_wrapper}>
          <RNPickerSelect
            placeholder={{ label: "日付を選択", value: "" }}
            onValueChange={clicks}
            style={picker_style}
            items={[
              { label: "2020/12/07", value: "2020/12/07" },
              { label: "2020/12/08", value: "2020/12/08" },
              { label: "2020/12/09", value: "2020/12/09" },
            ]}
          />
        </View>
        <View style={styles.graph_wrapper}>
          <LineChart
            data={{
              labels: ["1", "2", "3"],
                datasets: [{
                  data: [1, 4, 3]
                }]
            }}
            width={300}
            height={300}
            yAxisLabel={"本"}
            chartConfig={{
              backgroundColor: "#FFF",
              backgroundGradientFrom: "#FFF",
              backgroundGradientTo: "#FFF",
              color: (opacity = 0.5) => `rgba(0, 0, 0, 0.5)`,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export {
  Graph
}

const picker_style = StyleSheet.create({
  inputIOS: {
    width: 200,
    height: 45,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10
  },
});

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
    justifyContent: "center"
  },
  scroll_wrapper: {
    width: 300,
    height: 300
  },
  header_wrapper: {
    width: "100%",
    height: 100,
    borderBottomColor: "#ededed",
    borderBottomWidth: 1,
    justifyContent: "flex-end"
  },
  header_text: {
    width: "20%",
    height: 70,
    lineHeight: 70,
    fontSize: 20,
    textAlign: "center",
  },
  button_wrapper: {
    flexDirection: "row",
    paddingTop: 10
  },
  button_day: {
    width: 100,
    height: 40,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: "gray",
  },
  button_month: {
    width: 100,
    height: 40,
    borderRightWidth: 2,
    borderRightColor: "#FFF",
    borderLeftWidth: 2,
    borderLeftColor: "#FFF",
    backgroundColor: "gray"
  },
  button_year: {
    width: 100,
    height: 40,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "gray"
  },
  button_text: {
    width: 100,
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    color: "#FFF"
  },
  picker_wrapper: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
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
