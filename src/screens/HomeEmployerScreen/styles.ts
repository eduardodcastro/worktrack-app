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
  cardDate: {
    borderLeftColor: colors.blueGreen,
    borderLeftWidth: 5,
    backgroundColor: colors.ivory,
    padding: 10,
    marginBottom: 14,
    borderRadius: 4,
  },
  cardDateInternal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDateInternalFlex: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateEntrance: {
    fontSize: 16,
    color: colors.gray,
    paddingLeft: 4,
  },
  dateExit: {
    borderLeftColor: colors.navyBlue,
  },
  userIconEmployer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
  },
  userNameEmployer: {
    paddingLeft: 4,
    fontSize: 12,
    color: colors.gray,
  },
  containerMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: dimensions(4),
  },
  messageAreaTxt: {
    color: colors.ivory,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  exportButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: colors.navyBlue,
  },
  exportButtonText: {
    fontSize: 18,
    color: colors.babyBlue,
    textAlign: "center",
    fontWeight: "500",
  },
});
