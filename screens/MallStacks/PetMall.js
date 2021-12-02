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

const cat_logo = hp.getPetCat();
const pet_stores = hp.getPetStores();

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

const mustHaveId = 487;
const petFoodId = 486;
const petSnackId = 2903;
const petFashionId = 2198;
const petGroomingId = 488;
const petMedicineId = 2910;
const petAccessoriesId = 487;
const discoverId = 121;

export default function PetMall({ navigation, route }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  const {
    data: mustHaveData,
    error: mustHaveError,
    loading: mustHaveLoading,
  } = useMall(mustHaveId);

  const {
    data: petFoodData,
    error: petFoodError,
    loading: petFoodLoading,
  } = useMall(petFoodId, "rand");

  const {
    data: petSnackData,
    error: petSnackError,
    loading: petSnackLoading,
  } = useMall(petSnackId);

  const {
    data: petFashionData,
    error: petFashionError,
    loading: petFashionLoading,
  } = useMall(petFashionId);

  const {
    data: peteGroomingData,
    error: petGroomingError,
    loading: petGroomingLoading,
  } = useMall(petGroomingId);

  const {
    data: petMedicineData,
    error: petMedicineError,
    loading: petMedicineLoading,
  } = useMall(petMedicineId);

  const {
    data: petAccessoriesData,
    error: petAccessoriesError,
    loading: petAccessoriesLoading,
  } = useMall(petAccessoriesId);

  useEffect(() => {
    let source = Axios.CancelToken.source();

    Woo.get(`/mall/pet`, { cancelToken: source.token })
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        if (Axios.isCancel(e)) {
        } else setLoading(false);
      });
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
        id = mustHaveId;
        name = "Pet Food And Accessories";
        break;

      case "pet_food":
        id = petFoodId;
        name = "Pet Food";
        break;

      case "pet_snack":
        id = petSnackId;
        name = "Pet Snack";
        break;

      case "pet_fashion":
        id = petFashionId;
        name = "Pet Fashion";
        break;

      case "pet_grooming":
        id = petGroomingId;
        name = "Pet Grooming";
        break;

      case "pet_accessroies":
        id = petAccessoriesId;
        name = "Pet Accessories";
        break;

      case "pet_medicines":
        id = petMedicineId;
        name = "Pet Medicines";
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
          source={require("../../assets/images/slider/mall4.jpg")}
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

          {mustHaveLoading ? (
            <ProductRowPlaceholder />
          ) : (
            mustHaveData &&
            mustHaveData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 0);
                }}
              >
                <ProductRow
                  products={mustHaveData}
                  title="MUST HAVE ITEMS"
                  onSeeMore={() => onSeeMorePress("must")}
                />
              </View>
            )
          )}

          <View
            onLayout={(event) => {
              addLayoutAxis(event.nativeEvent.layout.y, 1);
            }}
          >
            <StoreRow stores={pet_stores} title="TOP BRANDS" />
          </View>

          {petFoodLoading ? (
            <ProductRowPlaceholder />
          ) : (
            petFoodData &&
            petFoodData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 2);
                }}
              >
                <ProductRow
                  products={petFoodData}
                  title="PET FOOD"
                  onSeeMore={() => onSeeMorePress("pet_food")}
                />
              </View>
            )
          )}

          {petSnackLoading ? (
            <ProductRowPlaceholder />
          ) : (
            petSnackData &&
            petSnackData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 3);
                }}
              >
                <ProductRow
                  products={petSnackData}
                  title="PET SNACK"
                  onSeeMore={() => onSeeMorePress("pet_snack")}
                />
              </View>
            )
          )}

          {petFashionLoading ? (
            <ProductRowPlaceholder />
          ) : (
            petFashionData &&
            petFashionData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 4);
                }}
              >
                <ProductRow
                  products={petFashionData}
                  title="PET FASHION"
                  onSeeMore={() => onSeeMorePress("pet_fashion")}
                />
              </View>
            )
          )}

          {petGroomingLoading ? (
            <ProductRowPlaceholder />
          ) : (
            peteGroomingData &&
            peteGroomingData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 5);
                }}
              >
                <ProductRow
                  products={peteGroomingData}
                  title="PET GROOMING"
                  onSeeMore={() => onSeeMorePress("pet_grooming")}
                />
              </View>
            )
          )}

          {petMedicineLoading ? (
            <ProductRowPlaceholder />
          ) : (
            petMedicineData &&
            petMedicineData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 6);
                }}
              >
                <ProductRow
                  products={petMedicineData}
                  title="PET MEDICINES"
                  onSeeMore={() => onSeeMorePress("pet_medicines")}
                />
              </View>
            )
          )}

          {petAccessoriesLoading ? (
            <ProductRowPlaceholder />
          ) : (
            petAccessoriesData &&
            petAccessoriesData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 7);
                }}
              >
                <ProductRow
                  products={petAccessoriesData}
                  title="PET ACCESSOREIS"
                  onSeeMore={() => onSeeMorePress("pet_accessroies")}
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
                  name="DISCOVER PET MALL"
                  onSeeMorePress={() =>
                    navigation.navigate({
                      name: "CategoryDetail",
                      params: {
                        SCategory: { id: 2367, name: "Popular Pet Mall" },
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
