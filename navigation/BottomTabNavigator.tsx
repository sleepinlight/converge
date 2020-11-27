import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { HomeScreen } from "../screens";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  HomeTabParamList,
  SettingsTabParamList,
  AddFragmentTabParamList,
} from "../types";
import AddFragmentScreen from "../screens/AddFragment";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(props: any) {
  const colorScheme = useColorScheme();
  const userData = props.userData;

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        children={() => (
          <HomeScreenNavigator
            {...props}
            extraData={userData}
          ></HomeScreenNavigator>
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AddFragment"
        children={() => (
          <AddFragmentScreenNavigator
            {...props}
            extraData={userData}
          ></AddFragmentScreenNavigator>
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-list" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        // component={TabSettingsNavigator}
        children={() => (
          <SettingsScreenNavigator {...props}></SettingsScreenNavigator>
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-options" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}

const HomeScreenStack = createStackNavigator<HomeTabParamList>();

function HomeScreenNavigator(props: any) {
  const userData = props.extraData;
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen
        name="TabHomeScreen"
        // component={HomeScreen}
        children={() => <HomeScreen {...props} />}
        options={{ headerTitle: "Home Title" }}
      />
    </HomeScreenStack.Navigator>
  );
}

const SettingsScreenStack = createStackNavigator<SettingsTabParamList>();

function SettingsScreenNavigator(props: any) {
  return (
    <SettingsScreenStack.Navigator>
      <SettingsScreenStack.Screen
        name="TabSettingsScreen"
        // component={HomeScreen}
        children={() => <SettingsScreen {...props} />}
        options={{ headerTitle: "Settings Title" }}
      />
    </SettingsScreenStack.Navigator>
  );
}

const AddFragmentScreenStack = createStackNavigator<AddFragmentTabParamList>();

function AddFragmentScreenNavigator(props: any) {
  const userData = props.extraData;
  return (
    <AddFragmentScreenStack.Navigator>
      <AddFragmentScreenStack.Screen
        name="TabAddFragmentScreen"
        children={() => <AddFragmentScreen {...props} />}
        options={{ headerTitle: "Add Fragment" }}
      />
    </AddFragmentScreenStack.Navigator>
  );
}
