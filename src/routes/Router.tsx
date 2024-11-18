import React, { useContext } from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../config/colors";

import { AuthStack } from "./AuthStack";
import { TypeUserStack } from "./TypeUserStack";

import { AuthContext } from "../contexts/AuthContext";

export function Router() {

  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.babyBlue} />
      </View>
    );
  }

  return (
    isAuthenticated ? <TypeUserStack /> : <AuthStack />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navyBlue,
    justifyContent: "center",
    alignItems: "center",
  },
});
