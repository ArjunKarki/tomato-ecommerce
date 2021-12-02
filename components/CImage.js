import React from "react";
import { Image } from "react-native-expo-image-cache";
import { CONFIG } from "../constants";
const hori_width = CONFIG.width > 700 ? 4.5 : 2.5;
import placeholder from "../assets/images/placeholder.jpg";
//accept array coz we are geting product imaages in array.
const CImage = ({ imgUrl }) => {
  const preview = {
    uri:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
  };
  const uri =
    imgUrl.length > 0
      ? imgUrl[0]
      : "https://tomato.com.mm/wp-content/uploads/2020/06/gsr_1593405295.png";

  return (
    <Image
      tint="light"
      resizeMode="contain"
      {...{ uri, preview }}
      style={{
        width: "100%",
        height: "100%",
        // aspectRatio: 1,
        alignSelf: "center",
      }}
    />
  );
};

export default CImage;
