import React, { useState, useEffect, useCallback, useRef } from "react";

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Modal,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

const WIDTH = CONFIG.width;

import { THEME } from "../../DynamicStyle/style";

import {
  Container,
  Slider,
  ProductGrid,
  Title,
  ProductCard,
  Header,
  StorePlaceholder,
  ProductGridPlaceholder,
  StoreRow,
  FlashDeal,
  ProductRowPlaceholder,
  ProductRow,
} from "../../components";
import { hp } from "../../constants/hp";
import { CONFIG } from "../../constants";
import { Woo } from "../../API";
import Axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, shallowEqual } from "react-redux";
import { useMall } from "../../hooks/useMall";

const logo = hp.getStoreCatIcon();
const trendingStore = hp.getHomeOfficialStores();
const beautyStores = hp.getBeautyStores();
const foodAndBeveragesStores = hp.getFoodAndVeveragesStores();
const techStores = hp.getTechStores();
const electronicStores = hp.getElectronicStores();
const kidsStores = hp.getKidsStores();
const fashionStores = hp.getFashionStores();
const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

export default function Mall({ navigation, route }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [layouts, setLayouts] = useState([]);
  let scrollViewRef = useRef(null);
  //tomato mart
  const {
    data: tomatoMartData,
    error: tomatoMartDataError,
    loading: tomatoMartLoading,
  } = useMall(232);

  const { flashDeals } = useSelector((state) => state.product, shallowEqual);

  useEffect(() => {
    let source = Axios.CancelToken.source();
    Woo.get(`/products?per_page=18`, { cancelToken: source.token })
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        if (Axios.isCancel()) {
        } else setLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, []);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  const toCategory = (index) => {
    if (layouts[index]) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: layouts[index] - 60, //reduce header size as header is blocking the section
        animated: true,
      });
    }
  };

  const addLayoutAxis = (y, i) => {
    let _newArr = [...layouts];
    _newArr[i] = y;
    setLayouts(_newArr);
  };

  const toStore = (id, name) => {
    if (id == 0) return;

    navigation.navigate("Store", { id, name });
  };

  // const toCategory = useCallback(
  //   (item) => {
  //     if (item.name === "Flash Deals") {
  //       if (flashDeals?.expired_date) {
  //         navigation.navigate("CategoryDetail", {
  //           SCategory: { name: "Flash Deals" },
  //           countDown: {
  //             expired_date: Math.floor(
  //               (new Date(flashDeals.expired_date) - new Date()) / 1000
  //             )
  //               ? Math.floor(
  //                   (new Date(flashDeals.expired_date) - new Date()) / 1000
  //                 )
  //               : 0,
  //           },
  //         });
  //       }
  //       return;
  //     }

  //     if (item.route) {
  //       navigation.navigate(item.route);
  //     }
  //   },
  //   [flashDeals?.expired_date]
  // );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <Header />
      <ScrollView
        ref={scrollViewRef}
        style={{ backgroundColor: THEME.background }}
      >
        <Slider />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            backgroundColor: THEME.card,
            paddingTop: 20,
            paddingBottom: 10,
            marginBottom: 6,
          }}
        >
          {logo.map((item, index) => (
            <TouchableOpacity
              onPress={() => toCategory(index)}
              key={index}
              style={styles.cat_btn}
            >
              <View style={styles.cat_view}>
                <Image
                  source={item.logo}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </View>
              <Text numberOfLines={2} style={styles.cat_text}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          onLayout={(event) => {
            addLayoutAxis(event.nativeEvent.layout.y, 0);
          }}
        >
          <ProductRow
            products={flashDeals.data}
            title="FLASH DEALS"
            onSeeMore={() => onSeeMorePress("flashdeal")}
          />
        </View>
        <View
          onLayout={(event) => {
            addLayoutAxis(event.nativeEvent.layout.y, 1);
          }}
        >
          <StoreRow stores={trendingStore} title="TRENDING OFFICIAL STORES" />
        </View>

        <View
          onLayout={(event) => {
            addLayoutAxis(event.nativeEvent.layout.y, 2);
          }}
        >
          {tomatoMartLoading ? (
            <ProductRowPlaceholder />
          ) : (
            tomatoMartData &&
            tomatoMartData.length > 0 && (
              <ProductRow products={tomatoMartData} title="TOMATO MART" />
            )
          )}
        </View>

        <View
          onLayout={(event) => {
            addLayoutAxis(event.nativeEvent.layout.y, 3);
          }}
        >
          <StoreRow stores={beautyStores} title="BEAUTY STORES" />
        </View>
        <View
          onLayout={(event) => {
            addLayoutAxis(event.nativeEvent.layout.y, 4);
          }}
        >
          <StoreRow
            stores={foodAndBeveragesStores}
            title="FOOD & BEVERAGES STORES"
          />
        </View>
        <View
          onLayout={(event) => {
            addLayoutAxis(event.nativeEvent.layout.y, 5);
          }}
        >
          <StoreRow stores={techStores} title="TECH STORES" />
        </View>

        <View
          onLayout={(event) => {
            addLayoutAxis(event.nativeEvent.layout.y, 6);
          }}
        >
          <StoreRow stores={electronicStores} title="ELECTRONIC STORES" />
        </View>

        <View
          onLayout={(event) => {
            addLayoutAxis(event.nativeEvent.layout.y, 7);
          }}
        >
          <StoreRow stores={kidsStores} title="KIDS STORES" />
        </View>

        <View
          onLayout={(event) => {
            addLayoutAxis(event.nativeEvent.layout.y, 8);
          }}
        >
          <StoreRow stores={fashionStores} title="FASHIONS STORES" />
        </View>

        {loading ? (
          <ProductGridPlaceholder />
        ) : (
          products && (
            <View
              onLayout={(event) => {
                addLayoutAxis(event.nativeEvent.layout.y, 9);
              }}
              style={{ marginBottom: 14, paddingHorizontal: 8 }}
            >
              <Title
                name="DISCOVER TOMATO MALLS"
                onSeeMorePress={() =>
                  navigation.navigate({
                    name: "CategoryDetail",
                    params: {
                      SCategory: { id: 2335, name: "Popular products" },
                    },
                  })
                }
              />
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {products.map((item, index) => {
                  return item.price > 0 ? (
                    <ProductGrid
                      key={index.toString()}
                      product={{
                        ...item,
                        images: item.images.map((img) => img.src),
                      }}
                      index={index}
                    />
                  ) : null;
                })}
              </View>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  t_store: (index) => {
    return {
      padding: 10,
      borderWidth: 0.5,
      borderColor: THEME.text_secondary,
      marginRight:
        hori_width == 3
          ? index == 2 || index == 5
            ? 0
            : 10
          : index == 6
          ? 0
          : 10,
      marginTop: 10,
      marginBottom: 5,
      width: WIDTH / hori_width - 12,
      height: 120,
      justifyContent: "center",
      alignItems: "center",
    };
  },
  t_store_img: { width: "100%", height: "100%" },
});
