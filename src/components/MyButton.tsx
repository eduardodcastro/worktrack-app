import * as React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

import { colors } from "../config/colors";

interface MyButtonProps extends TouchableOpacityProps {
  title: string;
  loadingAuth: boolean;
}

export function MyButton({
  title,
  loadingAuth,
  style,
  ...rest
}: MyButtonProps) {

  return (
    <TouchableOpacity {...rest} style={[styles.button, style]}>
      {loadingAuth ? (
        <ActivityIndicator size={25} color={colors.navyBlue} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 8,
    padding: 20,
  },
  text: {
    fontWeight: "bold",
    color: "yellow",
    fontSize: 16,
  },
});
