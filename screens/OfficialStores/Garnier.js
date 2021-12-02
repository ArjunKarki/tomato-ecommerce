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
  rowOne: [3046, 3842],
  rowTwo: [1036, 1922],
  // r1: 3046,
  // r11: 3842,
  // r2: 1036,
  // r21: 1922,
  r3: 2419,
  r4: 2435,
  r5: 2422,
  r6: 2451,
  r7: 2444,
  r8: 2439,
  r9: 629,
  r10: 1146,
};

const brandId = 333;

const banners = {
  r1:
    "https://tomato.com.mm/wp-content/uploads/2020/07/Banner-1.Mask-750-x-376-copy.jpg",
  r2:
    "https://tomato.com.mm/wp-content/uploads/2020/06/Banner-5.Pure-Active-750-x-376-copy.jpg",
  r3:
    "https://tomato.com.mm/wp-content/uploads/2020/06/Banner-6.Ageless-White-750-x-376-copy-1.jpg",
  r4: "https://tomato.com.mm/wp-content/uploads/2020/06/Banner-3-LC-copy.jpg",
  r5:
    "https://tomato.com.mm/wp-content/uploads/2020/06/Banner-8.-Power-White-750-x-376-copy.jpg",
  r6:
    "https://tomato.com.mm/wp-content/uploads/2020/06/Banner-9.Turbo-Light-750-x-376-copy.jpg",
  r7:
    "https://tomato.com.mm/wp-content/uploads/2020/06/Banner-7.Acno-Fight-750-x-376-copy.jpg",
  r8:
    "https://tomato.com.mm/wp-content/uploads/2020/06/Banner-4.-Sakura-750-x-376-copy.jpg",
  r9:
    "https://tomato.com.mm/wp-content/uploads/2020/06/Banner-2.-Micella-Water-750-x-376-copy.jpg",
};

const Garnier = ({ navigation, route }) => {
  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, []);

  const storeId = route.params.id;

  const rowOne = useStoreMultiTag(storeId, tagId.rowOne);
  const rowTwo = useStoreMultiTag(storeId, tagId.rowTwo);

  // const {
  //   data: rOneFirstData,
  //   error: rOneFirstError,
  //   loading: rOneFirstLoading,
  // } = useStoreTag(storeId, tagId.r1);

  // const {
  //   data: rOneSecondData,
  //   error: rOneSecondError,
  //   loading: rOneSecondLoading,
  // } = useStoreTag(storeId, tagId.r11);

  // const {
  //   data: rTwoFirstData,
  //   error: rTwoFirstError,
  //   loading: rTwoFirstLoading,
  // } = useStoreTag(storeId, tagId.r2);

  // const {
  //   data: rTwoSecondData,
  //   error: rTwoSecondError,
  //   loading: rTwoSecondLoading,
  // } = useStoreTag(storeId, tagId.r21);

  // useEffect(() => {
  //   if (!rOneFirstLoading && !rOneSecondLoading) {
  //     let _data = rOneFirstData;
  //     _data = [..._data, ...rOneSecondData];
  //     setROneData(_data);
  //     setROneLoading(false);
  //   }
  // }, [rOneFirstLoading, rOneSecondLoading]);

  // useEffect(() => {
  //   if (!rTwoFirstLoading && !rTwoSecondLoading) {
  //     let _data = rTwoFirstData;

  //     _data = [..._data, ...rTwoSecondData];
  //     setRTwoData(_data);
  //     setRTwoLoading(false);
  //   }
  // }, [rTwoFirstLoading, rTwoSecondLoading]);

  const {
    data: rThreeData,
    error: rThreeError,
    loading: rThreeLoading,
  } = useStoreTag(storeId, tagId.r3);

  const {
    data: rFourData,
    error: rFourError,
    loading: rFourLoading,
  } = useStoreTag(storeId, tagId.r4);

  const {
    data: rFiveData,
    error: rFiveError,
    loading: rFiveLoading,
  } = useStoreTag(storeId, tagId.r5);

  const {
    data: rSixData,
    error: rSixError,
    loading: rSixLoading,
  } = useStoreTag(storeId, tagId.r6);

  const {
    data: rSevenData,
    error: rSevenError,
    loading: rSevenLoading,
  } = useStoreTag(storeId, tagId.r7);

  const {
    data: rEightData,
    error: rEightError,
    loading: rEightLoading,
  } = useStoreTag(storeId, tagId.r8);

  const {
    data: rNineData,
    error: rNineError,
    loading: rNineLoading,
  } = useStoreTag(storeId, tagId.r9);

  const {
    data: rTenData,
    error: rTenError,
    loading: rTenLoading,
  } = useStoreTag(storeId, tagId.r10);

  const brand = useStoreBrand(brandId);

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
        {/* {rOneLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rOneData &&
          rOneData.length > 0 && (
            <View
              onLayout={(event) => {
                addLayoutAxis(event.nativeEvent.layout.y, 4);
              }}
            >
              <ProductRow products={rOneData} title="PROMOTIONS" />
            </View>
          )
        )} */}
        {rowOne.loading ? (
          <ProductRowPlaceholder />
        ) : rowOne && rowOne.data.length ? (
          <View
            onLayout={(event) => {
              addLayoutAxis(event.nativeEvent.layout.y, 4);
            }}
          >
            <ProductRow products={rowOne.data} title="PROMOTIONS" />
          </View>
        ) : null}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r1,
            }}
          />
        </TouchableNativeFeedback>
        {/* {rTwoLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rTwoData &&
          rTwoData.length > 0 && (
            <View>
              <ProductRow products={rTwoData} />
            </View>
          )
        )} */}
        {rowTwo.loading ? (
          <ProductRowPlaceholder />
        ) : rowTwo.data && rowTwo.data.length ? (
          <View>
            <ProductRow products={rowTwo.data} />
          </View>
        ) : null}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r2,
            }}
          />
        </TouchableNativeFeedback>
        {rThreeLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rThreeData &&
          rThreeData.length > 0 && (
            <View>
              <ProductRow products={rThreeData} />
            </View>
          )
        )}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r3,
            }}
          />
        </TouchableNativeFeedback>
        {rFourLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rFourData &&
          rFourData.length > 0 && (
            <View>
              <ProductRow products={rFourData} />
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
        {rFiveLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rFiveData &&
          rFiveData.length > 0 && (
            <View>
              <ProductRow products={rFiveData} />
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
        {rSixLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rSixData &&
          rSixData.length > 0 && (
            <View>
              <ProductRow products={rSixData} />
            </View>
          )
        )}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r6,
            }}
          />
        </TouchableNativeFeedback>
        {rSevenLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rSevenData &&
          rSevenData.length > 0 && (
            <View>
              <ProductRow products={rSevenData} />
            </View>
          )
        )}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r7,
            }}
          />
        </TouchableNativeFeedback>
        {rEightLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rEightData &&
          rEightData.length > 0 && (
            <View>
              <ProductRow products={rEightData} />
            </View>
          )
        )}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r8,
            }}
          />
        </TouchableNativeFeedback>
        {rNineLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rNineData &&
          rNineData.length > 0 && (
            <View>
              <ProductRow products={rNineData} />
            </View>
          )
        )}
        <TouchableNativeFeedback style={styles.banner_wrapper}>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners.r9,
            }}
          />
        </TouchableNativeFeedback>

        {rTenLoading ? (
          <ProductRowPlaceholder />
        ) : (
          rTenData &&
          rTenData.length > 0 && (
            <View>
              <ProductRow products={rTenData} />
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

        {/* {filterData && filterData.length > 0 && (
          <View>
            <ProductRow products={filterData} />
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Garnier;
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
