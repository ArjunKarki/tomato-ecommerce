import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  ProductGrid,
  ProductGridPlaceholder,
  ProductRow,
  ProductRowPlaceholder,
  Title,
} from "../../components";
import { CONFIG, hp } from "../../constants";
import { THEME } from "../../DynamicStyle/style";
import { useStoreTag } from "../../hooks/useStoreTag";
import { useStoreBrand } from "../../hooks/useStoreBrand";
import { useStoreMultiTag } from "../../hooks/useStoreMultiTag";
import { useStoreMultiBrand } from "../../hooks/useStoreMultiBrand";
import { Woo } from "../../API";
const WIDTH = CONFIG.width;
const cat_width = WIDTH > 700 ? 10 : 5;
const category = hp.getStoresCatIcons();

const brandId = 3909;

const catId = {
  rowOne: 231,
  rowTwo: 217,
  rowThree: 2888,
};
const banners = [
  "https://tomato.com.mm/wp-content/uploads/2020/09/01-Computer-1920x160-1-1024x85.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/0-02-06-b78b3a75f58a1e9afd68521e88c2a663fcba617499344a8fdf556227731e91e6_1c6d9db7fa2e98-1024x449.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/0-02-06-a9814aca624587d2b33fd5b8b39c0e5dd5c009483df045d538452fadf2d21d6e_1c6d9db7faf228-1024x449.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/0-02-06-cb4f2ad91e73d5bde05e9c82263ab765d48a149488e42934d98284fe0016245a_1c6d9db7fa0409-1024x449.jpg",
];

const Giordano = ({ navigation, route }) => {
  const storeId = route.params.id;
  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, []);

  const toCategory = (index) => {
    if (layouts[index]) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: layouts[index] - 10, //reduce header size as header is blocking the section
        animated: true,
      });
    }
  };

  const addLayoutAxis = (y, i) => {
    let _newArr = [...layouts];
    _newArr[i] = y;
    setLayouts(_newArr);
  };

  useEffect(() => {
    // Woo.get(`products?category=231`).then(res => console.log(res.data))
  }, []);

  const brand = useStoreBrand(brandId);

  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef}>
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[0],
            }}
          />
        </TouchableNativeFeedback>
        <View style={styles.catContainer}>
          {category.map((item, index) => (
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
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[1],
            }}
          />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[2],
            }}
          />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[3],
            }}
          />
        </TouchableNativeFeedback>
        {/* {rowOne.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowOne.data &&
          rowOne.data.length > 0 && (
            <View>
              <ProductRow products={rowOne.data} />
            </View>
          )
        )} */}

        {brand.loading ? (
          <ProductGridPlaceholder />
        ) : (
          brand.data &&
          brand.data.length > 0 && (
            <View style={{ paddingHorizontal: 8 }}>
              <Title name="Popular Products" />
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {brand.data.map((item, index) => (
                  <ProductGrid key={index} product={item} index={index} />
                ))}
              </View>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Giordano;

const styles = StyleSheet.create({
  catContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: THEME.card,
    paddingTop: 20,
    paddingBottom: 10,
    // marginBottom: 10
  },
  banner_wrapper: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
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
});
