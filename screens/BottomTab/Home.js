import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { FontAwesome } from "@expo/vector-icons";

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
  ProductGridPlaceholder,
  StoreRow,
  BrandPlaceholder,
  ProductRow,
  FeaturedBrandPlaceholder,
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
import { Row } from "native-base";
import { ImageBackground } from "react-native";
import {
  getBestSeller,
  getFeaturedBrands,
  getWhatsNew,
} from "../../redux/actions/HomeAction";
import { useProductCategory } from "../../hooks/useProductCategory";

const redBoxData = hp.getHomeRedBoxImage();
const services = hp.getHomeServices();
const products = hp.getDemyProducts();
const homeCategory = hp.getHomeCat();
const trendingStore = hp.getHomeOfficialStores();

const cat_width = WIDTH > 700 ? 10 : 5;
// const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;
const hori_width = CONFIG.width > 700 ? 4.3 : 2.3;

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const { accountDetails } = useSelector((state) => state, shallowEqual);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [featuredBrand, setFeaturedBrand] = useState({
    loading: true,
    data: null,
  });
  const [whatsNew, setWhatsNew] = useState({ loading: true, data: null });
  const [bestSeller, setBestSeller] = useState({ loading: true, data: null });

  const petGrooming = useProductCategory(2198);
  const petFashion = useProductCategory(2198);
  const petSnack = useProductCategory(2903);
  const petFood = useProductCategory(486);
  const petToy = useProductCategory(2909);
  const petMedicine = useProductCategory(2910);
  const petAccessories = useProductCategory(487);
  const others = useProductCategory(490);
  const dailyDiscover = useProductCategory(212);

  useEffect(() => {
    fetchData();
    // to fetch live videos
  }, []);

  const fetchData = async () => {
    // Woo.get("/brands?featured=true").then(({ data }) => {
    //   setFeaturedBrand({ loading: false, data });
    // });

    // Woo.get("/tag/4994").then(({ data }) => {
    //   setWhatsNew({ loading: false, data });
    // });

    // Woo.get("/tag/4995").then(({ data }) =>
    //   setBestSeller({ loading: false, data })
    // );
    // .catch((e) => callback(e, true, setState));
    // .catch((e) => {
    //   callback(e, true, setState);
    // });
    getFeaturedBrands(callBackRes, setFeaturedBrand); //pass callbackfun and setState
    getWhatsNew(callBackRes, setWhatsNew);
    getBestSeller(callBackRes, setBestSeller);
  };

  const callBackRes = (data, err, setState) => {
    if (err) setState({ data: null, loading: false });
    else setState({ loading: false, data });
  };

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

  const trends = hp.getInspiredTrends();

  useFocusEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    }
  });

  const toProductDetail = () => {
    navigation.navigate("ProductDetailScreen", { id: "71186" });
  };

  const openCloseModal = (bol) => {
    setVisibleModal(bol);
  };

  const onRedBoxClick = (i) => {
    if (i > 2) {
      navigation.navigate("HowToShop");
    } else {
      setModalData(redBoxData[i]);
      openCloseModal(true);
    }
  };

  const toCategory = (item) => {
    navigation.navigate({
      name: "CategoryDetail",
      params: { SCategory: { id: item.id, name: item.name } },
    });
  };

  const keyExtractor = (item, index) => index.toString();

  const toServiceDetail = (name, service) =>
    navigation.navigate("ServiceDetail", { name, service });

  const renderServices = () => (
    <View>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          height: 35,
          backgroundColor: THEME.card,
        }}
      >
        <View
          style={{
            width: 3,
            height: 22,
            backgroundColor: THEME.primary,
            marginRight: 8,
          }}
        />
        <Text style={{ fontSize: 18 }}>Services</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 12,
          marginBottom: 12,
          height: 250,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => toServiceDetail("Grooming", "grooming")}
          style={{
            backgroundColor: THEME.card,
            flex: 1,
            marginRight: 8,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/services/1.png")}
            style={{ width: "100%", height: "100%" }}
          ></ImageBackground>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => toServiceDetail("Pet Clinic", "clinic")}
            style={{
              backgroundColor: THEME.card,
              flex: 1,
              marginBottom: 8,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../assets/images/services/2.png")}
              style={{ width: "100%", height: "100%" }}
            ></ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toServiceDetail("Training", "training")}
            style={{
              backgroundColor: THEME.card,
              flex: 1,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../assets/images/services/3.png")}
              style={{ width: "100%", height: "100%" }}
            ></ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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

      <ScrollView style={styles.container}>
        <Container>
          <Slider type="Home" />
          {/* RED BOX */}
          <View style={styles.redBoxContainer}>
            {redBoxData.map((item, index) => (
              <TouchableOpacity
                onPress={() => onRedBoxClick(index)}
                key={index}
                style={[styles.redBox(index)]}
              >
                <Image
                  style={[styles.img, { borderRadius: 8 }]}
                  source={item.img}
                />
              </TouchableOpacity>
            ))}
          </View>
          {whatsNew.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow title="What's New" products={whatsNew.data} />
          )}

          <View>
            <View style={styles.titleContainer}>
              <View style={styles.leftView} />
              <Text style={{ fontSize: 18 }}>Featured Brands</Text>
            </View>
            {featuredBrand.loading ? (
              <BrandPlaceholder num={1} />
            ) : featuredBrand.data ? (
              <ScrollView
                horizontal={true}
                style={styles.featuredBrandContainer}
              >
                {Object.keys(featuredBrand.data).map((item, index) => (
                  <TouchableOpacity
                    // onPress={() => toProductDetail(71186)} //71186//71225
                    onPress={() =>
                      navigation.navigate("BrandProducts", {
                        brand: featuredBrand.data[item],
                      })
                    }
                    style={styles.featuredBrand(index)}
                    key={index}
                  >
                    <Image
                      style={{
                        width: 60,
                        height: 120,
                        resizeMode: "center",
                        marginBottom: 7,
                      }}
                      source={
                        featuredBrand.data[item].image
                          ? { uri: featuredBrand.data[item].image }
                          : require("../../assets/images/placeholder.jpg")
                      }
                    />

                    <View>
                      <Text style={{ fontFamily: "Roboto-Medium" }}>
                        {featuredBrand.data[item].name}
                      </Text>
                      <Text style={{ color: THEME.text_primary }}>
                        {featuredBrand.data[item].count} products
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View
                style={{ marginVertical: 5, marginTop: 12, marginBottom: 12 }}
              />
            )}
          </View>
          {bestSeller.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow title="Best Sellers" products={bestSeller.data} />
          )}
          <View>
            <View style={styles.titleContainer}>
              <View style={styles.leftView} />
              <Text style={{ fontSize: 18 }}>Categories</Text>
            </View>
            <View style={styles.categoryContainer}>
              {homeCategory.map((item, index) => (
                <TouchableOpacity
                  onPress={() => toCategory(item)}
                  style={{
                    width: WIDTH / 3 - 12,
                    height: 150,
                    marginRight: index == 2 || index == 5 ? 0 : 7,
                    marginBottom: 6,
                    backgroundColor: THEME.card,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                  key={index}
                >
                  <View>
                    <Image
                      style={{
                        height: 100,
                        width: WIDTH / 3 - 30,
                      }}
                      source={item.img}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 5,
                      textAlign: "center",
                      paddingHorizontal: 5,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* {accountDetails.data.id == null && (
            <View style={styles.authContainer}>
              <Text style={styles.authTxt}>
                Sign Up, Earn Points, Learn More
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AccountTab")}
                style={styles.authBtn}
              >
                <Text style={{ color: THEME.primary }}>View More</Text>
              </TouchableOpacity>
            </View>
          )} */}
          {renderServices()}
          {petGrooming.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow
              title="Pet Grooming and Hygiene"
              products={petGrooming.data}
            />
          )}

          {petFashion.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow products={petFashion.data} title="Pet Fashion" />
          )}

          {petSnack.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow products={petSnack.data} title="Pet Snacks" />
          )}

          {petFood.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow products={petFood.data} title="Pet Food" />
          )}

          {petToy.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow products={petToy.data} title="Pet Toy" />
          )}

          {petMedicine.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow
              products={petMedicine.data}
              title="Pet Medicine & Health"
            />
          )}

          {petAccessories.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow
              products={petAccessories.data}
              title="Pet Accessories"
            />
          )}

          {others.loading ? (
            <ProductRowPlaceholder />
          ) : (
            <ProductRow products={others.data} title="Others" />
          )}

          {dailyDiscover.loading ? (
            <ProductGridPlaceholder />
          ) : (
            <ProductGrid products={dailyDiscover.data} title="Daily Discover" />
          )}

          {/* bottom products */}
          {/* <View style={{ paddingHorizontal: 8 }}>
            <Text style={styles.title}>Pet Grooming and Hygiene</Text>
            {products.map((item, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: "center",
                    marginTop: 10,
                    marginBottom: 5,
                  }}
                  source={require("../../assets/images/placeholder.jpg")}
                />
                <Text
                  style={{
                    marginBottom: 8,
                    fontSize: 16,
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ marginBottom: 8, fontFamily: "Roboto-Medium" }}>
                  {hp.moneyFormat(item.price)} Ks
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: THEME.primary,
                    height: 50,
                  }}
                >
                  <Feather name="shopping-bag" size={22} color={THEME.white} />
                  <Text style={{ color: THEME.white, marginLeft: 5 }}>
                    Add to Card
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View> */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={visibleModal}
            onRequestClose={() => alert("close modal")}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 100, right: 10, zIndex: 1 }}
              onPress={() => openCloseModal(false)}
            >
              <FontAwesome name="close" size={24} color={THEME.white} />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: "rgba(27,26,26,0.7)",
              }}
            >
              <View
                style={{
                  marginTop: 100,
                  backgroundColor: THEME.white,
                  maxWidth: WIDTH * 0.85,
                  paddingHorizontal: 20,
                  paddingVertical: 40,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: THEME.primary,
                      marginBottom: 5,
                    }}
                  >
                    {modalData.title}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{modalData.description}</Text>
                </View>
              </View>
            </View>
          </Modal>
        </Container>
      </ScrollView>
    </>
    // </SafeAreaView>
  );
}

const ProductRows = ({ title, img, toProductDetail }) => {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          height: 38,
          backgroundColor: THEME.card,
        }}
      >
        <View
          style={{
            width: 3,
            height: 22,
            backgroundColor: THEME.primary,
            marginRight: 8,
          }}
        />
        <Text style={{ fontSize: 18 }}>{title}</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 12,
          marginBottom: 12,
        }}
      >
        <FlatList
          horizontal={true}
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={toProductDetail}
              style={{
                width: WIDTH * 0.48,
                height: 220,
                marginRight: 12,
                borderRadius: 10,
                backgroundColor: THEME.card,
              }}
            >
              <View style={{ flex: 0.7, marginTop: 7 }}>
                <Image
                  style={{
                    width: WIDTH * 0.48 - 40,
                    borderRadius: 10,
                    height: "100%",
                    alignSelf: "center",
                  }}
                  source={
                    img == "monitor"
                      ? require(`../../assets/dummy/products/monitor.jpeg`)
                      : require(`../../assets/dummy/products/ovaltine.jpeg`)
                  }
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 5,
                  justifyContent: "space-around",
                  flex: 0.3,
                  margin: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    color: THEME.text_primary,
                    fontSize: 13,
                  }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: THEME.primary,
                    fontFamily: "Roboto-Medium",
                    fontSize: 15,
                  }}
                >
                  {hp.moneyFormat(item.price)} Ks
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../../assets/dummy/stores/crown.jpeg")}
                  />
                  <Text
                    style={{
                      color: THEME.text_secondary,
                      fontSize: 12,
                    }}
                  >
                    Store Name
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 38,
    backgroundColor: THEME.card,
  },
  leftView: {
    width: 3,
    height: 22,
    backgroundColor: THEME.primary,
    marginRight: 8,
  },
  container: { backgroundColor: THEME.background, flex: 1 },
  redBoxContainer: {
    paddingHorizontal: 10,
    paddingTop: 12,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: THEME.card,
    paddingBottom: 12,
  },
  redBox: (i) => ({
    width: WIDTH / 2 - 14,
    height: HEIGHT * 0.18,
    marginBottom: 10,
    marginRight: i % 2 == 0 ? 8 : 0,
    borderRadius: 8,
  }),
  img: { width: "100%", height: "100%" },
  containerPadding: { paddingHorizontal: 10 },
  title: { fontSize: 20, fontFamily: "Roboto-Medium", marginBottom: 8 },
  featuredBrandContainer: {
    flexDirection: "row",
    // flexWrap: "wrap",
    marginTop: 12,
    paddingHorizontal: 10,
    marginBottom: 4, //normal 12 but already used 8 in featuredBrand
  },
  featuredBrand: (index) => ({
    width: WIDTH / hori_width,
    height: 180,
    // borderWidth: 0.2,
    borderColor: THEME.secondary,
    backgroundColor: THEME.card,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 8,
    // justifyContent: "center",
    alignItems: "center",
  }),
  authContainer: {
    width: "100%",
    height: HEIGHT * 0.15,
    backgroundColor: THEME.primary,
    alignItems: "center",
    justifyContent: "space-around",
  },
  authTxt: { color: THEME.white, fontFamily: "Roboto-Bold" },
  authBtn: {
    width: 100,
    height: 40,
    backgroundColor: THEME.white,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceContainer: {
    flexDirection: "row",
    backgroundColor: THEME.primary,
    flexWrap: "wrap",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  serviceBox: (index) => ({
    width: WIDTH / 2 - 22,
    height: 150,
    marginRight: index % 2 == 0 ? 14 : 0,
    marginBottom: index == 2 || index == 3 ? 0 : 12,
  }),
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginTop: 12,
    marginBottom: 4,
  },
  categoryBox: {},
});
