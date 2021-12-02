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
import { useStoreTag } from "../../hooks/useStoreTag";
import { useStoreBrand } from "../../hooks/useStoreBrand";
import { useStoreMultiTag } from "../../hooks/useStoreMultiTag";
import { useStoreMultiBrand } from "../../hooks/useStoreMultiBrand";
const WIDTH = CONFIG.width;
const cat_width = WIDTH > 700 ? 10 : 5;
const category = hp.getStoresCatIcons();

const tagId = {
  rowOne: 522,
  rowTwo: 2022,
  rowThree: 2023,
  rowFour: 2028,
  rowFive: [1173, 368, 244],
  rowSix: 4900,
};

const brandId = 239;

const banners = [
  "https://tomato.com.mm/wp-content/uploads/2020/07/WhatsApp-Image-2020-07-01-at-6.25.11-PM-1024x398.jpeg",
  "https://tomato.com.mm/wp-content/uploads/2020/06/Facial-Foam-1024x439.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/06/2.Ideal-White-series-1024x256.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/06/1.Magic-Cover-series-1024x256.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/06/3.-Glam-Matte-1024x256.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/0-02-06-7bcbe23b114ad492186889a14a0c6f9bfd80fd1795974bee6be0f0949da77896_4df08c25-1024x256.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/Banner-hot-items-1024x85.png",
];

const CutePress = ({ navigation, route }) => {
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

  const promotionRow = useStoreTag(storeId, tagId.rowSix);
  const rowOne = useStoreTag(storeId, tagId.rowOne);
  const rowTwo = useStoreTag(storeId, tagId.rowTwo);
  const rowThree = useStoreTag(storeId, tagId.rowThree);
  const rowFour = useStoreTag(storeId, tagId.rowFour);
  const rowFive = useStoreMultiTag(storeId, tagId.rowFive);

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

        {promotionRow.loading ? (
          <ProductRowPlaceholder />
        ) : (
          promotionRow.data &&
          promotionRow.data.length > 0 && (
            <View>
              <ProductRow title="PROMOTIONS" products={promotionRow.data} />
            </View>
          )
        )}

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
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
              <ProductRow products={rowOne.data} />
            </View>
          )
        )}
        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners[2],
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
              uri: banners[3],
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
              uri: banners[4],
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
              uri: banners[5],
            }}
          />
        </TouchableNativeFeedback>

        {rowFive.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowFive.data &&
          rowFive.data.length > 0 && (
            <View>
              <ProductRow products={rowFive.data} />
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

export default CutePress;

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
