import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export function dimensions(value: number) {
  const size = (value * width) / 100;
  return size;
}

export function dimensionsHeight(value: number) {
  const size = (value * height) / 100;
  return size;
}