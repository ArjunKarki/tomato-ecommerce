import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get("window");
export const THEME = {
  primary: "#D92435",
  secondary: "#999999",
  text_primary: "#333",
  text_secondary: "#666",
  light_grey: "#E8EAEC",
  background: "rgb(242, 242, 242)",
  card: "#FFF",
  white: "#FFF",
};

export const TYPO = {
  h1: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
  h3: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  h5: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
  },
};
