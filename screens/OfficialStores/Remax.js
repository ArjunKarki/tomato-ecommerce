import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Woo } from "../../API";
import {
  ProductGrid,
  ProductGridPlaceholder,
  ProductRow,
  ProductRowPlaceholder,
  Title,
} from "../../components";
import { CONFIG, hp } from "../../constants";
import { THEME } from "../../DynamicStyle/style";
import { useStoreMultiTag } from "../../hooks/useStoreMultiTag";
import { useStoreBrand } from "../../hooks/useStoreBrand";
import { useStoreTag } from "../../hooks/useStoreTag";
const WIDTH = CONFIG.width;
const cat_width = WIDTH > 700 ? 10 : 5;
const category = hp.getStoresCatIcons();

const tagId = {
  rowOne: [3428],
  rowTwo: [152],
  rowThree: [1278, 85, 1721],
  rowFour: [152],
};

const brandId = 928;

const banners = {
  r1:
    "https://tomato.com.mm/wp-content/uploads/2020/07/viber_image_2020-07-22_16-52-42-1024x481.jpg",
  r2: "https://tomato.com.mm/wp-content/uploads/2020/07/2-7-1024x448.jpg",
  r3: "https://tomato.com.mm/wp-content/uploads/2020/07/3-7-1024x448.jpg",
  r4: "https://tomato.com.mm/wp-content/uploads/2020/07/4-8-1024x448.jpg",
  r5: "https://tomato.com.mm/wp-content/uploads/2020/07/5-5-1024x448.jpg",
};

const Remax = ({ navigation, route }) => {
  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  const storeId = route.params.id;

  const rowOne = useStoreMultiTag(storeId, tagId.rowOne);
  const rowTwo = useStoreMultiTag(storeId, tagId.rowTwo);
  const rowThree = useStoreMultiTag(storeId, tagId.rowThree);
  const rowFour = useStoreMultiTag(storeId, tagId.rowFour);
  const brand = useStoreBrand(brandId);

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

  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef}>
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners.r1,
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
            style={styles.banner_wrapper}
            source={{
              uri: banners.r2,
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
            style={styles.banner_wrapper}
            source={{
              uri: banners.r3,
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
            style={styles.banner_wrapper}
            source={{
              uri: banners.r4,
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

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r5,
            }}
          />
        </TouchableNativeFeedback>
        {brand.loading ? (
          <ProductRowPlaceholder />
        ) : (
          brand.data &&
          brand.data.length > 0 && (
            <View>
              <ProductRow products={brand.data} />
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

export default Remax;
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
