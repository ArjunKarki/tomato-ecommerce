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
import { useStoreBrand } from "../../hooks/useStoreBrand";
import { useStoreTag } from "../../hooks/useStoreTag";
const WIDTH = CONFIG.width;
const cat_width = WIDTH > 700 ? 10 : 5;
const category = hp.getStoresCatIcons();

const banners = [
  "https://tomato.com.mm/wp-content/uploads/2020/07/viber_image_2020-07-15_10-38-02-1024x549.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/viber_image_2020-07-14_13-00-19-1024x451.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/viber_image_2020-07-14_13-47-42-1024x452.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/viber_image_2020-06-29_20-02-24-1024x449.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/200630-Bear-Brand-Highlight-section-banner-for-web-1024x450.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/Cerelac_Multigrain_banner-1-1024x450.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/Croller-Banner-1920-x-160-03-1024x450.png",
  "https://tomato.com.mm/wp-content/uploads/2020/07/1920-x-160-03-1024x450.png",
  "https://tomato.com.mm/wp-content/uploads/2020/11/nescafe-1024x394.jpg",
];

const rowIds = {
  rowOne: 235,
  rowTwo: 255,
  rowThree: 254,
  rowFour: 256,
  rowFive: 259,
  rowSix: 260,
  rowSeven: 261,
  rowEight: 4878,
};
const brandId = 234;

const Nestle = ({ navigation, route }) => {
  const storeId = route.params.id;
  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  const toCategory = (index) => {
    if (layouts[index]) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: layouts[index] - 10, //reduce header size as header is blocking the section
        animated: true,
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, []);

  const addLayoutAxis = (y, i) => {
    let _newArr = [...layouts];
    _newArr[i] = y;
    setLayouts(_newArr);
  };

  const rowOne = useStoreBrand(rowIds.rowOne);
  const rowTwo = useStoreBrand(rowIds.rowTwo);
  const rowThree = useStoreBrand(rowIds.rowThree);
  const rowFour = useStoreBrand(rowIds.rowFour);
  const rowFive = useStoreBrand(rowIds.rowFive);
  const rowSix = useStoreBrand(rowIds.rowSix);
  const rowSeven = useStoreBrand(rowIds.rowSeven);
  const rowEight = useStoreTag(storeId, rowIds.rowEight);
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
        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners[6],
            }}
          />
        </TouchableNativeFeedback>
        {rowSix.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowSix.data &&
          rowSix.data.length > 0 && (
            <View>
              <ProductRow products={rowSix.data} />
            </View>
          )
        )}

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners[7],
            }}
          />
        </TouchableNativeFeedback>
        {rowSeven.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowSeven.data &&
          rowSeven.data.length > 0 && (
            <View>
              <ProductRow products={rowSeven.data} />
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

export default Nestle;

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
