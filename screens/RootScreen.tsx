import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "../navigation";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import { useColorScheme } from "react-native-appearance";

export default function RootScreen(props: any) {
  const userData = props.extraData;
  const colorScheme = useColorScheme();
  const backgroungTheme =
    colorScheme === "dark" ? styles.darkAppContainer : styles.lightAppContainer;
  const textTheme =
    colorScheme === "dark" ? styles.darkThemeText : styles.lightThemeText;

  return (
    <SafeAreaProvider>
      {/* <Navigation colorScheme={props.colorScheme} /> */}
      {<BottomTabNavigator {...props} userData={userData} />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  lightAppContainer: {
    backgroundColor: "#fefefe",
  },
  darkAppContainer: {
    backgroundColor: "#3d3d3d",
  },
  lightThemeText: {
    color: "#3d3d3d",
  },
  darkThemeText: {
    color: "#fefefe",
  },
});
