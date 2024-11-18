import { Platform, StyleSheet } from "react-native";

import { colors } from "../../config/colors";
import { dimensions, dimensionsHeight } from "../../config/getDimensions";

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
});
