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

const brandId = 500;
const banners = [
  "https://tomato.com.mm/wp-content/uploads/2020/07/MAIN-BANNER-1024x450.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/55954401_263598437881189_5828747645509697536_o-1024x576.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/55861087_369780820539285_2202127645028646912_o-1024x576.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/viber_image_2020-07-13_17-33-49-1024x576.jpg",
];

const tagIds = {
  rowOne: [3842, 3113],
  rowTwo: [503],
  rowThree: [1921],
  rowFour: [1940, 1937, 1929, 1928, 500],
};

const Betadine = ({ navigation, route }) => {
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
  const rowOne = useStoreMultiTag(storeId, tagIds.rowOne);
  const rowTwo = useStoreMultiTag(storeId, tagIds.rowTwo);
  const rowThree = useStoreMultiTag(storeId, tagIds.rowThree);
  const rowFour = useStoreMultiTag(storeId, tagIds.rowFour);
  const brand = useStoreBrand(brandId);

  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef}>
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
              uri: banners[0],
            }}
          />
        </TouchableNativeFeedback>
        {rowOne.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowOne.data &&
          rowOne.data.length > 0 && (
            <View>
              <ProductRow products={rowOne.data} />
            </View>
          )
        )}
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper]}
            source={{
              uri: banners[1],
            }}
          />
        </TouchableNativeFeedback>
        {rowTwo.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowTwo.data &&
          rowTwo.data.length > 0 && (
            <View>
              <ProductRow products={rowTwo.data} />
            </View>
          )
        )}
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper]}
            source={{
              uri: banners[2],
            }}
          />
        </TouchableNativeFeedback>
        {rowThree.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowThree.data &&
          rowThree.data.length > 0 && (
            <View>
              <ProductRow products={rowThree.data} />
            </View>
          )
        )}
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper]}
            source={{
              uri: banners[3],
            }}
          />
        </TouchableNativeFeedback>
        {rowFour.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowFour.data &&
          rowFour.data.length > 0 && (
            <View>
              <ProductRow products={rowFour.data} />
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

export default Betadine;

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
