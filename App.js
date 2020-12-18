import { StatusBar } from "expo-status-bar";

import { AntDesign } from '@expo/vector-icons';

import React, { useReducer, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Top } from "./pages/Top";
import { Graph } from "./pages/Graph";
import { Config } from "./pages/Config";

import {
  createDailyTable,
  deleteDailyTable,
  getDailyTable,
  insertDailyColumn,
  getDailyColumn
} from "./api/daily";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CigarettesNumContext = React.createContext(null);

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen
        name="HOME"
        component={ Top }
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HOME"
//       tabBarOptions={() => ({
//         showLabel: false
//       })}
    >
      <Tab.Screen
        name="HOME"
        component={ Top }
        options={HomeConfig}
      />
      <Tab.Screen
        name="GRAPH"
        component={ Graph }
        options={GraphConfig}
      />
      <Tab.Screen
        name="CONFIG"
        component={ Config }
        options={ConfigConfig}
      />
    </Tab.Navigator>
  );
};

const HomeConfig = {
  tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
};
const GraphConfig = {
  tabBarIcon: () => <AntDesign name="areachart" size={24} color="black" />,
};
const ConfigConfig = {
  tabBarIcon: () => <AntDesign name="setting" size={24} color="black" />,
};

export default function App() {
  // const [state, dispatch] = useReducer(action, []);
  // const value = { state, dispatch };

  let current_date = new Date();
  let year = current_date.getFullYear();
  let month = current_date.getMonth() + 1;
  let day = current_date.getDate();
  current_date = year + "-" + month + "-" + day;

  const checkDateInit = async () => {
    const date = await getDailyColumn(current_date, "day");

    if(date.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const dbProcess = async () => {
    await deleteDailyTable();
    await createDailyTable();
    let date_exist = await checkDateInit();

    if(date_exist == true) {
      await insertDailyColumn(current_date);
    }
  };
  dbProcess();

 //  const dbProcess = async () => {

 //    const table = await getDailyTable();
 //    console.log(table);

 //    const test_array = await getDailyColumn("2020-11-10", "day");
 //    console.log(test_array);
 //  };

  // dbProcess();

  return (
    // <TaskContext.Provider value={value}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    // </TaskContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {
  CigarettesNumContext
}
