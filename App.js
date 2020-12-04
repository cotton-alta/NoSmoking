import { StatusBar } from "expo-status-bar";

import React, { useReducer, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Top } from "./pages/Top";

const Stack = createStackNavigator();

const CigarettesNumContext = React.createContext(null);

export default function App() {
  // const [state, dispatch] = useReducer(action, []);
  // const value = { state, dispatch };

  return (
    // <TaskContext.Provider value={value}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HOME"
          component={ Top }
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
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
