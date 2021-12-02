import React, { useState, useEffect, useRef } from "react";
import ReactNative, {
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
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import {
  Container,
  Slider,
  ProductGrid,
  Title,
  ProductCard,
  Header,
  StorePlaceholder,
  ProductGridPlaceholder,
  CatIconPlaceholder,
  ProductRowPlaceholder,
  ProductRow,
} from "../../components";
import { hp } from "../../constants/hp";
import { CONFIG } from "../../constants";
import { Woo } from "../../API";
import { FlatList } from "react-native-gesture-handler";
import Axios from "axios";
import { useMall } from "../../hooks/useMall";
import { useFocusEffect } from "@react-navigation/native";

const cat_logo = hp.getMartCat();
const trendingStore = hp.getTomatoTrendingStores();

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

const promotion_id = 3135;
const drink_beverages_id = 204;
const hot_items = 3131;
const groceries_id = 1095;
const snack_id = 2968;
const kitchen_essentials_id = 1095;
const beer_id = 207;
const discover_mall = 232;

export default function TomatoMart({ navigation, route }) {
  const [products, setProducts] = useState(null);
  const [proProducts, setProProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [proLoading, setProLoading] = useState(true);
  const [layouts, setLayouts] = useState([]);
  const [flashDealData, setFlashDealData] = useState([]);
  const [flashLoading, setFlashLoading] = useState(true);

  const {
    data: groceriesData,
    error: groceriesError,
    loading: groceriesLoading,
  } = useMall(groceries_id);

  const { data: beerData, error: beerError, loading: beerLoading } = useMall(
    beer_id,
    "rand"
  );

  const { data: snackData, error: snackError, loading: snackLoading } = useMall(
    snack_id,
    "rand"
  );

  const {
    data: drinkBeverageData,
    error: drinkBeverageError,
    loading: drinkBeverageLoading,
  } = useMall(drink_beverages_id);

  const {
    data: kitchenEssentialData,
    error: kitchenEssentialError,
    loading: kitchenEssentialLoading,
  } = useMall(kitchen_essentials_id);

  const {
    data: discoverMallData,
    error: discoverMallError,
    loading: discoverMallLoading,
  } = useMall(discover_mall);

  useEffect(() => {
    let source = Axios.CancelToken.source();

    //flashdeals
    Woo.get(`products`, {
      params: {
        on_sale: true,
        per_page: 100,
        // featured: true,
      },
    })
      .then(({ data }) => {
        setFlashDealData(data);
        setFlashLoading(false);
      })
      .catch((e) => {
        setFlashLoading(false);
      });

    Woo.get(`/products?tag=${promotion_id}`)
      .then(({ data }) => {
        setProProducts(data);
        setProLoading(false);
      })
      .catch((e) => setProLoading(false));

    Woo.get(`/mall/kitchen`, { cancelToken: source.token })
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        if (Axios.isCancel(e)) {
        } else {
          setLoading(false);
        }
      });
    return () => {
      source.cancel();
    };
  }, []);

  const toStore = (id, name) => {
    if (id == 0) return;

    navigation.navigate("Store", { id, name });
  };

  const scrollViewRef = useRef(null);

  const toCategory = (index) => {
    if (layouts[index]) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: layouts[index] - 60, //reduce header size as header is blocking the section
        animated: true,
      });
    }
  };

  const SliderPlaceholder = () => {
    return (
      <Placeholder Animation={Fade}>
        <PlaceholderLine
          height={200}
          style={{ borderRadius: 0, marginBottom: 0 }}
        />
      </Placeholder>
    );
  };

  const renderImage = () => {
    return (
      <View style={{ width: CONFIG.width, height: CONFIG.height * 0.23 }}>
        <Image
          source={require("../../assets/images/slider/mall8.jpg")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  };

  const onSeeMorePress = (type) => {
    let id, name;
    switch (type) {
      case "flashdeal":
        name = "Flash Deals";
        break;

      case "promotion":
        id = promotion_id;
        name = "Tomato Mart Promotions";
        break;

      case "drink_beverage":
        id = drink_beverages_id;
        name = "Beverage & Juices";
        break;

      case "groceries":
        id = groceries_id;
        name = "Groceries & Cooking";
        break;

      case "snack":
        id = snack_id;
        name = "Snacks & Savory";
        break;

      case "kitchen_essentials":
        id = kitchen_essentials_id;
        name = "Kitchen Essentials";
        break;

      case "alcohol":
        id = beer_id;
        name = "Beer & Acohols";
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

  const addLayoutAxis = (y, i) => {
    let _newArr = [...layouts];
    _newArr[i] = y;
    setLayouts(_newArr);
  };

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
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
          {flashLoading ? (
            <ProductRowPlaceholder />
          ) : (
            flashDealData &&
            flashDealData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 0);
                }}
              >
                <ProductRow
                  products={flashDealData}
                  title="FLASH DEALS"
                  onSeeMore={() => onSeeMorePress("flashdeal")}
                />
              </View>
            )
          )}
          {proLoading ? (
            <ProductRowPlaceholder />
          ) : (
            proProducts &&
            proProducts.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 1);
                }}
              >
                <ProductRow
                  products={proProducts}
                  title="PROMOTIONS ITEMS"
                  onSeeMore={() => onSeeMorePress("promotion")}
                />
              </View>
            )
          )}
          {drinkBeverageLoading ? (
            <ProductRowPlaceholder />
          ) : (
            drinkBeverageData &&
            drinkBeverageData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 3);
                }}
              >
                <ProductRow
                  products={drinkBeverageData}
                  title="DRINK & BEVERAGES"
                  onSeeMore={() => onSeeMorePress("drink_beverage")}
                />
              </View>
            )
          )}
          {groceriesLoading ? (
            <ProductRowPlaceholder />
          ) : (
            groceriesData &&
            groceriesData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 4);
                }}
              >
                <ProductRow
                  products={groceriesData}
                  title="GROCERIES & KITCHEN"
                  onSeeMore={() => onSeeMorePress("groceries")}
                />
              </View>
            )
          )}
          {snackLoading ? (
            <ProductRowPlaceholder />
          ) : (
            snackData &&
            snackData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 5);
                }}
              >
                <ProductRow
                  products={snackData}
                  title="SNACKS"
                  onSeeMore={() => onSeeMorePress("snack")}
                />
              </View>
            )
          )}
          {kitchenEssentialLoading ? (
            <ProductRowPlaceholder />
          ) : (
            kitchenEssentialData &&
            kitchenEssentialData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 6);
                }}
              >
                <ProductRow
                  products={kitchenEssentialData}
                  title="KITCHEN ESSENTIALS"
                  onSeeMore={() => onSeeMorePress("kitchen_essentials")}
                />
              </View>
            )
          )}
          {beerLoading ? (
            <ProductRowPlaceholder />
          ) : (
            beerData &&
            beerData.length > 0 && (
              <View
                onLayout={(event) => {
                  //pass view's y axis and index of the category
                  addLayoutAxis(event.nativeEvent.layout.y, 7);
                }}
              >
                <ProductRow
                  products={beerData}
                  title="BEER & ALCOHOLS"
                  onSeeMore={() => onSeeMorePress("alcohol")}
                />
              </View>
            )
          )}
          {discoverMallLoading ? (
            <ProductGridPlaceholder />
          ) : (
            discoverMallData &&
            discoverMallData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 9);
                }}
                style={{ marginBottom: 14, paddingHorizontal: 8 }}
              >
                <Title
                  name="DISCOVER MALL"
                  onSeeMorePress={() =>
                    navigation.navigate({
                      name: "CategoryDetail",
                      params: {
                        SCategory: {
                          id: discover_mall,
                          name: "Popular Tomato Kitchen",
                        },
                      },
                    })
                  }
                />
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {discoverMallData.map((item, index) => (
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
