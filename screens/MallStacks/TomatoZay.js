import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

const WIDTH = CONFIG.width;

import { THEME } from "../../DynamicStyle/style";

import {
  Container,
  ProductGrid,
  Title,
  Header,
  ProductGridPlaceholder,
  ProductRowPlaceholder,
  ProductRow,
  StoreRow,
} from "../../components";
import { hp } from "../../constants/hp";
import { CONFIG } from "../../constants";
import { Woo } from "../../API";
import Axios from "axios";
import { useMall } from "../../hooks/useMall";
import { useFocusEffect } from "@react-navigation/native";

const cat_logo = hp.getZayCat();
const zayStores = hp.getZayStores();

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

const mustId = 3037;
const tomatoKitchenId = 2335;
const readyToEatId = 2972;
const snackId = 2968;
const beverageId = 410;
const beerWineId = 207;
const discoverId = 2368;

export default function TomatoZay({ navigation, route }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  const { data: mustData, error: mustError, loading: mustLoading } = useMall(
    mustId
  );

  const {
    data: tomatoKitchenData,
    error: tomatoKitchenError,
    loading: tomatoKitchenLoading,
  } = useMall(tomatoKitchenId);

  const {
    data: readyToEatData,
    error: readyToEatError,
    loading: readyToEatLoading,
  } = useMall(readyToEatId);

  const { data: snackData, error: snackError, loading: snackLoading } = useMall(
    snackId
  );

  const {
    data: beverageData,
    error: beverageError,
    loading: beverageLoading,
  } = useMall(beverageId);

  const {
    data: beerWineData,
    error: beerWineError,
    loading: beerWineLoading,
  } = useMall(beerWineId, "rand");

  useEffect(() => {
    let source = Axios.CancelToken.source();

    Woo.get(`/mall/zay`, { cancelToken: source.token })
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        if (Axios.isCancel(e)) {
        } else setLoading(false);
      });
    return () => {
      source.cancel();
    };
  }, []);

  const toStore = (id, name) => {
    if (id == 0) return;

    navigation.navigate("Store", { id, name });
  };

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

  const onSeeMorePress = (type) => {
    let id, name;
    switch (type) {
      case "must":
        id = mustId;
        name = "Popular Tomato Zay";
        break;

      case "kitchen":
        id = tomatoKitchenId;
        name = "Tomato Kitchen";
        break;

      case "ready_to_eat":
        id = readyToEatId;
        name = "Ready To Eat";
        break;

      case "snack":
        id = snackId;
        name = "Snacks";
        break;

      case "beverage":
        id = beverageId;
        name = "Beverages";
        break;

      case "wine":
        id = beerWineId;
        name = "BEER & WINE";
        break;

      case "discover_mall":
        id = discoverId;
        name = "Beauty & Personal Care";
        break;

      default:
        return;
    }

    navigation.navigate({
      name: "CategoryDetail",
      params: {
        SCategory: { id, name },
      },
    });
  };

  const renderImage = () => {
    return (
      <View style={{ width: CONFIG.width, height: CONFIG.height * 0.23 }}>
        <Image
          source={require("../../assets/images/slider/mall6.jpg")}
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  };

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Platform.OS === "android" ? "transparent" : THEME.primary }}>
      <View style={{ flex: 1, backgroundColor: THEME.background }}>
        <Header />
        <ScrollView ref={scrollViewRef}>
          {renderImage()}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: THEME.card,
              paddingTop: 20,
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            {cat_logo.map((item, index) => (
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

          {mustLoading ? (
            <ProductRowPlaceholder />
          ) : (
            mustData &&
            mustData.length > 0 && (
              <ProductRow
                products={mustData}
                title="MUST-HAVE ITEMS"
                onSeeMore={() => onSeeMorePress("must")}
              />
            )
          )}
          <View
            onLayout={(event) => {
              addLayoutAxis(event.nativeEvent.layout.y, 3);
            }}
          >
            <StoreRow stores={zayStores} title="BEST SELLING BRANDS" />
          </View>

          {tomatoKitchenLoading ? (
            <ProductRowPlaceholder />
          ) : (
            tomatoKitchenData &&
            tomatoKitchenData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 4);
                }}
              >
                <ProductRow
                  products={tomatoKitchenData}
                  title="TOMATO KITCHEN"
                  onSeeMore={() => onSeeMorePress("kitchen")}
                />
              </View>
            )
          )}

          {readyToEatLoading ? (
            <ProductRowPlaceholder />
          ) : (
            readyToEatData &&
            readyToEatData.length > 0 && (
              <ProductRow
                products={readyToEatData}
                title="READY TO EAT"
                onSeeMore={() => onSeeMorePress("ready_to_eat")}
              />
            )
          )}

          {snackLoading ? (
            <ProductRowPlaceholder />
          ) : (
            snackData &&
            snackData.length > 0 && (
              <ProductRow
                products={snackData}
                title="SNACK"
                onSeeMore={() => onSeeMorePress("snack")}
              />
            )
          )}

          {beverageLoading ? (
            <ProductRowPlaceholder />
          ) : (
            beverageData &&
            beverageData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 5);
                }}
              >
                <ProductRow
                  products={beverageData}
                  title="BEVERAGES"
                  onSeeMore={() => onSeeMorePress("beverage")}
                />
              </View>
            )
          )}

          {beerWineLoading ? (
            <ProductRowPlaceholder />
          ) : (
            beerWineData &&
            beerWineData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 6);
                }}
              >
                <ProductRow
                  products={beerWineData}
                  title="BEER & WINE"
                  onSeeMore={() => onSeeMorePress("wine")}
                />
              </View>
            )
          )}

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
                  name="DISCOVER TOMATO ZAY"
                  onSeeMorePress={() => onSeeMorePress("discover_mall")}
                />
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {products.map((item, index) => (
                    <ProductGrid key={index} product={item} index={index} />
                  ))}
                </View>
              </View>
            )
          )}
        </ScrollView>
      </View>
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
