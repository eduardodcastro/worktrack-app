import { StyleSheet } from "react-native";

import { colors } from "../../config/colors";
import { dimensions } from "../../config/getDimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navyBlue,
  },
  containerLogo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLogo: {
    width: dimensions(70),
    height: 290,
  },
  containerForm: {
    flex: 2,
    backgroundColor: colors.babyBlue,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingTop: "5%",
    paddingEnd: "5%",
  },
  textTitle: {
    fontSize: 20,
    color: colors.navyBlue,
    fontWeight: "bold",
    marginBottom: 18,
  },
  labelInput: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.blueGrotto,
  },
  input: {
    backgroundColor: colors.blueGrottoA2,
    height: 40,
    borderRadius: 4,
    marginBottom: 18,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.blueGrotto,
  },
  inputDisabled: {
    backgroundColor: colors.blueGrotto,
  },
  button: {
    backgroundColor: colors.blueGrotto,
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 46,
  },
  textButton: {
    color: colors.babyBlue,
    fontWeight: "bold",
    fontSize: 18,
  },
  containerRole: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  buttonRole: {
    backgroundColor: colors.blueGreen,
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    height: 46,
  },
  buttonRoleDisabled: {
    backgroundColor: colors.blueGrottoA2,
  },
  textRole: {
    color: colors.navyBlue,
    fontWeight: "bold",
    fontSize: 16,
  },
  textRoleDisabled: {
    color: colors.navyBlueA2,
  },
});
