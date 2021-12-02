import React, { useState, useEffect, useRef } from "react";
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
  const swiperRef = useRef(null);
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
    reviewLoading: false,
  });
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [variation, setVariation] = useState(null);
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
        console.log(data);
        const product = data;
        let images = [];
        if (product.images?.length > 0) {
          product.images.map((img) => {
            images.push({ url: img });
          });
        }

        if (product.product_sizes?.length > 0) {
          product.product_sizes.map((img) => {
            images.push({ url: img.url });
          });
        }

        if (product.product_details?.length > 0) {
          product.product_details.map((img) => {
            images.push({ url: img.url });
          });
        }

        let obj = {};
        if (product.attributes?.length > 0 && product.variations?.length > 0) {
          product.attributes.map((attr, index) => {
            obj[attr.name] = attr.options[0];
          });
          setSelectedVariation(obj);
          setVariation(product.variations[0]);

          if (product.variations[0].image) {
            images[0].url = product.variations[0].image;
          }
        }

        setState({ ...state, isLoading: false, images, product });
      })
      .catch((e) => {
        if (Axios.isCancel(e)) {
        } else {
          setState({ ...state, isLoading: false });
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
    let cartData = {
      product_id: product.id,
      quantity: qty,
      type: "simple",
    };
    if (product.type == "variable") {
      if (variation) {
        cartData.variation = variation.attributes;
        cartData.type = "variable";
        // cartData.variation_id = variation.variation_id; //optional
      }
    }

    dispatch(AddToCard(cartData));
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

  const onSelectVariation = (name, value) => {
    let { product } = state;
    let _variImg = null;
    selectedVariation[name] = value;
    product.variations?.map((variation, index) => {
      let count = 0;
      product.attributes.map((item, index) => {
        let _key = "attribute_pa_" + item.name.toLowerCase();
        let _selectedVariation = hp.strWithDash(selectedVariation[item.name]); //for weight as some weight values are like '1-2-kg' instead of '1.2 kg'
        if (variation.attributes[_key] == _selectedVariation) {
          count += 1;
        }
      });
      if (count == product.attributes.length) {
        setVariation(variation);
        if (name.toLowerCase() == "color") {
          _variImg = variation.image;
        }
      }
    });

    if (_variImg) {
      let _images = [...images];
      _images[0].url = _variImg;
      setState({ ...state, images: _images });
      swiperRef.current?.scrollTo(0);
    }
    setSelectedVariation({ ...selectedVariation });
  };

  const onProductSizePress = (i) => {
    let selectedIndex = i;
    if (product.images?.length > 0) {
      selectedIndex += product.images.length;
    }

    onImagePress(selectedIndex);
  };

  const renderPagination = (index, total, context) => {
    return (
      <View
        style={{
          alignSelf: "flex-end",
          marginTop: -20,
        }}
      >
        <Text style={{ color: THEME.primary }}>
          <>{index + 1}</>/{total}
        </Text>
      </View>
    );
  };

  const onProductDetailPress = (i) => {
    let selectedIndex = i;
    if (product.images?.length > 0) {
      selectedIndex += product.images.length;
    }
    if (product.product_sizes?.length > 0) {
      selectedIndex += product.product_sizes.length;
    }
    onImagePress(selectedIndex);
  };

  const renderPrice = () => {
    let { product } = state;

    if (
      product.type == "variable" &&
      product.attributes?.length > 0 &&
      product.variations?.length > 0
    ) {
      if (variation) {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                color: THEME.primary,
                fontSize: 15,
              }}
            >
              {hp.moneyFormat(variation.price)} Ks
            </Text>
          </View>
        );
      } else {
        return <View />;
      }
    } else {
      return (
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
            product.regular_price !== product.price && (
              <Text
                style={{
                  color: THEME.text_secondary,
                  fontFamily: "Roboto-Bold",
                  marginLeft: 10,
                  textDecorationLine: "line-through",
                }}
              >
                {hp.moneyFormat(product.regular_price)} Ks
              </Text>
            )}
        </View>
      );
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
      <View style={styles.container}>
        <Header
          visibleBack={true}
          onLayout={({ nativeEvent }) => {
            setHeaderBarHeight(nativeEvent.layout.height);
          }}
        />
        {product && (
          <Container>
            {/* <View style={{ height: 50, backgroundColor: "#fff" }} /> */}
            <Swiper
              dotColor={THEME.card}
              activeDotColor={THEME.primary}
              autoplay={false}
              ref={swiperRef}
              loop={false}
              renderPagination={renderPagination}
              height={CONFIG.height * 0.35}
            >
              {images.length > 0 ? (
                images.map((img, index) => (
                  <View
                    style={{
                      backgroundColor: THEME.white,
                    }}
                    key={index}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => onImagePress(index)}
                    >
                      <Image
                        source={{ uri: img.url }}
                        style={[styles.fullImg]}
                        resizeMode="contain"
                      />
                    </TouchableWithoutFeedback>
                  </View>
                ))
              ) : (
                <View>
                  <Image source={placeholder} style={styles.fullImg} />
                </View>
              )}
            </Swiper>
            <View>
              <View style={styles.infoContainer}>
                <View style={{ paddingTop: 15 }}>
                  <Text style={styles.txtProduct}>{product.name}</Text>
                </View>

                {product.brand ? (
                  <TouchableOpacity
                    style={styles.brand}
                    onPress={() => toStore(product.store)}
                  >
                    <Text style={{ fontFamily: "Roboto-Medium", fontSize: 12 }}>
                      Brand :{" "}
                    </Text>
                    <Text style={styles.txtBrand}>{product.brand}</Text>
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
                  {renderPrice()}
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

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  {product.store ? (
                    <View style={styles.store}>
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
                        <Text style={styles.txtStore}>
                          {product.store.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View />
                  )}
                  <View style={styles.status}>
                    <Text
                      style={{
                        color: THEME.text_secondary,
                        fontSize: 12,
                        fontFamily: "Roboto-Medium",
                      }}
                    >
                      Status :{" "}
                    </Text>
                    <Text style={styles.txtStatus}>
                      {product.in_stock ? "In stock" : "Preorder"}
                    </Text>
                  </View>
                </View>

                <View style={styles.ratingContainer}>
                  <Text style={styles.lblRating}>Rating :</Text>
                  <AirbnbRating
                    count={5}
                    defaultRating={parseInt(product.average_rating)} //product.rating_count
                    selectedColor={THEME.primary}
                    size={16}
                    showRating={false}
                    isDisabled={true}
                  />
                  <Text style={styles.txtRating}>{product.average_rating}</Text>
                </View>
              </View>
              {product.attributes?.length > 0 &&
                product.variations?.length > 0 && (
                  <View
                    style={{
                      marginBottom: -10,
                      backgroundColor: THEME.card,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: THEME.background,
                        padding: 10,
                        borderWidth: 0.3,
                        borderColor: THEME.text_secondary,
                        borderRadius: 10,
                        marginHorizontal: 8,
                      }}
                    >
                      <View>
                        {product.attributes?.length > 0 &&
                          product.attributes.map((attribute, index) => {
                            return (
                              <View key={index}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: THEME.text_secondary,
                                  }}
                                >
                                  {attribute.name} :
                                  <> {selectedVariation[attribute.name]}</>
                                </Text>

                                <View
                                  style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    marginVertical: 8,
                                  }}
                                  horizontal={true}
                                >
                                  {attribute.options?.length > 0 &&
                                    attribute.options.map((option, index) => {
                                      if (
                                        attribute.name.toLowerCase() == "color"
                                      ) {
                                        return (
                                          <View
                                            key={index}
                                            style={{
                                              borderColor:
                                                selectedVariation[
                                                  attribute.name
                                                ] == option
                                                  ? THEME.primary
                                                  : "#E8EAEC",
                                              borderWidth: 1,
                                              borderRadius: 30,
                                              marginRight: 10,
                                              padding: 3,
                                            }}
                                          >
                                            <TouchableOpacity
                                              onPress={() =>
                                                onSelectVariation(
                                                  attribute.name,
                                                  attribute.options[index]
                                                )
                                              }
                                              style={{
                                                width: 40,
                                                height: 40,
                                                backgroundColor: `${option.toLowerCase()}`,
                                                borderRadius: 30,
                                              }}
                                            ></TouchableOpacity>
                                          </View>
                                        );
                                      }
                                      return (
                                        <TouchableOpacity
                                          onPress={() =>
                                            onSelectVariation(
                                              attribute.name,
                                              attribute.options[index]
                                            )
                                          }
                                          key={index}
                                          style={{
                                            padding: 12,
                                            marginRight: 10,
                                            backgroundColor: THEME.card,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor:
                                              selectedVariation[
                                                attribute.name
                                              ] == option
                                                ? THEME.primary
                                                : "#E8EAEC",
                                          }}
                                        >
                                          {/* <Image
                                      style={{
                                        width: 40,
                                        height: 40,
                                        borderWidth: 0.2,
                                      }}
                                    /> */}
                                          <Text>{option}</Text>
                                        </TouchableOpacity>
                                      );
                                    })}
                                </View>
                              </View>
                            );
                          })}
                      </View>
                    </View>
                  </View>
                )}
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
              {product.product_sizes?.length > 0 && (
                <View style={styles.view}>
                  <Text
                    style={[styles.lblProductSize, { alignSelf: "center" }]}
                  >{`PRODUCT SIZE`}</Text>
                  <View>
                    {product.product_sizes.map((img, index) => (
                      <TouchableOpacity
                        onPress={() => onProductSizePress(index)}
                        key={index}
                      >
                        <Image
                          style={styles.ratioImg}
                          source={{ uri: img.url }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {product.product_details?.length > 0 && (
                <View style={styles.view}>
                  <Text
                    style={[styles.lblProductSize, { alignSelf: "center" }]}
                  >{`PRODUCT DETAIL`}</Text>
                  <View>
                    {product.product_details.map((img, index) => (
                      <TouchableOpacity
                        onPress={() => onProductDetailPress(index)}
                        style={{ marginBottom: 5 }}
                        key={index}
                      >
                        <Image
                          style={styles.ratioImg}
                          source={{ uri: img.url }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

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
  container: { flex: 1, backgroundColor: THEME.background },
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
  fullImg: { width: "100%", height: "100%" },
  infoContainer: {
    paddingHorizontal: 8,
    backgroundColor: THEME.card,
    paddingBottom: 5,
  },
  txtProduct: { fontSize: 16, fontFamily: "Roboto-Medium" },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  txtBrand: {
    fontFamily: "Roboto-Medium",
    fontSize: 12,
    color: THEME.primary,
  },
  store: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: 5,
  },
  txtStore: {
    color: THEME.text_secondary,
    fontSize: 12,
    color: "green",
    fontFamily: "Roboto-Medium",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginTop: 5,
  },
  txtStatus: {
    color: THEME.text_secondary,
    fontSize: 12,
    color: "green",
    fontFamily: "Roboto-Medium",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  lblRating: {
    color: THEME.text_secondary,
    fontSize: 12,
    fontFamily: "Roboto-Medium",
  },
  txtRating: {
    marginLeft: 10,
    color: THEME.secondary,
    fontFamily: "Roboto-Regular",
  },
  lblProductSize: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    color: THEME.primary,
    marginBottom: 16,
  },
  view: {
    marginTop: 10,
    padding: 8,
    backgroundColor: THEME.card,
  },
  ratioImg: {
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

export default PoductDetailScreen;
