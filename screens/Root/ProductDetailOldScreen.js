import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Tab, Tabs, Picker, Textarea, Form } from "native-base";

import { Rating, AirbnbRating } from "react-native-ratings";

import Swiper from "react-native-swiper";
import { Container, Header, Quantity, ProductCard } from "../../components";
import ImageViewer from "react-native-image-zoom-viewer";
import { CONFIG, hp } from "../../constants";
import { THEME } from "../../DynamicStyle/style";
import { FontAwesome as FAIcon } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
// import { Picker } from "@react-native-community/picker";
import { Woo } from "../../API";
import placeholder from "../../assets/images/placeholder.jpg";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { useDispatch, useSelector } from "react-redux";
import {
  AddWishlist,
  RemoveWishList,
} from "../../redux/actions/wishListActions";
import { addPromoProduct, AddToCard } from "../../redux/actions/CartAction";
import { ActivityIndicator } from "react-native-paper";
import Axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const PoductDetailScreen = ({ navigation, route }) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wishlist);
  const account = useSelector((state) => state.accountDetails);
  const { loading: cartLoading, error } = useSelector((state) => state.cart);
  // const a = wishList.some((wl) => wl.id == id)

  const [state, setState] = useState({
    initialImg: 0,
    images: [],
    imageModal: false,
    review: [],
    isLoading: true,
    product: null,
    product_review: "",
    rating: 0,
    reviewLoading,
  });

  const [headerBarHeight, setHeaderBarHeight] = useState(0);

  const [qty, setQty] = useState(1);

  const [reviewing, setReviewing] = useState(false);
  let source = Axios.CancelToken.source();

  useEffect(() => {
    getData();

    return () => {
      source.cancel();
    };
  }, []);

  function getData() {
    Woo.get(`product/${id}`, { cancelToken: source.token })
      .then(({ data }) => {
        const product = data;
        console.log("data", product);
        let images = [];
        if (product.images && product.images.length > 0) {
          product.images.map((img) => {
            images.push({ url: img });
          });
        }
        setState({ ...state, isLoading: false, images, product });
      })
      .catch((e) => {
        if (Axios.isCancel(e)) {
        } else {
          setState({ ...state, isLoading: false });
          console.log(e, id);
        }
      });
  }

  const onImagePress = (index) => {
    setState({ ...state, imageModal: true, initialImg: index });
  };

  const handleFavourite = () => {
    if (isFav) {
      dispatch(RemoveWishList(state.product.id));
    } else {
      dispatch(AddWishlist(state.product));
    }
  };

  const onSubmitReview = () => {
    if (!account.data.id) {
      alert("Please Login first to review.");
      return;
    }

    if (rating == 0 || product_review == "") {
      alert("Add review data first.");
      return;
    }
    setState({ ...state, reivewLoading: false });
    Woo.post(`/reviews`, {
      product_id: product.id,
      reviewer: "tester",
      review: product_review,
      reviewer_email: "tes@test.com",
      rating: rating,
    })
      .then(({ data }) => {
        setState({ ...state, reviewLoading: false });
      })
      .catch((e) => setState({ ...state, reviewing: false }));
  };

  const onAddToCart = () => {
    if (
      product.shipping_class &&
      product.shipping_class == "12-12-free-shipping"
    ) {
      dispatch(addPromoProduct(product));
    }

    dispatch(AddToCard({ product_id: product.id, quantity: qty }));
  };

  const {
    isLoading,
    product,
    initialImg,
    images,
    imageModal,
    review,
    product_review,
    rating,
    reviewLoading,
  } = state;

  const isFav = wishList.some((wl) => wl.id == id);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  const toStore = (store) => {
    let { id, name } = store;

    let storeRoute = hp.getOfficialStoreRoute(store);
    if (storeRoute && storeRoute.route) {
      navigation.navigate(storeRoute.route, { id, name });
    } else {
      navigation.navigate("Store", { id, name });
    }
  };

  const onPlus = () => {
    if (
      product.shipping_class &&
      product.shipping_class == "12-12-free-shipping"
    ) {
      if (qty < 2) {
        setQty((qty) => qty + 1);
      }
    } else {
      setQty((qty) => qty + 1);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "android" ? "transparent" : THEME.primary,
        }}
      >
        <Placeholder
          Animation={Fade}
          style={{ backgroundColor: THEME.background }}
        >
          <PlaceholderLine
            height={CONFIG.height * 0.4}
            style={{ borderRadius: 0, marginBottom: 0 }}
          />
          <View style={{ marginTop: 10, marginHorizontal: 8 }}>
            <PlaceholderLine width={80} />
            <PlaceholderLine width={50} />

            <View style={{ marginTop: 15 }}>
              <PlaceholderLine width={20} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <PlaceholderLine width={60} />
                <PlaceholderLine width={20} />
              </View>
              <PlaceholderLine width={40} />
            </View>
            <View style={{ marginTop: 15 }}>
              <PlaceholderLine
                height={10}
                width={20}
                style={{ marginBottom: 10 }}
              />
              <PlaceholderLine
                height={50}
                style={{ marginBottom: 10, borderRadius: 5 }}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <PlaceholderLine
                height={10}
                width={20}
                style={{ marginBottom: 10 }}
              />
              <PlaceholderLine
                height={50}
                style={{ marginBottom: 10, borderRadius: 5 }}
              />
            </View>
            <PlaceholderLine
              height={50}
              width={30}
              style={{ borderRadius: 5 }}
            />
          </View>
        </Placeholder>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View style={{ flex: 1, backgroundColor: THEME.background }}>
        <Header
          visibleBack={true}
          onLayout={({ nativeEvent }) => {
            setHeaderBarHeight(nativeEvent.layout.height);
          }}
        />
        {product && (
          <Container>
            <View style={{ height: 50, backgroundColor: "#fff" }} />
            <Swiper
              dotColor={THEME.card}
              activeDotColor={THEME.primary}
              autoplay={false}
              height={CONFIG.height * 0.35}
            >
              {images.length > 0 ? (
                images.map((img, index) => (
                  <View
                    style={{
                      backgroundColor: "#fff",
                    }}
                    key={index}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => onImagePress(index)}
                    >
                      <Image
                        source={{ uri: img.url }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                    </TouchableWithoutFeedback>
                  </View>
                ))
              ) : (
                <View>
                  <Image
                    source={placeholder}
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
              )}
            </Swiper>
            <View>
              <View
                style={{
                  paddingHorizontal: 8,
                  backgroundColor: THEME.card,
                  paddingBottom: 5,
                }}
              >
                <View style={{ paddingTop: 15 }}>
                  <Text style={{ fontSize: 16, fontFamily: "Roboto-Medium" }}>
                    {product.name}
                  </Text>
                </View>

                {product.brand ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                      marginBottom: 10,
                      paddingBottom: 10,
                      borderBottomColor: "#ddd",
                      borderBottomWidth: 1,
                      borderStyle: "solid",
                    }}
                    onPress={() => toStore(product.store)}
                  >
                    <Text style={{ fontFamily: "Roboto-Medium", fontSize: 12 }}>
                      Brand :{" "}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 12,
                        color: THEME.primary,
                      }}
                    >
                      {product.brand}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontFamily: "Roboto-Bold",
                        color: THEME.primary,
                        fontSize: 15,
                      }}
                    >
                      {hp.moneyFormat(product.price)} Ks
                    </Text>
                    {product.regular_price.length &&
                    product.regular_price !== "0" &&
                    product.regular_price !== product.price ? (
                      <Text
                        style={{
                          color: THEME.text_secondary,
                          fontWeight: "bold",
                          marginTop: 5,
                          marginLeft: 10,
                          textDecorationLine: "line-through",
                        }}
                      >
                        {hp.moneyFormat(product.regular_price)} Ks
                      </Text>
                    ) : (
                      <></>
                    )}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={handleFavourite}>
                      {isFav ? (
                        <FAIcon name="heart" size={25} color={THEME.primary} />
                      ) : (
                        <FAIcon name="heart-o" size={25} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <View style={{ paddingTop: 10 }}>
                <Text style={{ fontSize: 16 }}>{product.name}</Text>
              </View> */}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  {product.store ? (
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: THEME.text_secondary,
                          fontSize: 12,
                          fontFamily: "Roboto-Medium",
                        }}
                      >
                        Sold By :{" "}
                      </Text>
                      <TouchableOpacity onPress={() => toStore(product.store)}>
                        <Text
                          style={{
                            color: THEME.text_secondary,
                            fontSize: 12,
                            color: "green",
                            fontFamily: "Roboto-Medium",
                          }}
                        >
                          {product.store.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View />
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      flex: 1,
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: THEME.text_secondary,
                        fontSize: 12,
                        fontFamily: "Roboto-Medium",
                      }}
                    >
                      Status :{" "}
                    </Text>
                    <Text
                      style={{
                        color: THEME.text_secondary,
                        fontSize: 12,
                        color: "green",
                        fontFamily: "Roboto-Medium",
                      }}
                    >
                      {product.in_stock ? "In stock" : "Preorder"}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      color: THEME.text_secondary,
                      fontSize: 12,
                      fontFamily: "Roboto-Medium",
                    }}
                  >
                    Rating :
                  </Text>

                  <AirbnbRating
                    count={5}
                    defaultRating={parseInt(product.average_rating)} //product.rating_count
                    selectedColor={THEME.primary}
                    size={16}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      color: THEME.secondary,
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    {product.average_rating}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  padding: 8,
                  backgroundColor: THEME.card,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={styles.cartWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      if (qty > 1) {
                        setQty((qty) => qty - 1);
                      }
                    }}
                    activeOpacity={0.8}
                    style={{
                      padding: 4,
                      paddingHorizontal: 8,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="minus"
                      size={24}
                      color="#aaa"
                    />
                  </TouchableOpacity>
                  <Text style={styles.qty}>{qty}</Text>
                  <TouchableOpacity
                    onPress={onPlus}
                    activeOpacity={0.8}
                    style={{
                      padding: 4,
                      paddingHorizontal: 8,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={24}
                      color="#aaa"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }} />

                <Button
                  containerStyle={{
                    flex: 2,
                  }}
                  onPress={cartLoading ? null : onAddToCart}
                  buttonStyle={{
                    backgroundColor: THEME.primary,
                    marginVertical: 8,
                  }}
                  loading={cartLoading}
                  title="Add To Cart"
                  icon={
                    <MaterialCommunityIcons
                      name="cart-outline"
                      size={24}
                      color="#fff"
                    />
                  }
                />
                <View style={{ marginBottom: 20 }}></View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  backgroundColor: THEME.card,
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Roboto-Bold",
                    color: THEME.primary,
                    marginBottom: 16,
                  }}
                >
                  DESCRIPTION
                </Text>
                <View>
                  <Text style={{ color: THEME.secondary, letterSpacing: 0.5 }}>
                    {product.description}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  padding: 8,
                  backgroundColor: THEME.card,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Roboto-Bold",
                    color: THEME.primary,
                    marginBottom: 16,
                  }}
                >
                  {`REVIEWS & RATING (${product.rating_count})`}
                </Text>
                <Button
                  title="View All"
                  onPress={() => {
                    navigation.navigate("Reviews", { product_id: id });
                  }}
                  buttonStyle={{
                    backgroundColor: THEME.primary,
                    marginVertical: 8,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 10,
                  padding: 8,
                  backgroundColor: THEME.card,
                  paddingBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Roboto-Bold",
                    color: THEME.primary,
                    marginBottom: 16,
                  }}
                >
                  SUBMIT YOUR REVIEW
                </Text>

                <View>
                  <View
                    style={{
                      marginVertical: 5,
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      Rate:
                    </Text>
                    <AirbnbRating
                      count={5}
                      reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
                      defaultRating={rating}
                      selectedColor={THEME.primary}
                      size={20}
                      showRating={false}
                      onFinishRating={(count) =>
                        setState({ ...state, rating: count })
                      }
                    />
                  </View>
                  <Textarea
                    value={product_review}
                    placeholder="Write your review here..."
                    onChangeText={(t) =>
                      setState({ ...state, product_review: t })
                    }
                    style={{
                      borderWidth: 0.5,
                      borderColor: THEME.secondary,
                      padding: 5,
                    }}
                    rowSpan={5}
                  />
                  {/* <Button
                  buttonStyle={{
                    marginTop: 10,
                    marginBottom: 5,
                    backgroundColor: THEME.primary,
                  }}
                  titleStyle={{ fontFamily: "Roboto-Bold" }}
                  title="Submit Review"
                  onPress={onSubmitReview}
                /> */}
                  <TouchableOpacity
                    onPress={onSubmitReview}
                    disabled={reviewing}
                    style={{
                      backgroundColor: THEME.primary,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      marginTop: 10,
                    }}
                  >
                    {reviewing ? (
                      <ActivityIndicator size={18} color={THEME.background} />
                    ) : (
                      <Text
                        style={{
                          color: THEME.background,
                          fontFamily: "Roboto-Bold",
                          fontSize: 18,
                          letterSpacing: 0.5,
                        }}
                      >
                        Submit Review
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {product.related_products && (
                <View style={{ marginBottom: 10, padding: 8 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Roboto-Bold",
                        color: THEME.primary,
                        marginBottom: 10,
                      }}
                    >
                      RELATED PRODUCTS
                    </Text>
                    <TouchableOpacity>
                      <Text style={{ color: THEME.text_secondary }}>
                        See More{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={product.related_products}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    nestedScrollEnabled={true}
                    renderItem={({ item, index }) => (
                      <ProductCard
                        key={index}
                        product={item}
                        onPress={() => console.log("product press")}
                      />
                    )}
                  />
                </View>
              )}
            </View>

            <Modal
              visible={imageModal}
              transparent={true}
              onRequestClose={() => {
                setState({ ...state, imageModal: false });
              }}
            >
              <ImageViewer
                imageUrls={images}
                index={initialImg}
                enableSwipeDown={true}
                onSwipeDown={() => {
                  setState({ ...state, imageModal: false });
                }}
              />
            </Modal>
          </Container>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hr: {
    width: "100%",
    height: 0.5,
    backgroundColor: THEME.secondary,
    marginVertical: 18,
  },
  spaceHorizontal: {
    paddingHorizontal: 8,
  },
  cartWrapper: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 36,
    borderColor: "#aaa",
    borderWidth: 1,
    overflow: "hidden",
  },
  qty: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default PoductDetailScreen;
