import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
export const CONFIG = {
  width: width,
  height: height,
  isIos: Platform.OS == "ios" ? true : false,
};
