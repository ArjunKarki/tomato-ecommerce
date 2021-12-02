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
const WIDTH = CONFIG.width;
const cat_width = WIDTH > 700 ? 10 : 5;
const category = hp.getStoresCatIcons();

const brandId = 3572;
const rowIds = {
  rowOne: [1059, 85],
  rowTwo: [1273],
  rowThree: [1273],
  rowFour: [1721],
  rowFive: [152],
  rowSix: [1170],
  rowSeven: [954],
};
const banners = [
  "https://tomato.com.mm/wp-content/uploads/2020/08/0-02-06-d93e2c036310ff43a0a6e8ffe6b4d1d46fbc019d03f8dd168a507d932591ec3b_49748da5-1024x389.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/08/0-02-06-e2e3bd186021480689b56001b5dfae67d421765adc8b312befe6d3fb81bda294_5798bbbd-1024x389.jpg",
];

const Xo = ({ navigation, route }) => {
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

  const brand = useStoreBrand(brandId);
  const rowOne = useStoreMultiTag(storeId, rowIds.rowOne);
  const rowTwo = useStoreMultiTag(storeId, rowIds.rowTwo);
  const rowThree = useStoreMultiTag(storeId, rowIds.rowThree);
  const rowFour = useStoreMultiTag(storeId, rowIds.rowFour);
  const rowFive = useStoreMultiTag(storeId, rowIds.rowFive);
  const rowSix = useStoreMultiTag(storeId, rowIds.rowSix);
  const rowSeven = useStoreMultiTag(storeId, rowIds.rowSeven);

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
            style={[styles.banner_wrapper]}
            source={{
              uri: banners[1],
            }}
          />
        </TouchableNativeFeedback>
        {rowOne.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowOne.data &&
          rowOne.data.length > 0 && (
            <View>
              <ProductRow products={rowOne.data} title="XO EARPHONE" />
            </View>
          )
        )}
        {rowTwo.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowTwo.data &&
          rowTwo.data.length > 0 && (
            <View>
              <ProductRow products={rowTwo.data} title="XO CABEL" />
            </View>
          )
        )}

        {rowThree.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowThree.data &&
          rowThree.data.length > 0 && (
            <View>
              <ProductRow products={rowThree.data} title="XO CHARGER" />
            </View>
          )
        )}

        {rowFour.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowFour.data &&
          rowFour.data.length > 0 && (
            <View>
              <ProductRow products={rowFour.data} title="XO POWERBANK" />
            </View>
          )
        )}

        {rowFive.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowFive.data &&
          rowFive.data.length > 0 && (
            <View>
              <ProductRow products={rowFive.data} title="XO SPEAKER" />
            </View>
          )
        )}

        {rowSix.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowSix.data &&
          rowSix.data.length > 0 && (
            <View>
              <ProductRow products={rowSix.data} title="XO USB & OTG" />
            </View>
          )
        )}

        {rowSeven.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowSeven.data &&
          rowSeven.data.length > 0 && (
            <View>
              <ProductRow
                products={rowSeven.data}
                title="XO TWS & BLUETOOTH EARPHONE"
              />
            </View>
          )
        )}

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

export default Xo;

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
