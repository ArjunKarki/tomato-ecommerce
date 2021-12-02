import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  AsyncStorage,
  TouchableNativeFeedback,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import Constants from "expo-constants";
const WIDTH = CONFIG.width;
const HEIGHT = CONFIG.height;

import { THEME, TYPO, width } from "../../DynamicStyle/style";

import {
  Container,
  Slider,
  ProductGrid,
  ProductCategory,
  Title,
  ProductCard,
  Header,
  ProductRowPlaceholder,
  CategoryPlaceholder,
  CatIconPlaceholder,
  StorePlaceholder,
  FlashDeal,
  ProductRow,
  ProductGridPlaceholder,
  StoreRow,
} from "../../components";

import { hp } from "../../constants/hp";
import { CONFIG } from "../../constants";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  SetBeautyRow,
  SetCategoryRow,
  SetDailyDiscoverRow,
  SetElectronicRow,
  SetKidRow,
  SetFlashDeals,
  SetPetProductRow,
} from "../../redux/actions/productAction";
import { Woo, Vendor } from "../../API";
import { setTrendingStore } from "../../redux/actions/storeAction";
import { FetchLiveVideos } from "../../redux/actions/LiveVideosAction";
import { useFocusEffect } from "@react-navigation/native";
import { Platform } from "react-native";
import { useStoreTag } from "../../hooks/useStoreTag";

const home_cat = hp.getHomeCat();
const trendingStore = hp.getHomeOfficialStores();

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

export default function Home({ navigation }) {
  const page = 15;
  const dispatch = useDispatch();
  const { categoryRow, daillyDiscoverRow } = useSelector(
    (state) => state.product,
    shallowEqual
  );

  const { accountDetails } = useSelector((state) => state, shallowEqual);

  const [tomatoSuperFastState, setTomatoSuperFast] = useState({
    loading: true,
    data: [],
  });

  const [techdata, setTechData] = useState({
    loading: true,
    data: [],
  });

  const [tomatoMartPromotion, setTomatoMartPromotions] = useState({
    loading: true,
    data: [],
  });

  const [covidSafetyPackage, setCovidSafetyPackage] = useState({
    loading: true,
    data: [],
  });

  const [beautyPersonalDiscounts, setBeautyPersonalDiscounts] = useState({
    loading: true,
    data: [],
  });

  const { flashDeals } = useSelector((state) => state.product, shallowEqual);

  // const { trendingStore } = useSelector((state) => state.store, shallowEqual);
  const { history } = useSelector((state) => state.history);

  const [state, setState] = useState({
    catLoading: true,
    // trendingStoreLoading: true,
    beautyLoading: true,
    kitchenLoading: true,
    trendLoading: true,
    electronicLoading: true,
    kidLoading: true,
    petProductLoading: true,
    dailyDiscoverLoading: true,
    flashDealsLoading: true,
  });

  useEffect(() => {
    fetchProducts();

    // to fetch live videos
    dispatch(FetchLiveVideos());
  }, []);

  async function fetchProducts() {
    if (
      !categoryRow ||
      !categoryRow.date ||
      new Date(categoryRow.date).getDate() != new Date().getDate()
    ) {
      //category

      Woo.get(`category-lists?per_page=50`)
        .then(({ data }) => {
          let _catsequences = [
            202,
            203,
            213,
            204,
            207,
            210,
            205,
            1095,
            206,
            212,
            233,
            232,
          ];
          let _tmpData = [];
          for (let i = 0; i < data.length; i++) {
            if (_catsequences.includes(data[i].id)) {
              _tmpData[_catsequences.indexOf(data[i].id)] = data[i];
            }
          }
          dispatch(
            SetCategoryRow({ data: _tmpData, date: new Date().toString() })
          );
          setState((previousState) => ({
            ...previousState,
            catLoading: false,
            categoryRow,
          }));
        })
        .catch((e) => {
          setState((previousState) => ({
            ...previousState,
            catLoading: false,
          }));
        });
    } else {
      setState((previousState) => ({ ...previousState, catLoading: false }));
    }
    //Gadget
    Woo.get(`products?tag=${4911}&per_page=15`)
      .then((res) => {
        console.log("gatget", res);
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

    //tomato superfast
    Woo.get(`/mall/tag/4694`)
      .then(({ data }) => {
        setTomatoSuperFast({
          loading: false,
          data,
        });
      })
      .catch((e) => {
        setTomatoSuperFast((previousState) => ({
          ...previousState,
          loading: false,
        }));
      });

    Woo.get(`temp/4671/4675`)
      .then(({ data }) => {
        setCovidSafetyPackage({ loading: false, data });
      })
      .catch((e) => {
        setCovidSafetyPackage((previousState) => ({
          ...previousState,
          loading: false,
        }));
      });
    //tomato mart promotion
    Woo.get(`/mall/tag/4433`)
      .then(({ data }) => {
        setTomatoMartPromotions({
          loading: false,
          data,
        });
      })
      .catch((e) => {
        setTomatoMartPromotions((previousState) => ({
          ...previousState,
          loading: false,
        }));
      });

    let tagIdArr = [4213, 4265, 3951, 4212];
    for (let i = 0; i < tagIdArr.length; i++) {
      await Woo.get(`/mall/tag/${tagIdArr[i]}`)
        .then(({ data }) => {
          setBeautyPersonalDiscounts((previousState) => ({
            ...previousState,
            data: previousState.data.concat(data),
            loading: false,
          }));
        })
        .catch((e) => {
          setBeautyPersonalDiscounts((previousState) => ({
            ...previousState,
            loading: false,
          }));
        });
    }

    // daily discover
    Woo.get(`mall/category/232`, {
      params: {
        sortby: "popular_menu_order",
      },
    })
      .then(({ data }) => {
        dispatch(SetDailyDiscoverRow(data));
        setState((previousState) => ({
          ...previousState,
          dailyDiscoverLoading: false,
        }));
      })
      .catch((e) => {
        setState((previousState) => ({
          ...previousState,
          dailyDiscoverLoading: false,
        }));
      });

    //
    Woo.get(`flashdeals`, {
      params: {
        on_sale: true,
        per_page: 100,
        // featured: true,
      },
    })
      .then(({ data }) => {
        let _tmp;
        if (
          flashDeals?.expired_date &&
          new Date(flashDeals?.expired_date) > new Date()
        ) {
          _tmp = new Date(flashDeals.expired_date).toString();
        } else {
          _tmp = new Date(
            new Date().setHours(new Date().getHours() + 10)
          ).toString();
        }
        let shuffled = data.sort(() => 0.5 - Math.random());

        dispatch(SetFlashDeals({ data: shuffled, expired_date: _tmp }));
        setState((previousState) => ({
          ...previousState,
          flashDealsLoading: false,
        }));
      })
      .catch((e) => {
        setState((previousState) => ({
          ...previousState,
          flashDealsLoading: false,
        }));
      });
  }

  const sliderPlaceholder = () => {
    return (
      <Placeholder Animation={Fade}>
        <PlaceholderLine
          height={200}
          style={{ borderRadius: 0, marginBottom: 0 }}
        />
      </Placeholder>
    );
  };

  const toStore = ({ route, id, name }) => {
    if (route) navigation.navigate(route, { id, name });
    else navigation.navigate("Store", { id, name });
  };

  const toMall = (item) => {
    if (item.name === "Flash Deals") {
      if (flashDeals.expired_date) {
        navigation.navigate("CategoryDetail", {
          SCategory: { name: "Flash Deals" },
          countDown: {
            expired_date: Math.floor(
              (new Date(flashDeals.expired_date) - new Date()) / 1000
            )
              ? Math.floor(
                  (new Date(flashDeals.expired_date) - new Date()) / 1000
                )
              : 0,
          },
        });
        return;
      }
    } else if (item.name === "TOMATO Reword Coins") {
      navigation.navigate("AccountTab", {
        screen: "Account",
        params: {
          screen: "TomatoCoins",
          initial: false,
        },
      });
      return;
    } else if (
      item.name == "Tomato Superfast" ||
      item.name == "Tomato Vouchers" ||
      item.name == "Tomato Beauty Club"
    ) {
      navigation.navigate("CommingSoon");
    } else if (item.scrollTo) {
      scrollTo(item.scrollTo);
    }
    if (item.screen) {
      navigation.navigate(item.screen);
      return;
    }
    if (item.route) {
      // navigation.navigate(item.route)
      navigation.navigate(item.route.routeName, {
        screen: item.route.screenName,
        initial: false,
      });
    }
  };

  const toCategory = (type) => {
    let id, name;
    switch (type) {
      case "kitchen":
        id = 2335;
        name = "Popular Tomato Kitchen Items";
        break;

      case "beauty":
        id = 202;
        name = "Beauty & Personal Care";
        break;

      case "electronic":
        id = 2361;
        name = "Popular Electronic Mall";
        break;

      case "kids":
        id = 2369;
        name = "Popular Kid Mall";
        break;

      case "petproduct":
        id = 2367;
        name = "Popular Pet Mall";
        break;

      case "daily":
        id = 232;
        name = "Popular";
        break;

      default:
        id = 1095;
        name = "Popular";
    }

    navigation.navigate({
      name: "CategoryDetail",
      params: {
        SCategory: { id, name },
      },
    });
  };

  const trends = hp.getInspiredTrends();

  useFocusEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    }
  });
  const [layouts, setLayouts] = useState([]);
  let scrollViewRef = useRef(null);
  const scrollTo = (index) => {
    if (layouts[index]) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: layouts[index] - 85, //reduce header size as header is blocking the section
        animated: true,
      });
    }
  };

  const addLayoutAxis = (y, i) => {
    let _newArr = [...layouts];
    _newArr[i] = y;
    setLayouts(_newArr);
  };

  return (
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     backgroundColor:
    //       Platform.OS === "android" ? "transparent" : THEME.primary,
    //   }}
    // >
    <>
      <Header type="Home" />
      <ScrollView
        ref={scrollViewRef}
        style={{ backgroundColor: THEME.background, flex: 1 }}
      >
        <Container>
          <Slider type="Home" />
          <View
            style={{
              backgroundColor: THEME.card,
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 10,
              paddingTop: 15,
              paddingBottom: 10,
            }}
          >
            {home_cat.map((cat, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => toMall(cat)}
                  style={{
                    width: width / cat_width - 11,
                    height: 80,
                    marginRight: index == 4 || index == 9 ? 0 : 8,
                    marginBottom: 8,
                    // justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: width / cat_width - 8,
                      height: 60,
                      // alignItems: "center",
                    }}
                  >
                    <Image
                      source={cat.logo}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      color: THEME.text_primary,
                      fontSize: 10,
                      textAlign: "center",
                    }}
                    numberOfLines={2}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              paddingBottom: 10,
              // paddingHorizontal:8,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ flex: 1.3, height: 80 }}
            >
              <Image
                resizeMode="contain"
                source={require("../../assets/images/ads/adsLeft.jpeg")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("HowToShop")}
              activeOpacity={0.8}
              style={{ flex: 3, height: 80, marginHorizontal: 3 }}
            >
              <Image
                // resizeMode="cover"
                source={require("../../assets/images/ads/howtoshop.jpg")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{ flex: 1.3, height: 80 }}
            >
              <Image
                resizeMode="contain"
                source={require("../../assets/images/ads/adsRight.jpeg")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          </View>

          {state.flashDealsLoading ? (
            <ProductRowPlaceholder />
          ) : (
            <View
              style={{
                marginBottom: 14,
                backgroundColor: THEME.primary,
              }}
            >
              {flashDeals && (
                <FlashDeal products={flashDeals.data ? flashDeals.data : []} />
              )}
            </View>
          )}

          {state.catLoading ? (
            <CategoryPlaceholder />
          ) : (
            categoryRow && <ProductCategory categories={categoryRow.data} />
          )}

          <View>
            <StoreRow stores={trendingStore} title="TRENDING OFFICIAL STORES" />
          </View>

          {state.catLoading ? (
            <ProductRowPlaceholder />
          ) : (
            history &&
            history.length > 0 && (
              <ProductRow products={history} title="RECENTLY VIEW BY YOU" />
            )
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("TwelveTwelve")}
            style={[
              styles.banner_wrapper,
              { height: CONFIG.isIos ? 285 : 262 },
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
              title="TOMATO MART"
              // onSeeMore={() => toCategory("electronic")}
            />
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("TwelveTwelve")}
            style={[
              styles.banner_wrapper,
              { height: CONFIG.isIos ? 285 : 262 },
            ]}
          >
            <Image
              style={styles.banner}
              source={require("../../assets/images/ads/banner4.jpg")}
            />
          </TouchableOpacity>

          {beautyPersonalDiscounts.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow
              products={beautyPersonalDiscounts.data}
              title="TOMOTO BEAUTY"
              onSeeMore={() => toCategory("kids")}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PromoWithTag", {
                tagId: 4911,
                name: "Tomato Electronic and Mobile & Gadgets",
              });
            }}
            style={[
              styles.banner_wrapper,
              { height: CONFIG.isIos ? 285 : 262 },
            ]}
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
              title="TOMATO ELECTRONIC"
              onSeeMore={() =>
                navigation.navigate("PromoWithTag", {
                  tagId: 4911,
                  name: "Tomato Electronic and Mobile & Gadgets",
                })
              }
            />
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CovidSafetyPackage", { id: 1501 });
            }}
            style={styles.banner_wrapper}
          >
            <Image
              style={styles.banner}
              source={require("../../assets/images/ads/covid.jpg")}
            />
          </TouchableOpacity>

          {covidSafetyPackage.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow
              products={covidSafetyPackage.data}
              title="COVID SAFETY PACKAGE"
              // onSeeMore={() => toCategory("electronic")}
            />
          )}
          <TouchableOpacity
            // onPress={() => toMall({ route: "BeautyMall" })}
            style={styles.banner_wrapper}
          >
            <Image
              style={styles.banner}
              source={{
                uri:
                  "https://tomato.com.mm/wp-content/uploads/2020/10/superfast-banner-1024x549.jpg",
              }}
            />
          </TouchableOpacity>

          {tomatoSuperFastState.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow
              products={tomatoSuperFastState.data}
              title="TOMATO MART"
              // onSeeMore={() => toCategory("beauty")}
            />
          )}

          <View
            style={{
              marginBottom: 14,
              paddingHorizontal: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  color: THEME.primary,
                  marginBottom: 8,
                }}
              >
                INSPIRED BY TRENDS
              </Text>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("CategoryTab");
                }}
              >
                <Text style={{ color: THEME.text_secondary }}>
                  See More{"  "}
                </Text>
                <Ionicons
                  size={16}
                  style={{ marginTop: 3 }}
                  name="ios-arrow-forward"
                  color={THEME.secondary}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={trends}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (item.id == "CategoryTab") {
                      navigation.navigate("CategoryTab");
                    } else {
                      navigation.navigate({
                        name: "CategoryDetail",
                        params: { SCategory: { id: item.id, name: item.name } },
                      });
                    }
                  }}
                >
                  <View
                    style={{
                      width: (WIDTH * 34) / 100,
                      marginRight: 8,
                    }}
                  >
                    <View
                      style={{
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: "#ddd",
                        padding: 8,
                        backgroundColor: "#fff",
                        height: 150,
                      }}
                    >
                      <Image
                        source={item.image}
                        style={{
                          height: "100%",
                          width: "100%",
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Roboto-Regular",
                        marginTop: 8,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          {petGrom.dailyDiscoverLoading ? (
            <ProductGridPlaceholder />
          ) : (
            <View
              onLayout={(event) => {
                addLayoutAxis(event.nativeEvent.layout.y, 5);
              }}
              style={{ marginBottom: 14, paddingHorizontal: 8 }}
            >
              <Title
                name="DAILY DISCOVER"
                onSeeMorePress={() => toCategory("daily")}
              />
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {daillyDiscoverRow &&
                  daillyDiscoverRow.map((item, index) => (
                    <ProductGrid key={index} product={item} index={index} />
                  ))}
              </View>

              <TouchableOpacity
                onPress={() => toCategory("daily")}
                style={styles.bottom_btn}
              >
                <Text style={{ color: THEME.card, marginRight: 10 }}>
                  SEE MORE
                </Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color={THEME.card}
                />
              </TouchableOpacity>
            </View>
          )}
        </Container>
      </ScrollView>
    </>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cat_btn: {
    width: (WIDTH * 17) / 100,
    marginBottom: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  cat_view: {
    overflow: "hidden",
    borderRadius: 10,
    width: "100%",
    height: 57,
  },
  cat_text: {
    textAlign: "center",
    fontSize: 10,
    color: THEME.text_secondary,
    marginTop: 5,
  },
  t_store: (index) => {
    return {
      padding: 11,
      borderWidth: 0.5,
      borderColor: THEME.text_secondary,
      marginRight: 10,
      // hori_width == 3 ? (index == 2 ? 0 : 10) : index == 4 ? 0 : 10,
      marginTop: 10,
      marginBottom: 5,
    };
  },
  t_store_img: { width: WIDTH / hori_width - 35, height: 90 },
  bottom_btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.primary,
    alignSelf: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    paddingVertical: 10,
    marginTop: 10,
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
});
