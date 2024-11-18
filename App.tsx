import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { Router } from "./src/routes/Router";

import { AuthProvider } from "./src/contexts/AuthContext";
import { colors } from "./src/config/colors";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          backgroundColor={colors.navyBlue}
          barStyle={"light-content"}
          translucent={false}
        />
        <Router />
      </AuthProvider>
    </NavigationContainer>
  );
}
