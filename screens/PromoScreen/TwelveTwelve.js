import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  ProductGrid,
  ProductGridPlaceholder,
  ProductRow,
  ProductRowPlaceholder,
  Title,
} from "../../components";
import { CONFIG, hp } from "../../constants";
import { THEME } from "../../DynamicStyle/style";
import { useStoreTag } from "../../hooks/useStoreTag";
import { useStoreBrand } from "../../hooks/useStoreBrand";
import { useStoreMultiTag } from "../../hooks/useStoreMultiTag";
import { useStoreMultiBrand } from "../../hooks/useStoreMultiBrand";
import { Woo } from "../../API";
const WIDTH = CONFIG.width;
const cat_width = WIDTH > 700 ? 10 : 5;

const TwelveTwelve = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({ title: "12.12" });
  }, []);

  const [techdata, setTechData] = useState({
    loading: true,
    data: [],
  });

  const [tomatoMartPromotion, setTomatoMartPromotions] = useState({
    loading: true,
    data: [],
  });

  const [tomatoBeuaty, setTomatoBeauty] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    //Gadget
    Woo.get(`products?tag=${4861}`)
      .then((res) => {
        console.log("res tech", res.data);
        setTechData({
          loading: false,
          data: res.data,
        });
      })
      .catch((err) => {
        setTechData((previousState) => ({
          ...previousState,
          loading: false,
        }));
      });

    //mart
    Woo.get(`products?tag=${4859}`)
      .then((res) => {
        console.log("mart", res.data);
        setTomatoMartPromotions({
          loading: false,
          data: res.data,
        });
      })
      .catch((err) => {
        setTomatoMartPromotions((previousState) => ({
          ...previousState,
          loading: false,
        }));
      });

    //Beauty
    Woo.get(`products?tag=${4842}`)
      .then((res) => {
        setTomatoBeauty({
          loading: false,
          data: res.data,
        });
      })
      .catch((err) => {
        setTomatoBeauty((previousState) => ({
          ...previousState,
          loading: false,
        }));
      });
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity
        style={[
          styles.banner_wrapper,
          { height: CONFIG.isIos ? 285 : 262, marginTop: 0 },
        ]}
      >
        <Image
          style={styles.banner}
          source={require("../../assets/images/ads/twelve.jpg")}
        />
      </TouchableOpacity>
      {tomatoMartPromotion.loading ? (
        <ProductRowPlaceholder />
      ) : (
        <ProductRow
          products={tomatoMartPromotion.data}
          title="MART PROMOTION"
          onSeeMore={() =>
            navigation.navigate("PromoWithTag", {
              tagId: 4911,
              name: "Tomato Electronic and Mobile & Gadgets",
            })
          }
        />
      )}
      <TouchableOpacity
        style={[styles.banner_wrapper, { height: CONFIG.isIos ? 285 : 262 }]}
      >
        <Image
          style={styles.banner}
          source={require("../../assets/images/ads/banner4.jpg")}
        />
      </TouchableOpacity>
      {tomatoBeuaty.loading ? (
        <ProductRowPlaceholder />
      ) : (
        <ProductRow
          products={tomatoBeuaty.data}
          title="BEAUTY & PERSONAL CARE"
          onSeeMore={() =>
            navigation.navigate("PromoWithTag", {
              tagId: 4911,
              name: "Tomato Electronic and Mobile & Gadgets",
            })
          }
        />
      )}
      <TouchableOpacity
        style={[styles.banner_wrapper, { height: CONFIG.isIos ? 285 : 262 }]}
      >
        <Image
          style={styles.banner}
          source={require("../../assets/images/ads/tech.jpg")}
        />
      </TouchableOpacity>
      {techdata.loading ? (
        <ProductRowPlaceholder />
      ) : (
        <ProductRow
          products={techdata.data}
          title="TECH PROMOTION"
          onSeeMore={() =>
            navigation.navigate("PromoWithTag", {
              tagId: 4911,
              name: "Tomato Electronic and Mobile & Gadgets",
            })
          }
        />
      )}
    </ScrollView>
  );
};

export default TwelveTwelve;

const styles = StyleSheet.create({
  catContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: THEME.card,
    paddingTop: 20,
    paddingBottom: 10,
    // marginBottom: 10
  },
  banner_wrapper: {
    width: "100%",
    height: CONFIG.isIos ? 230 : 205,
    marginVertical: 4,
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  cat_btn: {
    width: WIDTH / cat_width - 20,
    marginBottom: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  cat_view: {
    // borderWidth: 0.5,
    overflow: "hidden",
    // backgroundColor: THEME.card,
    // borderColor: THEME.secondary,
    borderRadius: 10,
    width: WIDTH / cat_width - 24,
    height: 50,
    // justifyContent: "center",
    // alignItems: "center",
  },
  cat_text: {
    textAlign: "center",
    fontSize: 10,
    color: THEME.text_secondary,
    marginTop: 5,
  },
});
