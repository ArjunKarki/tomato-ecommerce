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

const cat_logo = hp.geteElecronicCat();
const electronicStores = hp.getElectronicStores();

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

const hotItemId = 213;
const newArrivalId = 2361;
const mobileGadgetId = 203;
const computerId = 2895;
const homeElectronicId = 213;
const discoverId = 2361;

export default function ElectronicMall({ navigation, route }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  const {
    data: hotItemData,
    error: hotItemError,
    loading: hotItemLoading,
  } = useMall(hotItemId);

  const {
    data: newArrivalData,
    error: newArrivalError,
    loading: newArrivalLoading,
  } = useMall(newArrivalId);

  const {
    data: mobileGadgetData,
    error: mobileGadgetError,
    loading: mobileGadgetLoading,
  } = useMall(mobileGadgetId);

  const {
    data: computerData,
    error: computerError,
    loading: computerLoading,
  } = useMall(computerId);

  const {
    data: homeElectronicData,
    error: homeElectronicError,
    loading: homeElectronicLoading,
  } = useMall(homeElectronicId);

  useEffect(() => {
    let source = Axios.CancelToken.source();
    Woo.get(`/mall/electronic`, { cancelToken: source.token })
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
      case "hot":
        id = hotItemId;
        name = "Mobiles";
        break;

      case "new_arrival":
        id = newArrivalId;
        name = "Popular Electronic Mall";
        break;

      case "mobile_gadget":
        id = mobileGadgetId;
        name = "Mobile & Gadgets";
        break;

      case "computer":
        id = computerId;
        name = "Computer & Laptops";
        break;

      case "home_electronic":
        id = homeElectronicId;
        name = "Home Electronics";
        break;

      case "discover_mall":
        id = discoverId;
        name = "Popular Electronic Mall";
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
          source={require("../../assets/images/slider/mall5.jpg")}
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

          {hotItemLoading ? (
            <ProductRowPlaceholder />
          ) : (
            hotItemData &&
            hotItemData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 2);
                }}
              >
                <ProductRow
                  products={hotItemData}
                  title="HOT ITEMS"
                  onSeeMore={() => onSeeMorePress("hot")}
                />
              </View>
            )
          )}
          <View
            onLayout={(event) => {
              addLayoutAxis(event.nativeEvent.layout.y, 3);
            }}
          >
            <StoreRow stores={electronicStores} title="TOP BRANDS" />
            {/* <Title
            name="TOP BRANDS"
            onSeeMorePress={() => console.log("see more")}
          />

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {electronicStores.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => toStore(item.id, item.name)}
                  key={index}
                  style={styles.t_store(index)}
                >
                  <Image
                    source={item.img}
                    style={styles.t_store_img}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })}
          </View> */}
          </View>

          {newArrivalLoading ? (
            <ProductRowPlaceholder />
          ) : (
            newArrivalData &&
            newArrivalData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 4);
                }}
              >
                <ProductRow
                  products={newArrivalData}
                  title="NEW ARRIVALS"
                  onSeeMore={() => onSeeMorePress("new_arrival")}
                />
              </View>
            )
          )}

          {mobileGadgetLoading ? (
            <ProductRowPlaceholder />
          ) : (
            mobileGadgetData &&
            mobileGadgetData.length > 0 && (
              <ProductRow
                products={mobileGadgetData}
                title="MOBILE & GADGETS"
                onSeeMore={() => onSeeMorePress("mobile_gadget")}
              />
            )
          )}

          {computerLoading ? (
            <ProductRowPlaceholder />
          ) : (
            computerData &&
            computerData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 5);
                }}
              >
                <ProductRow
                  products={computerData}
                  title="COMPUTER & LAPTOPS"
                  onSeeMore={() => onSeeMorePress("computer")}
                />
              </View>
            )
          )}

          {homeElectronicLoading ? (
            <ProductRowPlaceholder />
          ) : (
            homeElectronicData &&
            homeElectronicData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 6);
                }}
              >
                <ProductRow
                  products={homeElectronicData}
                  title="HOME ELECTRONICS"
                  onSeeMore={() => onSeeMorePress("home_electronic")}
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
                  name="DISCOVER ELECTRONIC MALL"
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
