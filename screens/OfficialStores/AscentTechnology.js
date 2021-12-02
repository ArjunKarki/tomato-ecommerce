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

const brandIds = {
  rowOne: "3858",
  rowTwo: "3882",
  rowThree: "3854",
  rowFour: "3855",
  rowFive: "3856",
  rowSix: "3857",
  rowSeven: "3859",
};

const brands = [3857, 3882, 3854, 3855, 3856, 3857, 3859];

const banners = [
  "https://tomato.com.mm/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-16-at-10.33.50-AM-1024x390.jpeg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-16-at-10.33.50-AM-1024x390.jpeg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-16-at-10.33.50-AM-1024x390.jpeg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-16-at-10.33.50-AM-1024x390.jpeg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-16-at-10.33.50-AM-1024x390.jpeg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-16-at-10.33.50-AM-1024x390.jpeg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-16-at-10.33.50-AM-1024x390.jpeg",
  "https://tomato.com.mm/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-16-at-10.33.50-AM-1024x390.jpeg",
];

const AscentTechnology = ({ navigation, route }) => {
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

  const rowOne = useStoreBrand(brandIds.rowOne);
  const rowTwo = useStoreBrand(brandIds.rowTwo);
  const rowThree = useStoreBrand(brandIds.rowThree);
  const rowFour = useStoreBrand(brandIds.rowFour);
  const rowFive = useStoreBrand(brandIds.rowFive);
  const rowSix = useStoreBrand(brandIds.rowSix);
  const rowSeven = useStoreBrand(brandIds.rowSeven);

  const brand = useStoreMultiBrand(brands);

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
        </View>
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

export default AscentTechnology;

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
