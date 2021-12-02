import React, { useState } from "react";
import Swiper from "react-native-swiper";
import { Image, View, TouchableWithoutFeedback } from "react-native";
import { CONFIG } from "../constants/config";
import { THEME } from "../DynamicStyle/style";
import { hp } from "../constants/hp";
import { Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

const mall_slider = hp.getMallSlider();
const home_slider = hp.getHomeSlider();
const store_slider = hp.getStoreSlider();
export default Slider = ({ type }) => {
  const height = CONFIG.height * 0.3;
  const slider = type == "Home" ? home_slider : store_slider;
  const [sliderHeight, setSliderHeight] = useState(null);
  const navigation = useNavigation();

  const onSliderPress = (item) => {
    if (item.route) {
      console.log(item.route);
      navigation.navigate(item.route.route, { ...item.route.params });
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View style={{ paddingHorizontal: 0 }}>
      <Swiper
        dotColor="white"
        activeDotColor={THEME.primary}
        autoplay={true}
        autoplayTimeout={3}
        height={
          type == "Home"
            ? sliderHeight
              ? sliderHeight
              : height
            : CONFIG.height * 0.23
        }
      >
        {slider.map((item, index) => (
          <TouchableWithoutFeedback
            onPress={() => onSliderPress(item)}
            key={index}
            style={{ width: CONFIG.width, height: "100%" }}
          >
            <Image
              source={item.img}
              style={{ width: "100%", height: "100%" }}
              resizeMode="stretch"
              onLayout={({ nativeEvent }) => {
                let _tmpHeight = Math.floor(
                  (CONFIG.width * nativeEvent.layout.height) /
                    nativeEvent.layout.width
                );
                setSliderHeight(_tmpHeight);
              }}
            />
          </TouchableWithoutFeedback>
        ))}
      </Swiper>
    </View>
  );
};
