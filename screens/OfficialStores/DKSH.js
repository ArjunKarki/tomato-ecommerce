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

const brandIds = [
  875,
  1601,
  851,
  3389,
  3390,
  3391,
  873,
  872,
  1199,
  862,
  854,
  852,
  866,
];
const banners = [
  "https://tomato.com.mm/wp-content/uploads/2020/07/DKSH-LOGO-1024x513.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/107027330_3172044306193966_6942540820079919265_o-1024x390.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/83327816_1341154729428771_1335838595465871360_o-1024x390.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/67303260_1183655541807054_2006801500298280960_o-1024x389.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/20861621_464328867258753_3836946044945351261_o-1024x379.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/22729200_538705073144272_6026912472195937358_n.png",
  "https://tomato.com.mm/wp-content/uploads/2020/07/maxresdefault-1024x576.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/18011108_10154564984447076_4373032154144266050_n.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/18424094_1559655510742906_5387478268821362803_n.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/90581077_1985318648259764_5070875742435278848_o-1024x334.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/unnamed.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/53584672_1108749419296487_5953355272515747840_n.png",
  "https://tomato.com.mm/wp-content/uploads/2020/07/35646173_1339023776197418_2473524253345972224_o-1024x406.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/72719346_2127285617565294_5357438421440659456_o-1024x386.jpg",
  "https://tomato.com.mm/wp-content/uploads/2020/07/96161025_105630764482760_7353812733281697792_n.jpg",
];

const DKSH = ({ navigation, route }) => {
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

  const rowId = {
    rowOne: "875",
    rowTwo: "1601",
    rowThree: "851",
    rowFour: "3389",
    rowFive: "3390",
    rowSix: "3391",
    rowSeven: "873",
    rowEight: "872",
    rowNine: "1199",
    rowTen: "862",
    rowEleven: "854",
    rowTwelve: "852",
    rowThirteen: "866",
  };

  const rowOne = useStoreBrand(rowId.rowOne);
  const rowTwo = useStoreBrand(rowId.rowTwo);
  const rowThree = useStoreBrand(rowId.rowThree);
  const rowFour = useStoreBrand(rowId.rowFour);
  const rowFive = useStoreBrand(rowId.rowFive);
  const rowSix = useStoreBrand(rowId.rowSix);
  const rowSeven = useStoreBrand(rowId.rowSeven);
  const rowEight = useStoreBrand(rowId.rowEight);
  const rowNine = useStoreBrand(rowId.rowNine);
  const rowTen = useStoreBrand(rowId.rowTen);
  const rowEleven = useStoreBrand(rowId.rowEleven);
  const rowTwelve = useStoreBrand(rowId.rowTwelve);
  const rowThirteen = useStoreBrand(rowId.rowThirteen);

  const brand = useStoreMultiBrand(brandIds);

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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
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
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[8],
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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[9],
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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[10],
            }}
          />
        </TouchableNativeFeedback>
        {rowTen.loading ? (
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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[11],
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
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[12],
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
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[13],
            }}
          />
        </TouchableNativeFeedback>
        {rowThirteen.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowThirteen.data &&
          rowThirteen.data.length > 0 && (
            <View>
              <ProductRow products={rowThirteen.data} />
            </View>
          )
        )}
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[13],
            }}
          />
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper, { marginBottom: 0 }]}
            source={{
              uri: banners[14],
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

export default DKSH;

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
