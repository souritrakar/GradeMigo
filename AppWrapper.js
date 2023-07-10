import React from "react";
import { View, Dimensions } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./components/TabNavigator";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          height: Dimensions.get("window").height / 13,
        },
        headerTintColor: "black"
      }}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false, headerTitleAlign: "center" }}
      />

      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ title: "AI Grader", headerTitleAlign: "left", headerShown:false }}
        
      />

    </Stack.Navigator>
  );
}

export default function AppWrapper(props) {
  return (
    <NavigationContainer>
      <MyStack navigation={props.navigation} />
    </NavigationContainer>
  );
}