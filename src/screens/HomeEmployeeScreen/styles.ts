import { StyleSheet } from "react-native";

import { colors } from "../../config/colors";
import { dimensions } from "../../config/getDimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.coral,
  },
  containerLogo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    alignItems: "center",
  },
  containerButtonAction: {
    flex: 1,
    paddingHorizontal: "14%",
    paddingTop: 30,
  },
  registerButton: {
    flex: 1,
    borderWidth: 4,
    borderRadius: 12,
    borderColor: colors.pewter,
    marginBottom: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonMarginBottom0: {
    marginBottom: 0,
  },
  registerStart: {
    backgroundColor: colors.tealGreen,
  },
  registerStop: {
    backgroundColor: colors.mistyBlue,
  },
  registerTextTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    color: colors.pewter,
    paddingTop: 15,
    paddingHorizontal: 20,
    textAlign: "justify",
    fontSize: 13,
    lineHeight: 18,
  },
  registerButtonDisabled: {
    backgroundColor: colors.gray
  },
});
