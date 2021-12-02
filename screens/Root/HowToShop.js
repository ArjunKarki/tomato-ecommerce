import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { CONFIG } from "../../constants";

const HowToShop = () => {
  const images = [
    require("../../assets/images/appGuide/one.jpg"),
    require("../../assets/images/appGuide/two.jpg"),
    require("../../assets/images/appGuide/three.jpg"),
    require("../../assets/images/appGuide/four.jpg"),
  ];
  return (
    <ScrollView>
      {images.map((item, index) => (
        <Image
          resizeMode="contain"
          source={item}
          key={index}
          style={{
            width: CONFIG.width,
            height: CONFIG.height * 0.5,
            marginVertical: 6,
          }}
        />
      ))}
    </ScrollView>
  );
};

export default HowToShop;
