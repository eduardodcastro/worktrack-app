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
    flex: 1,
    backgroundColor: colors.babyBlue,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingTop: '5%',
    paddingEnd: '5%',
  },
  textTitle: {
    fontSize: 18,
    color: colors.navyBlue,
    fontWeight: 'bold',
  },
  textTitleTop: {
    marginBottom: 14,
  },
  textDescription: {
    fontSize: 14,
    marginBottom: 18,
    lineHeight: 18,
  },
  textLogin: {
    color: colors.blueGrotto,
  },
  button: {
    position: 'absolute',
    backgroundColor: colors.blueGrotto,
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: colors.babyBlue,
    fontWeight: 'bold',
  },
});
