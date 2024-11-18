import * as React from "react";

import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RootStackParamList } from "./Root.routes";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from "../config/colors";

import { HomeEmployerScreen } from "../screens/HomeEmployerScreen";
import { EmployerCreateIdScreen } from "../screens/EmployerCreateIdScreen";
import { EmployerExportDataScreen } from "../screens/EmployerExportDataScreen";

const Tab = createBottomTabNavigator<RootStackParamList>();

export function EmployerUser() {
  return (
    <>
      <StatusBar
        backgroundColor={colors.blueGrotto}
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
          name="HomeEmployerScreen"
          component={HomeEmployerScreen}
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
        
        {/* <Tab.Screen
          name="EmployerExportDataScreen"
          component={EmployerExportDataScreen}
          options={{
            title: "",
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
              if (focused) {
                return <MaterialCommunityIcons name="file-export" size={size} color={color} />;
              }

              return (
                <MaterialCommunityIcons name="file-export-outline" size={size} color={color} />
              );
            },
          }}
        /> */}
        
        <Tab.Screen
          name="EmployerCreateIdScreen"
          component={EmployerCreateIdScreen}
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
