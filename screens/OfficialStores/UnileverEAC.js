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
import { useStore } from "react-redux";
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
import { useStoreMultiBrand } from "../../hooks/useStoreMultiBrand";

const WIDTH = CONFIG.width;
const cat_width = WIDTH > 700 ? 10 : 5;
const category = hp.getStoresCatIcons();

const tagId = {
  stayHomePersonalCare: 3951,
};

const brandId = {
  eLan: 950,
  familyCare: 951,
  lux: 941,
  lifebouy: 939,
  miss: 1092,
  sunsilk: 945,
  clear: 947,
  fairLovely: 1090,
  vaseline: 946,
  ponds: 1058,
  knorr: 952,
};

const brandArr = [950, 951, 941, 939, 1092, 945, 947, 1090, 946, 1058, 952];

const banners = {
  r1:
    "https://tomato.com.mm/wp-content/uploads/2020/07/viber_image_2020-07-07_13-43-23-1024x549.jpg",
  r2:
    "https://tomato.com.mm/wp-content/uploads/2020/07/45039258_1976345775768207_4515309035364286464_o-1024x576.jpg",
  r3:
    "https://tomato.com.mm/wp-content/uploads/2020/07/105355303_807137663026554_7074092013835870377_n.png",
  r4:
    "https://tomato.com.mm/wp-content/uploads/2020/07/Magical-Spell-Main-KV-1024x512.jpg",
  r5:
    "https://tomato.com.mm/wp-content/uploads/2020/07/29244555_806495452867918_4666402995540328448_o-1024x390.jpg",
  r6:
    "https://tomato.com.mm/wp-content/uploads/2020/07/83620049_1578585325643014_7542877089627401818_n.png",
  r7:
    "https://tomato.com.mm/wp-content/uploads/2020/07/20767734_1984277351589788_3833027931320768641_n.png",
  r8:
    "https://tomato.com.mm/wp-content/uploads/2020/07/56196810_1223392581144525_3076402443248992256_o-1024x390.jpg",
  r9:
    "https://tomato.com.mm/wp-content/uploads/2020/07/55752522_2104516439627356_5338064863350489088_o-1024x390.jpg",
  r10:
    "https://tomato.com.mm/wp-content/uploads/2020/07/75349089_2421721268092095_9188345869886291968_n.jpg",
  r11:
    "https://tomato.com.mm/wp-content/uploads/2020/07/92670829_3476434749049608_830404275682148352_n-1.jpg",
  r12:
    "https://tomato.com.mm/wp-content/uploads/2020/07/65487132_2361287757247713_540545509924798464_o-1024x390.jpg",
};

const UnileverEAC = ({ navigation, route }) => {
  let scrollViewRef = useRef(null);
  const storeId = route.params.id;

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
    data: stayHomePersonalCareData,
    error: stayHomePersonalCareError,
    loading: stayHomePersonalCareLoading,
  } = useStoreTag(storeId, tagId.stayHomePersonalCare);

  const rowTwo = useStoreBrand(brandId.eLan);
  const rowThree = useStoreBrand(brandId.familyCare);
  const rowFour = useStoreBrand(brandId.lux);
  const rowFive = useStoreBrand(brandId.lifebouy);
  const rowSix = useStoreBrand(brandId.miss);
  const rowSeven = useStoreBrand(brandId.sunsilk);
  const rowEight = useStoreBrand(brandId.clear);
  const rowNine = useStoreBrand(brandId.fairLovely);
  const rowTen = useStoreBrand(brandId.vaseline);
  const rowEleven = useStoreBrand(brandId.ponds);
  const rowTwelve = useStoreBrand(brandId.knorr);

  const brand = useStoreMultiBrand(brandArr);

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
        {stayHomePersonalCareLoading ? (
          <ProductRowPlaceholder />
        ) : (
          stayHomePersonalCareData &&
          stayHomePersonalCareData.length > 0 && (
            <View>
              <ProductRow products={stayHomePersonalCareData} />
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
              uri: banners.r6,
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
              uri: banners.r7,
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

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r8,
            }}
          />
        </TouchableNativeFeedback>
        {rowEight.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowEight.data &&
          rowEight.data.length > 0 && (
            <View>
              <ProductRow products={rowEight.data} />
            </View>
          )
        )}

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r9,
            }}
          />
        </TouchableNativeFeedback>
        {rowNine.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowNine.data &&
          rowNine.data.length > 0 && (
            <View>
              <ProductRow products={rowNine.data} />
            </View>
          )
        )}

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r10,
            }}
          />
        </TouchableNativeFeedback>
        {rowTen.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowTen.data &&
          rowTen.data.length > 0 && (
            <View>
              <ProductRow products={rowTen.data} />
            </View>
          )
        )}

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r11,
            }}
          />
        </TouchableNativeFeedback>
        {rowEleven.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowEleven.data &&
          rowEleven.data.length > 0 && (
            <View>
              <ProductRow products={rowEleven.data} />
            </View>
          )
        )}

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r12,
            }}
          />
        </TouchableNativeFeedback>
        {rowTwelve.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowTwelve.data &&
          rowTwelve.data.length > 0 && (
            <View>
              <ProductRow products={rowTwelve.data} />
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

export default UnileverEAC;

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
