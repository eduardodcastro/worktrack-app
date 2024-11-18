import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/colors";

export function SignOut() {
  const { signOut } = useContext(AuthContext);

  return (
    <TouchableOpacity style={styles.exitButton} onPress={signOut}>
      <Ionicons name="exit-outline" size={24} color={colors.pewter} />
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  exitButton: {
    paddingRight: 15,
  },
});
