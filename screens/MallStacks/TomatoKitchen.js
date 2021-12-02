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

const cat_logo = hp.getKitchenCat();
const trendingStore = hp.getTomatoTrendingStores();

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;
const promotion_id = 3135;
const chicken_id = 2362;
const pork_id = 2363;
const beef_other_id = 2364;
const fish_seafood_id = 205;
const vegetable_id = 427;
const fruits_id = 206;
const groceries_id = 1095;
const rice_id = 2692;
const noodle_id = 2394;
const diary_id = 2967;
const beer_id = 207;
const snack_id = 2968;
const coffee_id = 2973;
const nutrition_id = 3017;
const sausage_id = 2927;
const frozen_id = 423;

export default function TomatoKitchen({ navigation, route }) {
  const [products, setProducts] = useState(null);
  const [proProducts, setProProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [proLoading, setProLoading] = useState(true);
  const [layouts, setLayouts] = useState([]);
  const {
    data: chicken,
    error: chickenError,
    loading: chickenLoading,
  } = useMall(chicken_id);
  const { data: porkData, error: porkError, loading: porkLoading } = useMall(
    pork_id
  );
  const { data: beefData, error: beefError, loading: beefLoading } = useMall(
    beef_other_id
  );
  const {
    data: fishAndSeadFoodData,
    error: fishAndSeadFoodError,
    loading: fishAndSeadFoodLoading,
  } = useMall(fish_seafood_id);
  const {
    data: vegetableData,
    error: vegetableError,
    loading: vegetableLoading,
  } = useMall(vegetable_id);
  const { data: fruitData, error: fruitError, loading: fruitLoading } = useMall(
    fruits_id
  );
  const {
    data: groceriesData,
    error: groceriesError,
    loading: groceriesLoading,
  } = useMall(groceries_id);
  const { data: riceData, error: riceError, loading: riceLoading } = useMall(
    rice_id
  );

  const {
    data: noodleData,
    error: noodleError,
    loading: noodleLoading,
  } = useMall(noodle_id);

  const { data: diaryData, error: diaryError, loading: diaryLoading } = useMall(
    diary_id
  );

  const { data: beerData, error: beerError, loading: beerLoading } = useMall(
    beer_id,
    "rand"
  );

  const { data: snackData, error: snackError, loading: snackLoading } = useMall(
    snack_id
  );

  const {
    data: coffeeData,
    error: coffeeError,
    loading: coffeeLoading,
  } = useMall(coffee_id);

  const {
    data: nutritionData,
    error: nutritionError,
    loading: nutritionLoading,
  } = useMall(nutrition_id);

  const {
    data: sausageData,
    error: sausageError,
    loading: sausageLoading,
  } = useMall(sausage_id);

  const {
    data: frozenData,
    error: frozenError,
    loading: frozenLoading,
  } = useMall(frozen_id);

  useEffect(() => {
    let source = Axios.CancelToken.source();

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
  const chickenRef = useRef(null);

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
          source={require("../../assets/images/slider/mall2.jpg")}
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  };

  const onSeeMorePress = (type) => {
    let id, name;
    switch (type) {
      case "chicken":
        id = chicken_id;
        name = "Chicken";
        break;

      case "pork":
        id = pork_id;
        name = "Pork";
        break;

      case "beef":
        id = beef_other_id;
        name = "Beef";
        break;

      case "fish":
        id = fish_seafood_id;
        name = "Fish & Seafoods";
        break;

      case "vegetables":
        id = vegetable_id;
        name = "Vegetables";
        break;

      case "fruit":
        id = fruits_id;
        name = "Fruits";
        break;

      case "groceries":
        id = groceries_id;
        name = "Groceries & Kitchen";
        break;

      case "rice":
        id = rice_id;
        name = "Rice";
        break;

      case "noodle":
        id = noodle_id;
        name = "Noodles";
        break;

      case "diary":
        id = diary_id;
        name = "Milk & Diary";
        break;

      case "alcohol":
        id = beer_id;
        name = "Beer & Acohols";
        break;

      case "snack":
        id = snack_id;
        name = "Snacks & Savory";
        break;

      case "coffee":
        id = coffee_id;
        name = "Coffee & Tea";
        break;

      case "nutrition":
        id = nutrition_id;
        name = "Nutrition";
        break;

      case "sausage":
        id = sausage_id;
        name = "Sausage & Chilled";
        break;

      case "frozen_meat":
        id = frozen_id;
        name = "frozen_meat";
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

          {proLoading ? (
            <ProductRowPlaceholder />
          ) : (
            proProducts &&
            proProducts.length > 0 && (
              <View>
                <ProductRow
                  products={proProducts}
                  title="SPECIAL PROMOTIONS"
                  // onSeeMore={() => onSeeMorePress("chicken")}
                />
              </View>
            )
          )}

          {chickenLoading ? (
            <ProductRowPlaceholder />
          ) : (
            chicken &&
            chicken.length > 0 && (
              <View>
                <ProductRow
                  products={chicken}
                  title="CHICKEN"
                  onSeeMore={() => onSeeMorePress("chicken")}
                />
              </View>
            )
          )}

          {porkLoading ? (
            <ProductRowPlaceholder />
          ) : (
            porkData &&
            porkData.length > 0 && (
              <ProductRow
                products={porkData}
                title="PORK"
                onSeeMore={() => onSeeMorePress("pork")}
              />
            )
          )}

          {beefLoading ? (
            <ProductRowPlaceholder />
          ) : (
            beefData &&
            beefData.length > 0 && (
              <ProductRow
                products={beefData}
                title="BEEF & OTHERS MEATS"
                onSeeMore={() => onSeeMorePress("beef")}
              />
            )
          )}

          {fishAndSeadFoodLoading ? (
            <ProductRowPlaceholder />
          ) : (
            fishAndSeadFoodData &&
            fishAndSeadFoodData.length > 0 && (
              <ProductRow
                products={fishAndSeadFoodData}
                title="FISH & SEAFOODS"
                onSeeMore={() => onSeeMorePress("fish")}
              />
            )
          )}

          {vegetableLoading ? (
            <ProductRowPlaceholder />
          ) : (
            vegetableData &&
            vegetableData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 4);
                }}
              >
                <ProductRow
                  products={vegetableData}
                  title="VEGETABLES"
                  onSeeMore={() => onSeeMorePress("vegetables")}
                />
              </View>
            )
          )}

          {fruitLoading ? (
            <ProductRowPlaceholder />
          ) : (
            fruitData &&
            fruitData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 5);
                }}
              >
                <ProductRow
                  products={fruitData}
                  title="FRUITS"
                  onSeeMore={() => onSeeMorePress("fruit")}
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
                  addLayoutAxis(event.nativeEvent.layout.y, 6);
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

          {riceLoading ? (
            <ProductRowPlaceholder />
          ) : (
            riceData &&
            riceData.length > 0 && (
              <ProductRow
                products={riceData}
                title="RICE"
                onSeeMore={() => onSeeMorePress("rice")}
              />
            )
          )}

          {noodleLoading ? (
            <ProductRowPlaceholder />
          ) : (
            noodleData &&
            noodleData.length > 0 && (
              <ProductRow
                products={noodleData}
                title="NOODLES"
                onSeeMore={() => onSeeMorePress("noodle")}
              />
            )
          )}

          {diaryLoading ? (
            <ProductRowPlaceholder />
          ) : (
            diaryData &&
            diaryData.length > 0 && (
              <ProductRow
                products={diaryData}
                title="MILK & DIARY"
                onSeeMore={() => onSeeMorePress("diary")}
              />
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

          {snackLoading ? (
            <ProductRowPlaceholder />
          ) : (
            snackData &&
            snackData.length > 0 && (
              <ProductRow
                products={snackData}
                title="SNACKS & SAVORY"
                onSeeMore={() => onSeeMorePress("snack")}
              />
            )
          )}

          {coffeeLoading ? (
            <ProductRowPlaceholder />
          ) : (
            coffeeData &&
            coffeeData.length > 0 && (
              <ProductRow
                products={coffeeData}
                title="COFFEE & TEA"
                onSeeMore={() => onSeeMorePress("coffee")}
              />
            )
          )}

          {nutritionLoading ? (
            <ProductRowPlaceholder />
          ) : (
            nutritionData &&
            nutritionData.length > 0 && (
              <ProductRow
                products={nutritionData}
                title="NUTRITION"
                onSeeMore={() => onSeeMorePress("nutrition")}
              />
            )
          )}

          {sausageLoading ? (
            <ProductRowPlaceholder />
          ) : (
            sausageData &&
            sausageData.length > 0 && (
              <ProductRow
                products={sausageData}
                title="SAUSAGE & CHILLED"
                onSeeMore={() => onSeeMorePress("sausage")}
              />
            )
          )}

          {frozenLoading ? (
            <ProductRowPlaceholder />
          ) : (
            frozenData &&
            frozenData.length > 0 && (
              <ProductRow
                products={frozenData}
                title="FROZEN MEATS"
                onSeeMore={() => onSeeMorePress("frozen")}
              />
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
                  name="DISCOVER TOMATO KITCHEN"
                  onSeeMorePress={() =>
                    navigation.navigate({
                      name: "CategoryDetail",
                      params: {
                        SCategory: { id: 2335, name: "Popular Tomato Kitchen" },
                      },
                    })
                  }
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
