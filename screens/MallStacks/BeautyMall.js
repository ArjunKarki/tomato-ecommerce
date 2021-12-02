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
import { SetFlashDeals } from "../../redux/actions/productAction";
import { useSelector, shallowEqual } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const beauty_logo = hp.getBeautyCat();
const get_beauty_stores = hp.getBeautyStores();

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

const makeupCosId = 407;
const flashDealId = 202;
const hotProductId = 202;
const newArrivalId = 405;
const lipstickId = 2833;
const makeupRemoverId = 2843;
const skinCareId = 405;
const menGroomingId = 436;
const beautyMaskId = 2840;
const bathBodyId = 429;
const hairCareId = 1208;
const oralCareId = 438;
const personalCareId = 2549;
const discoverId = 2353;

export default function BeautyMall({ navigation, route }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flashLoading, setFlashLoading] = useState(true);
  const [flashDealData, setFlashDealData] = useState([]);

  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  const {
    data: hotProductData,
    error: hotProductError,
    loading: hotProductLoading,
  } = useMall(hotProductId);

  const {
    data: newArrivalData,
    error: newArrivalError,
    loading: newArrivalLoading,
  } = useMall(newArrivalId);

  const {
    data: makeupConsData,
    error: makeupConsError,
    loading: makeupCosLoading,
  } = useMall(makeupCosId);
  const {
    data: lipstickData,
    error: lipstickError,
    loading: lipstickLoading,
  } = useMall(lipstickId);

  const {
    data: makeupRemoverData,
    error: makeupRemoverError,
    loading: makeupRemoverLoading,
  } = useMall(makeupRemoverId);

  const {
    data: skinCareData,
    error: skinCareError,
    loading: skinCareLoading,
  } = useMall(skinCareId);
  const {
    data: menGroomingData,
    error: menGroomingError,
    loading: menGroomingLoading,
  } = useMall(menGroomingId);

  const {
    data: beautyMaskData,
    error: beautyMaskError,
    loading: beautyMaskLoading,
  } = useMall(beautyMaskId);

  const {
    data: bathBodyData,
    error: bathBodyError,
    loading: bathBodyLoading,
  } = useMall(bathBodyId);

  const {
    data: hairCareData,
    error: hairCareError,
    loading: hairCareLoading,
  } = useMall(hairCareId);

  const {
    data: oralCareData,
    error: oralCareError,
    loading: oralCareLoading,
  } = useMall(oralCareId);

  const {
    data: personalCareData,
    error: personalCareError,
    loading: personalCareLoading,
  } = useMall(personalCareId);

  useEffect(() => {
    let source = Axios.CancelToken.source();

    //flashdeals
    Woo.get(`/flashdeals/${flashDealId}`)
      .then(({ data }) => {
        setFlashDealData(data);
        setFlashLoading(false);
      })
      .catch((e) => {
        setFlashLoading(false);
      });

    Woo.get(`/mall/beauty`, { cancelToken: source.token })
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

  const renderImage = () => {
    return (
      <View style={{ width: CONFIG.width, height: CONFIG.height * 0.23 }}>
        <Image
          source={require("../../assets/images/slider/mall1.jpg")}
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  };

  const onSeeMorePress = (type) => {
    let id, name;
    switch (type) {
      case "flashdeal":
        id = flashDealId;
        name = "Beauty Mall Flash Deals";
        break;

      case "hotproduct":
        id = hotProductId;
        name = "Beauty & Personal Care";
        break;

      case "makeup":
        id = makeupCosId;
        name = "Makeup & Cosmetic";
        break;

      case "lipstick":
        id = lipstickId;
        name = "Lipstick & Others";
        break;

      case "makeup_remover":
        id = makeupRemoverId;
        name = "Makeup Remover";
        break;

      case "skin_care":
        id = skinCareId;
        name = "Skin Care";
        break;

      case "men_grooming":
        id = menGroomingId;
        name = "Men's Grooming";
        break;

      case "beauty_mask":
        id = beautyMaskId;
        name = "Beauty Masks";
        break;

      case "bath_body":
        id = bathBodyId;
        name = "Bath & Body";
        break;

      case "hair_care":
        id = hairCareId;
        name = "Hair Care";
        break;

      case "oral_care":
        id = oralCareId;
        name = "Oral Care";
        break;

      case "personal_card":
        id = personalCareId;
        name = "Personal Card";
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
            {beauty_logo.map((item, index) => (
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
                  addLayoutAxis(event.nativeEvent.layout.y, 1);
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
          {hotProductLoading ? (
            <ProductRowPlaceholder />
          ) : (
            hotProductData &&
            hotProductData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 2);
                }}
              >
                <ProductRow
                  products={hotProductData}
                  title="HOT PRODUCTS"
                  onSeeMore={() => onSeeMorePress("hotproduct")}
                />
              </View>
            )
          )}
          <View
            onLayout={(event) => {
              addLayoutAxis(event.nativeEvent.layout.y, 3);
            }}
          >
            <StoreRow
              stores={get_beauty_stores}
              title="TOP BRANDS"
              onSeeMorePress={() => toMall({ route: "malls" })}
            />
          </View>

          {newArrivalLoading ? (
            <ProductRowPlaceholder />
          ) : (
            newArrivalData &&
            newArrivalData.length > 0 && (
              <View>
                <ProductRow
                  products={newArrivalData}
                  title="NEW ARRIVAL"
                  onSeeMore={() => onSeeMorePress("newarrival")}
                />
              </View>
            )
          )}

          {makeupCosLoading ? (
            <ProductRowPlaceholder />
          ) : (
            makeupConsData &&
            makeupConsData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 4);
                }}
              >
                <ProductRow
                  products={makeupConsData}
                  title="MAKEUP & COSMETICS"
                  onSeeMore={() => onSeeMorePress("makeup")}
                />
              </View>
            )
          )}

          {lipstickLoading ? (
            <ProductRowPlaceholder />
          ) : (
            lipstickData &&
            lipstickData.length > 0 && (
              <ProductRow
                products={lipstickData}
                title="LIPSTICK & OTHERS"
                onSeeMore={() => onSeeMorePress("lipstick")}
              />
            )
          )}

          {makeupRemoverLoading ? (
            <ProductRowPlaceholder />
          ) : (
            makeupRemoverData &&
            makeupRemoverData.length > 0 && (
              <ProductRow
                products={makeupRemoverData}
                title="MAKEUP REMOVERS"
                onSeeMore={() => onSeeMorePress("makeup_remover")}
              />
            )
          )}

          {skinCareLoading ? (
            <ProductRowPlaceholder />
          ) : (
            skinCareData &&
            skinCareData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 5);
                }}
              >
                <ProductRow
                  products={skinCareData}
                  title="SKIN CARE"
                  onSeeMore={() => onSeeMorePress("skin_care")}
                />
              </View>
            )
          )}

          {menGroomingLoading ? (
            <ProductRowPlaceholder />
          ) : (
            menGroomingData &&
            menGroomingData.length > 0 && (
              <ProductRow
                products={menGroomingData}
                title="MEN'S GROOMING"
                onSeeMore={() => onSeeMorePress("men_grooming")}
              />
            )
          )}

          {beautyMaskLoading ? (
            <ProductRowPlaceholder />
          ) : (
            beautyMaskData &&
            beautyMaskData.length > 0 && (
              <ProductRow
                products={beautyMaskData}
                title="BEAUTY MASKS"
                onSeeMore={() => onSeeMorePress("beauty_mask")}
              />
            )
          )}

          {bathBodyLoading ? (
            <ProductRowPlaceholder />
          ) : (
            bathBodyData &&
            bathBodyData.length > 0 && (
              <View
                onLayout={(event) => {
                  addLayoutAxis(event.nativeEvent.layout.y, 6);
                }}
              >
                <ProductRow
                  products={bathBodyData}
                  title="BATH & BODY"
                  onSeeMore={() => onSeeMorePress("bath_body")}
                />
              </View>
            )
          )}

          {hairCareLoading ? (
            <ProductRowPlaceholder />
          ) : (
            hairCareData &&
            hairCareData.length > 0 && (
              <ProductRow
                products={hairCareData}
                title="HAIR CARE"
                onSeeMore={() => onSeeMorePress("hair_care")}
              />
            )
          )}

          {oralCareLoading ? (
            <ProductRowPlaceholder />
          ) : (
            oralCareData &&
            oralCareData.length > 0 && (
              <ProductRow
                products={oralCareData}
                title="ORAL CARE"
                onSeeMore={() => onSeeMorePress("oral_care")}
              />
            )
          )}
          {personalCareLoading ? (
            <ProductRowPlaceholder />
          ) : (
            personalCareData &&
            personalCareData.length > 0 && (
              <ProductRow
                products={personalCareData}
                title="PERSONAL CARE"
                onSeeMore={() => onSeeMorePress("personal_card")}
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
                  name="DISCOVER BEAUTY MALL"
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
