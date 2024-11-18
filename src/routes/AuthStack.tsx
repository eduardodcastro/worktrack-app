import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./Root.routes";
import { colors } from "../config/colors";

import { Welcome } from "../screens/WelcomeScreen";
import { SignIn } from "../screens/SignInScreen";
import { Register } from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        // options={{ headerShown: false }}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navyBlue,
          },
          headerShadowVisible: false, // applied here
          // headerBackTitleVisible: false,
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.navyBlue,
          },
          headerShadowVisible: false, // applied here
          // headerBackTitleVisible: false,
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
