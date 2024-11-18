import { Image, StyleSheet } from "react-native";

import { dimensions } from "../config/getDimensions";

export function LogoEmployee() {
  return (
    <Image
      source={require("../assets/img/logo-employee.png")}
      style={styles.imageLogo}
      resizeMode="contain"
    />
  );
}

export const styles = StyleSheet.create({
  imageLogo: {
    width: dimensions(44),
    height: 40,
  },
});

// import { Image, StyleSheet } from "react-native";

// import { dimensions } from "../config/getDimensions";

// export function Logo(
//   whichLogo: string,
//   widthLogoProps: number,
//   heightLogoProps: number
// ) {
//   return (
//     <Image
//       source={require(`../../assets/img/${whichLogo}`)}
//       style={styles(widthLogoProps, heightLogoProps).imageLogo}
//       resizeMode="contain"
//     />
//   );
// }

// export const styles = (widthLogo: number, heightLogo: number) =>
//   StyleSheet.create({
//     imageLogo: {
//       width: dimensions(widthLogo),
//       height: heightLogo,
//     },
//   });
