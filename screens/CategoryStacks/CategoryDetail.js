import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { THEME, TYPO } from "../../DynamicStyle/style";
import { hp } from "../../constants";
import { CONFIG } from "../../constants/";
import {
  FetchCategoryProducts,
  RefreshCategoryProducts,
  FetchFlashDealsCategoryProducts,
  RefreshFlashDealsProducts,
  FetchBySorting,
  ResetCategoryProducts,
} from "../../redux/actions/CategoryProductsAction";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import placeholderImg from "../../assets/images/placeholder.jpg";
import {
  Placeholder,
  Fade,
  PlaceholderMedia,
  PlaceholderLine,
} from "rn-placeholder";
import CImage from "../../components/CImage";
import CountDown from "react-native-countdown-component";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { FlashDealCountDown } from "../../components";

const { height, width } = CONFIG;

export default function CategoryDetail({ navigation, route }) {
  const Category = route.params.SCategory;
  const countDown = route.params.countDown;

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: Category.name });
    if (Category.name === "Flash Deals") {
      dispatch(FetchFlashDealsCategoryProducts(page));
    } else if (Category.name === "Popular") {
      dispatch(FetchBySorting(Category.id, page));
    } else {
      dispatch(FetchCategoryProducts(Category.id, page));
    }

    return () => {
      setPage(1);
      dispatch(ResetCategoryProducts());
    };
  }, []);

  const { categoryProducts } = useSelector((state) => state, shallowEqual);

  const listData = useMemo(() => {
    return categoryProducts.data.filter(
      (item) => item.price.length && item.price !== "0"
    );
  }, [categoryProducts.data]);

  // useEffect(() => {
  //   if (listData.length % 2 !== 0) {
  //     handleLoadMore();
  //   }
  // }, [listData]);

  const handleOnRefresh = useCallback(() => {
    setPage(1);
    if (!categoryProducts.refreshing) {
      if (Category.name === "Flash Deals") {
        dispatch(RefreshFlashDealsProducts());
      } else if (Category.name === "Popular") {
        dispatch(FetchBySorting(Category.id, page));
      } else {
        dispatch(RefreshCategoryProducts(Category.id));
      }
    }
  }, [categoryProducts.refreshing]);

  const handleLoadMore = useCallback(() => {
    if (!categoryProducts.loading) {
      setPage((previousPage) => previousPage + 1);
      if (Category.name === "Flash Deals") {
        dispatch(FetchFlashDealsCategoryProducts(page));
      } else if (Category.name === "Popular") {
        dispatch(FetchBySorting(Category.id, page));
      } else {
        dispatch(FetchCategoryProducts(Category.id, page));
      }
    }
  }, [categoryProducts.loading]);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: THEME.background,
          padding: 8,
        }}
      >
        {/* Flash Deal Countdown */}
        {Category.name === "Flash Deals" ? (
          <View style={[styles.countdownWrapper]}>
            <FlashDealCountDown
              until={countDown.expired_date}
              size={15}
              textColor={"#fff"}
              backgroundColor={THEME.primary}
              separatorColor={THEME.primary}
            />
          </View>
        ) : (
          <></>
        )}

        {categoryProducts.loading && page === 1 ? (
          <View>
            <Placeholder
              Animation={Fade}
              Left={(props) => (
                <PlaceholderMedia
                  style={{ width: (width - 48) / 2, height: 200, margin: 8 }}
                />
              )}
              Right={(props) => (
                <PlaceholderMedia
                  style={{ width: (width - 48) / 2, height: 200, margin: 8 }}
                />
              )}
            ></Placeholder>
            <Placeholder
              Animation={Fade}
              Left={(props) => (
                <PlaceholderMedia
                  style={{ width: (width - 48) / 2, height: 200, margin: 8 }}
                />
              )}
              Right={(props) => (
                <PlaceholderMedia
                  style={{ width: (width - 48) / 2, height: 200, margin: 8 }}
                />
              )}
            ></Placeholder>
            <Placeholder
              Animation={Fade}
              Left={(props) => (
                <PlaceholderMedia
                  style={{ width: (width - 48) / 2, height: 200, margin: 8 }}
                />
              )}
              Right={(props) => (
                <PlaceholderMedia
                  style={{ width: (width - 48) / 2, height: 200, margin: 8 }}
                />
              )}
            ></Placeholder>
          </View>
        ) : categoryProducts.data.length || listData.length ? (
          /* Products */
          <FlatList
            initialNumToRender={15}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            numColumns={width > 599 ? 3 : 2}
            data={listData}
            extraData={categoryProducts.data}
            refreshControl={
              <RefreshControl
                refreshing={categoryProducts.refreshing}
                onRefresh={() => {
                  handleOnRefresh();
                }}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductDetailScreen", { id: item.id });
                }}
                style={{
                  width: width > 599 ? (width - 28) / 3 : (width - 22) / 2,
                  padding: 8,
                  borderRadius: 3,
                  marginRight:
                    width > 599
                      ? index + (1 % 3) !== 0 || index + (1 % 2) !== 0
                        ? 6
                        : 0
                      : index % 2 !== 0
                      ? 0
                      : 6,
                  marginBottom: 8,
                  backgroundColor: "#fff",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    maxHeight: 120,
                  }}
                >
                  <CImage imgUrl={item.images} />
                </View>

                <View
                  style={{
                    width: "100%",
                    paddingTop: 8,
                  }}
                >
                  <Text
                    style={{
                      ...TYPO.h5,
                      color: THEME.text_primary,
                      marginBottom: 5,
                    }}
                  >
                    {item.name}
                  </Text>

                  {Category.name == "Flash Deals" ? (
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      {item.price == item.regular_price &&
                      item.sale_price.length ? (
                        <Text
                          style={[
                            styles.priceText,
                            {
                              color: THEME.primary,
                            },
                          ]}
                        >
                          {hp.moneyFormat(item.sale_price)} Ks
                        </Text>
                      ) : null}

                      {item.price !== item.regular_price ||
                      !item.sale_price.length ? (
                        <Text
                          style={[
                            styles.priceText,
                            {
                              color: THEME.primary,
                            },
                          ]}
                        >
                          {hp.moneyFormat(item.price)} Ks
                        </Text>
                      ) : null}

                      {item.price != item.regular_price &&
                        item.regular_price != 0 && (
                          <Text
                            style={[
                              styles.priceText,
                              {
                                color: THEME.backgroundColor,
                                textDecorationLine: "line-through",
                                marginLeft: 10,
                              },
                            ]}
                          >
                            {hp.moneyFormat(item.regular_price)} Ks
                          </Text>
                        )}

                      {item.regular_price == item.price &&
                      item.sale_price.length ? (
                        <Text
                          style={[
                            styles.priceText,
                            {
                              color: THEME.backgroundColor,
                              textDecorationLine: "line-through",
                              marginLeft: 10,
                            },
                          ]}
                        >
                          {hp.moneyFormat(item.price)} Ks
                        </Text>
                      ) : null}
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={[
                          styles.priceText,
                          {
                            color: THEME.primary,
                          },
                        ]}
                      >
                        {hp.moneyFormat(item.price)} Ks
                      </Text>
                    </View>
                  )}

                  {/* store */}
                  {item.store ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          height: 25,
                          width: 25,
                          marginRight: 5,
                        }}
                      >
                        <Image
                          source={require("../../assets/dummy/stores/crown.jpeg")}
                          style={{
                            height: "100%",
                            width: "100%",
                            resizeMode: "contain",
                          }}
                        />
                      </View>

                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "Roboto-Regular",
                            color: THEME.text_secondary,
                          }}
                        >
                          {item.store.name}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            )}
            // ListFooterComponent={() => {
            //   return categoryProducts.loading ? (
            //     <View style={{ height: 20, alignItems: "center" }}>
            //       <ActivityIndicator color={THEME.secondary} size="small" />
            //     </View>
            //   ) : null;
            // }}
            // onEndReached={() => {
            //   handleLoadMore();
            // }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Regular",
              }}
            >
              There is no products available.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  countdownWrapper: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  priceText: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold",
    marginBottom: 5,
  },
});
