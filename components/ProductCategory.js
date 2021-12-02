import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import { THEME } from "../DynamicStyle/style";
import { hp } from "../constants/hp";
import { CONFIG } from "../constants/config";
import Title from "./Title";
import Icon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const cat_width = CONFIG.width > 700 ? 6 : 3;
import placeholder from "../assets/images/placeholder.jpg";
import Swiper from "react-native-swiper";
import CImage from "./CImage";

const ProductCategory = ({ categories }) => {
  let mRight = 0;
  let cat_slider = [];
  let cat = [];
  let _cat_name = "";

  for (let i = 0; i < categories.length; i++) {
    const _cat_name = categories[i].name.replace("&amp;", "and");
    const catImage = categories[i].image
      ? { uri: categories[i].image }
      : placeholder;
    if (cat_width == 3) mRight = (i + 1) % 3 == 0 ? 0 : 5;
    else {
      mRight = (i + 1) % 5 == 0 ? 0 : 5;
    }

    cat.push(
      <TouchableOpacity
        onPress={() =>
          navigation.navigate({
            name: "CategoryDetail",
            params: {
              SCategory: { id: categories[i].id, name: _cat_name },
            },
          })
        }
        style={{
          backgroundColor: THEME.card,
          width: CONFIG.width / cat_width - 9,
          alignItems: "center",
          marginBottom: 5,
          marginRight: mRight,
        }}
        key={i}
      >
        <View style={{ width: "100%", height: 110 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={catImage}
          />
        </View>
        <View style={{ padding: 4 }}>
          <Text numberOfLines={2} style={{ textAlign: "center" }}>
            {_cat_name}
          </Text>
        </View>
      </TouchableOpacity>
    );

    if (i == 5 || i == 11) {
      cat_slider.push(
        <View
          key={i}
          style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}
        >
          {cat}
        </View>
      );
      cat = [];
    }
  }

  const navigation = useNavigation();

  return (
    <View style={{ paddingHorizontal: 8 }}>
      <Title
        name="CATEGORIES"
        onSeeMorePress={() => navigation.navigate("CategoryTab")}
      />
      <Swiper
        dotColor="white"
        nextButton={
          <View style={Styles.slider_controller}>
            <Icon size={25} name="ios-arrow-forward" color={THEME.secondary} />
          </View>
        }
        prevButton={
          <View style={Styles.slider_controller}>
            <Icon size={25} name="ios-arrow-back" color={THEME.secondary} />
          </View>
        }
        renderPagination={() => null}
        showsButtons
        activeDotColor={THEME.primary}
        autoplay={false}
        autoplayTimeout={3}
        height={330}
      >
        {cat_slider}
      </Swiper>
    </View>
  );
};

export default ProductCategory;

const Styles = StyleSheet.create({
  boldText: {
    color: THEME.primary,
    fontWeight: "bold",
  },
  slider_controller: {
    borderWidth: 0.6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
