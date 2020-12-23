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

import { DBLoadAction } from "./actions/daily";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DBLoadContext = React.createContext(false);

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
      tabBarOptions={{
        style: {
          backgroundColor: "#90CECC",
        },
        inactiveTintColor: "#FFFFFF",
        activeTintColor: "#444444"
      }}
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
  tabBarIcon: () => <AntDesign name="home" size={24} color="white" />,
};
const GraphConfig = {
  tabBarIcon: () => <AntDesign name="areachart" size={24} color="white" />,
};
const ConfigConfig = {
  tabBarIcon: () => <AntDesign name="setting" size={24} color="white" />,
};

export default function App() {
  const [DBLoad, DBLoadDispatch] = useReducer(DBLoadAction, false);
  const value = { DBLoad, DBLoadDispatch };

  return (
    <DBLoadContext.Provider value={value}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    </DBLoadContext.Provider>
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
  DBLoadContext
}
