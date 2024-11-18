import * as React from "react";
import { StatusBar } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RootStackParamList } from "./Root.routes";

import { Ionicons } from "@expo/vector-icons";

import { HomeEmployeeScreen } from "../screens/HomeEmployeeScreen";
import { EmployeeRegisterListScreen } from "../screens/EmployeeRegisterListScreen";
import { EmployeeReadIdScreen } from "../screens/EmployeeReadIdScreen";
import { colors } from "../config/colors";

const Tab = createBottomTabNavigator<RootStackParamList>();

export function EmployeeUser() {
  return (
    <>
      <StatusBar
        backgroundColor={colors.coral}
        barStyle={"light-content"}
        translucent={false}
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: colors.ivory,
            borderTopWidth: 0,
          },

          tabBarActiveTintColor: colors.mistyBlue,
        }}
      >
        <Tab.Screen
          name="EmployeeRegisterListScreen"
          component={EmployeeRegisterListScreen}
          options={{
            title: "",
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
              if (focused) {
                return <Ionicons name="list" size={size} color={color} />;
              }

              return <Ionicons name="list-outline" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="HomeEmployeeScreen"
          component={HomeEmployeeScreen}
          options={{
            title: "",
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
              if (focused) {
                return <Ionicons name="add-circle" size={size} color={color} />;
              }

              return (
                <Ionicons name="add-circle-outline" size={size} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="EmployeeReadIdScreen"
          component={EmployeeReadIdScreen}
          options={{
            title: "",
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
              if (focused) {
                return <Ionicons name="qr-code" size={size} color={color} />;
              }

              return (
                <Ionicons name="qr-code-outline" size={size} color={color} />
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}
