import { StatusBar } from "expo-status-bar";

import { AntDesign } from '@expo/vector-icons';

import React, { useReducer, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Top } from "./pages/Top";

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
        options={TabConfig}
      />
    </Tab.Navigator>
  );
};

const TabConfig = {
  tabBarIcon: () => <AntDesign name="areachart" size={24} color="black" />,
};

export default function App() {
  // const [state, dispatch] = useReducer(action, []);
  // const value = { state, dispatch };

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
