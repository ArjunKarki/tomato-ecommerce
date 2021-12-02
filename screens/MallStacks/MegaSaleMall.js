import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
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
  StoreRow,
} from "../../components";
import { hp } from "../../constants/hp";
import { CONFIG } from "../../constants";
import { Woo } from "../../API";
import Axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const cat_logo = hp.getPetCat();
const mega_stores = hp.getMegaStore();

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

export default function MegaSaleMall({ navigation, route }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let source = Axios.CancelToken.source();

    Woo.get(`/mall/megasale`, { cancelToken: source.token })
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

  const toCategory = (item) => {
    if (item.route) {
      navigation.navigate(item.route);
    }
  };

  const renderImage = () => {
    return (
      <View style={{ width: CONFIG.width, height: CONFIG.height * 0.23 }}>
        <Image
          source={require("../../assets/images/slider/mall7.jpg")}
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
        <Container>
          {renderImage()}
          {/* <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        backgroundColor: THEME.card,
                        paddingTop: 20,
                        paddingBottom: 10,
                        marginBottom: 10,
                    }}
                >
                    {
                        cat_logo.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => toCategory(item)}
                                key={index}
                                style={styles.cat_btn}
                            >
                                <View style={styles.cat_view}>
                                    <Image
                                        source={item.logo}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </View>
                                <Text numberOfLines={2} style={styles.cat_text}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View> */}
          <View
            style={{ marginBottom: 10, paddingHorizontal: 8, marginBottom: 14 }}
          >
            <StoreRow stores={mega_stores} title="PARTICIPATING BRANDS" />
            {/* <Title
            name="PARTICIPATING BRANDS"
            onSeeMorePress={() => console.log("see more")}
          />

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {mega_stores.map((item, index) => {
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

          {loading ? (
            <ProductGridPlaceholder />
          ) : (
            products &&
            products.length > 0 && (
              <View style={{ marginBottom: 14, paddingHorizontal: 8 }}>
                <Title
                  name="DISCOVER MEGA SALES MALL"
                  onSeeMorePress={() =>
                    navigation.navigate({
                      name: "CategoryDetail",
                      params: {
                        SCategory: {
                          id: 2370,
                          name: "Popular Mega Sales Mall",
                        },
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
        </Container>
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
