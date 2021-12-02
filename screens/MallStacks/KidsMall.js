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

const cat_logo = hp.getKidsCat();
const kidStores = hp.getKidsStores();

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

const recommendedId = 2369;
const flashdealId = 210;
const newArrivalId = 2369;
const diaperId = 2862;
const nutritionId = 2894;
const bathBodyId = 2876;
const apparelId = 2888;
const furnitureId = 2881;
const shoesId = 2891;
const toddlerId = 476;
const educationalToyId = 473;
const bagId = 483;
const discoverId = 2369;

export default function KidsMall({ navigation, route }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flashLoading, setFlashLoading] = useState(true);
  const [flashDealData, setFlashDealData] = useState([]);
  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  const {
    data: recommendedData,
    error: recommendedError,
    loading: recommendedLoading,
  } = useMall(recommendedId);

  const {
    data: newArrivalData,
    error: newArrivalError,
    loading: newArrivalLoading,
  } = useMall(newArrivalId);

  const {
    data: diaperData,
    error: diaperError,
    loading: diaperLoading,
  } = useMall(diaperId);

  const {
    data: nutritionData,
    error: nutritionError,
    loading: nutritionLoading,
  } = useMall(nutritionId);

  const {
    data: bathBodyData,
    error: bathBodyError,
    loading: bathBodyLoading,
  } = useMall(bathBodyId);

  const { data: shoesData, error: shoesError, loading: shoesLoading } = useMall(
    shoesId
  );

  const {
    data: apparelData,
    error: apparelError,
    loading: apparelLoading,
  } = useMall(apparelId, "rand");

  const {
    data: toddlerData,
    error: toddlerError,
    loading: toddlerLoading,
  } = useMall(toddlerId);

  const {
    data: furnitureData,
    error: furnitureError,
    loading: furnitureLoading,
  } = useMall(furnitureId);

  const {
    data: educationalToyData,
    error: educationalToyError,
    loading: educationalToyLoading,
  } = useMall(educationalToyId, "rand");

  const { data: bagData, error: bagDataError, loading: bagLoading } = useMall(
    bagId,
    "rand"
  );

  useEffect(() => {
    let source = Axios.CancelToken.source();

    //flashdeals
    Woo.get(`flashdeals/${flashdealId}`)
      .then(({ data }) => {
        setFlashDealData(data);
        setFlashLoading(false);
      })
      .catch((e) => {
        setFlashLoading(false);
      });

    Woo.get(`/mall/kids`, { cancelToken: source.token })
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        if (Axios.isCancel) {
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
      case "flashdeal":
        id = flashdealId;
        name = "Kids Mall Flash Deals";
        break;

      case "recommended":
        id = recommendedId;
        name = "Kids & Babies";
        break;

      case "new_arrival":
        id = newArrivalId;
        name = "Popular Kids Mall";
        break;

      case "diaper":
        id = diaperId;
        name = "Diaper & Potties";
        break;

      case "nutrition":
        id = nutritionId;
        name = "Nutrition & Milk Formula";
        break;

      case "bath_body":
        id = bathBodyId;
        name = "Kid Bath & Body Card";
        break;

      case "shoes":
        id = shoesId;
        name = "Baby & Kids Shoes";
        break;

      case "apparel":
        id = apparelId;
        name = "Kid Apparels";

        break;

      case "toddler":
        id = toddlerId;
        name = "Baby & Toddler Apprels";
        break;

      case "furniture":
        id = furnitureId;
        name = "Baby Furniture";
        break;

      case "toy":
        id = educationalToyId;
        name = "Kid Educational Toys";
        break;

      case "bag":
        id = bagId;
        name = "Kids Bags & Accessories";
        break;

      case "discover_mall":
        id = discoverId;
        name = "Popular Kids Mall";
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
          source={require("../../assets/images/slider/mall3.jpg")}
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

          {flashLoading ? (
            <ProductRowPlaceholder />
          ) : (
            flashDealData &&
            flashDealData.length > 0 && (
              <View>
                <ProductRow
                  products={flashDealData}
                  title="FLASH DEALS"
                  onSeeMore={() => onSeeMorePress("flashdeal")}
                />
              </View>
            )
          )}
          <View
            onLayout={(event) => {
              addLayoutAxis(event.nativeEvent.layout.y, 3);
            }}
          >
            <StoreRow stores={kidStores} title="TOP BRANDS" />
            {/* <Title
            name="TOP BRANDS"
            onSeeMorePress={() => console.log("see more")}
          />

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {kidStores.map((item, index) => {
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

          {recommendedLoading ? (
            <ProductRowPlaceholder />
          ) : (
            recommendedData &&
            recommendedData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 2);
                }}
              >
                <ProductRow
                  products={recommendedData}
                  title="RECOMMENDED"
                  onSeeMore={() => onSeeMorePress("recommended")}
                />
              </View>
            )
          )}

          {newArrivalLoading ? (
            <ProductRowPlaceholder />
          ) : (
            newArrivalData &&
            newArrivalData.length > 0 && (
              <ProductRow
                products={newArrivalData}
                title="NEW ARRIVALS"
                onSeeMore={() => onSeeMorePress("new_arrival")}
              />
            )
          )}

          {diaperLoading ? (
            <ProductRowPlaceholder />
          ) : (
            diaperData &&
            diaperData.length > 0 && (
              <ProductRow
                products={diaperData}
                title="DIAPER & POTTIES"
                onSeeMore={() => onSeeMorePress("diaper")}
              />
            )
          )}

          {nutritionLoading ? (
            <ProductRowPlaceholder />
          ) : (
            nutritionData &&
            nutritionData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 4);
                }}
              >
                <ProductRow
                  products={nutritionData}
                  title="NUTRITION & MILK FORMULA"
                  onSeeMore={() => onSeeMorePress("nutrition")}
                />
              </View>
            )
          )}

          {bathBodyLoading ? (
            <ProductRowPlaceholder />
          ) : (
            bathBodyData &&
            bathBodyData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 5);
                }}
              >
                <ProductRow
                  products={bathBodyData}
                  title="KID BATH & BODY CARD"
                  onSeeMore={() => onSeeMorePress("bath_body")}
                />
              </View>
            )
          )}

          {shoesLoading ? (
            <ProductRowPlaceholder />
          ) : (
            shoesData &&
            shoesData.length > 0 && (
              <View>
                <ProductRow
                  products={shoesData}
                  title="BABY & KIDS SHOES"
                  onSeeMore={() => onSeeMorePress("shoes")}
                />
              </View>
            )
          )}

          {apparelLoading ? (
            <ProductRowPlaceholder />
          ) : (
            apparelData &&
            apparelData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 6);
                }}
              >
                <ProductRow
                  products={apparelData}
                  title="KID APPARELS"
                  onSeeMore={() => onSeeMorePress("apparel")}
                />
              </View>
            )
          )}

          {toddlerLoading ? (
            <ProductRowPlaceholder />
          ) : (
            toddlerData &&
            toddlerData.length > 0 && (
              <View>
                <ProductRow
                  products={toddlerData}
                  title="BABY & TODDLER"
                  onSeeMore={() => onSeeMorePress("toddler")}
                />
              </View>
            )
          )}

          {furnitureLoading ? (
            <ProductRowPlaceholder />
          ) : (
            furnitureData &&
            furnitureData.length > 0 && (
              <ProductRow
                products={furnitureData}
                title="KID FURNITURES"
                onSeeMore={() => onSeeMorePress("furniture")}
              />
            )
          )}

          {educationalToyLoading ? (
            <ProductRowPlaceholder />
          ) : (
            educationalToyData &&
            educationalToyData.length > 0 && (
              <ProductRow
                products={educationalToyData}
                title="KID EDUCATIONAL TOYS"
                onSeeMore={() => onSeeMorePress("toy")}
              />
            )
          )}

          {bagLoading ? (
            <ProductRowPlaceholder />
          ) : (
            bagData &&
            bagData.length > 0 && (
              <ProductRow
                products={bagData}
                title="KIDS BAGS & ACCESSORIES"
                onSeeMore={() => onSeeMorePress("bag")}
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
                  name="DISCOVER KIDS MALL"
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
