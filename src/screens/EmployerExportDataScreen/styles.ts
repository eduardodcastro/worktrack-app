import { StyleSheet } from "react-native";

import { colors } from "../../config/colors";
import { dimensions } from "../../config/getDimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueGrotto,
  },
  containerLogo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    alignItems: "center",
  },
  containerList: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: 30,
  },
});
