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

const brandId = 1810;
const banners = [
  "https://tomato.com.mm/wp-content/uploads/2020/10/covid-safety-1024x315.jpg",
];

const rowIds = {
  rowOne: 4671,
  rowTwo: 4817,
};

const CovidSafetyPackage = ({ navigation, route }) => {
  const storeId = route.params.id;
  let scrollViewRef = useRef(null);
  const [layouts, setLayouts] = useState([]);

  const rowOne = useStoreTag(storeId, rowIds.rowOne);
  const rowTwo = useStoreTag(storeId, rowIds.rowTwo);

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

        {rowOne.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowOne.data &&
          rowOne.data.length > 0 && (
            <View>
              <ProductRow
                title="COVID SAFETY PACKAGES"
                products={rowOne.data}
              />
            </View>
          )
        )}
        {rowTwo.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowTwo.data &&
          rowTwo.data.length > 0 && (
            <View>
              <ProductRow
                title="COVID SAFETY ESSENTIALS"
                products={rowTwo.data}
              />
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CovidSafetyPackage;

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
