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
const WIDTH = CONFIG.width;
const cat_width = WIDTH > 700 ? 10 : 5;
const category = hp.getStoresCatIcons();

const tagId = {
  fitme: 2765,
  hyperCurl: 2939,
  sensational: 2940,
};

const brandId = 1148;

const banners = {
  r1:
    "https://tomato.com.mm/wp-content/uploads/2020/07/Main-1st-Banner-1-1024x450.jpg",
  r2: "https://tomato.com.mm/wp-content/uploads/2020/07/Main-2nd-Banner-.jpg",
  r3:
    "https://tomato.com.mm/wp-content/uploads/2020/07/Main-3rd-Banner-Hypercurl-2000-x-878-1024x447.jpg",
  r4:
    "https://tomato.com.mm/wp-content/uploads/2020/07/viber_image_2020-07-02_15-39-54-1024x256.jpg",
  r5:
    "https://tomato.com.mm/wp-content/uploads/2020/07/Main-5th-Banner-Hypersharp-1200-x-300-1024x255.jpg",
};

const Maybelline = ({ navigation, route }) => {
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

  const {
    data: fitmeData,
    error: fitmeError,
    loading: fitmeLoading,
  } = useStoreTag(storeId, tagId.fitme);

  const {
    data: hyperCurlData,
    error: hyperCurlError,
    loading: hyperCurlLoading,
  } = useStoreTag(storeId, tagId.hyperCurl);

  const {
    data: sensationalData,
    error: sensationalError,
    loading: sensationalLoading,
  } = useStoreTag(storeId, tagId.sensational);

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
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r1,
            }}
          />
        </TouchableNativeFeedback>
        {fitmeLoading ? (
          <ProductRowPlaceholder />
        ) : (
          fitmeData &&
          fitmeData.length > 0 && (
            <View>
              <ProductRow products={fitmeData} />
            </View>
          )
        )}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r2,
            }}
          />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r3,
            }}
          />
        </TouchableNativeFeedback>
        {hyperCurlLoading ? (
          <ProductRowPlaceholder />
        ) : (
          hyperCurlData &&
          hyperCurlData.length > 0 && (
            <View>
              <ProductRow products={hyperCurlData} />
            </View>
          )
        )}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r4,
            }}
          />
        </TouchableNativeFeedback>
        {sensationalLoading ? (
          <ProductRowPlaceholder />
        ) : (
          sensationalData &&
          sensationalData.length > 0 && (
            <View>
              <ProductRow products={sensationalData} />
            </View>
          )
        )}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r5,
            }}
          />
        </TouchableNativeFeedback>
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

export default Maybelline;

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
