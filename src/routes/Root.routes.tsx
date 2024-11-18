import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Register: undefined;

  // Employer
  HomeEmployerScreen: undefined;
  EmployerCreateIdScreen: undefined;
  EmployerExportDataScreen: undefined;

  // Employee
  HomeEmployeeScreen: undefined;
  EmployeeRegisterListScreen: undefined;
  EmployeeReadIdScreen: undefined;

  // Examples
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: "latest" | "top" } | undefined;
};
