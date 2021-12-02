import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TouchableNativeFeedback,
  FlatList,
  ClippingRectangle,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import AntDesgin from "react-native-vector-icons/AntDesign";
import { Button, Icon, Input } from "react-native-elements";
import { Header, Quantity, CartLoader } from "../../components";
import { THEME } from "../../DynamicStyle/style";
import { CONFIG, hp } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  RemoveFromCard,
  AddToCard,
  getAllCart,
  clearCart,
  UpdateCartItem,
  removePromoProduct,
} from "../../redux/actions/CartAction";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { Picker } from "native-base";
import { Woo, Cart } from "../../API";
import Modal from "react-native-modal";
import {
  AddCoupon,
  RemoveCouponReducer,
} from "../../redux/actions/AccountDetailsAction";

const { height, width } = CONFIG;

export default function CartScreen({ navigation }) {
  const {
    loading,
    error,
    data,
    quantity,
    cart_key,
    twelvePromoProducts,
  } = useSelector((state) => state.cart);

  // console.log(data, quantity);

  const { data: user } = useSelector((state) => state.accountDetails);

  const _tmpCoupons =
    user &&
    user.meta_data &&
    user.meta_data.filter((_tmp) => _tmp.key == "coupons");
  let myCoupons = [];
  if (_tmpCoupons && _tmpCoupons.length) {
    myCoupons = _tmpCoupons[0].value;
  }

  const dispatch = useDispatch();
  const [isPromoProduct, setPromoProduct] = useState(false);
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  const [region, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const [stateLoading, setStateLoading] = useState(false);

  const [loadingShipping, setLoadingShipping] = useState(false);

  const [loadingAPI, setLoadingAPI] = useState(false);

  const [staticShipping, setStaticShipping] = useState(2500);

  const [coupon, setCoupon] = useState(null);

  const [usedCoupon, setusedCoupon] = useState(false);

  const [couponModalVisibile, setCouponModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const onRemove = (product) => {
    if (twelvePromoProducts && twelvePromoProducts.length > 0) {
      for (let i = 0; i < twelvePromoProducts.length; i++) {
        if (product.product_id == twelvePromoProducts[i].id) {
          dispatch(removePromoProduct(product));
        }
      }
    }
    dispatch(UpdateCartItem({ product }));
    checkIsPromoProduct();
  };

  const onPlus = (product) => {
    if (twelvePromoProducts && twelvePromoProducts.length > 0) {
      for (let i = 0; i < twelvePromoProducts.length; i++) {
        if (
          product.product_id == twelvePromoProducts[i].id &&
          product.quantity < 2
        ) {
          dispatch(UpdateCartItem({ product, type: "ADD_ONE" }));
        }
      }
    } else {
      dispatch(UpdateCartItem({ product, type: "ADD_ONE" }));
    }
  };

  const onMinus = (product) => {
    dispatch(UpdateCartItem({ product, type: "REMOVE_ONE" }));
  };

  const toProduct = (id) => {
    navigation.navigate("ProductDetailScreen", { id });
  };

  const fetchState = async () => {
    const { data } = await Woo.get("/shipping-zones");

    setState(data);
  };

  const stateChange = async (val) => {
    if (val === null) return;
    setSelectedState(val);
    setStateLoading(true);
    try {
      const { data } = await Woo.get(`/shipping-zones/${val}/locations`);
      setRegion(data);
      setStateLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const regionChange = async (val) => {
    if (val === null) return;
    setLoadingAPI(true);
    const selectedRegionCode = region.find((r) => r.name == val);

    setSelectedRegion(val);
    await Cart.post("calculate/shipping", {
      cart_key,
      country: "MM",
      state: selectedRegionCode.code,
      return_methods: true,
    });
    await Cart.post("calculate", {
      cart_key,
    });
    dispatch(getAllCart());
    setLoadingAPI(false);
  };

  const myCouponApply = async (value) => {
    // disable modal
    setCouponModalVisible(false);
    setLoadingAPI(true);

    // apply coupon
    try {
      const { data } = await Cart.post("/coupon?cart_key=" + cart_key, {
        coupon: value.coupon,
        cart_key,
      });

      setusedCoupon(data);

      // set selectedCoupon
      setSelectedCoupon(value);

      // remove coupon from reducer
      dispatch(RemoveCouponReducer(value));

      dispatch(getAllCart());
      setLoadingAPI(false);
    } catch (e) {
      setLoadingAPI(false);
      Alert.alert("Invalid Coupon", "Coupon Code Invalid");
    }
  };

  const applyCoupon = async () => {
    if (coupon) {
      setLoadingAPI(true);
      try {
        const { data } = await Cart.post("/coupon?cart_key=" + cart_key, {
          coupon,
          cart_key,
        });

        dispatch(getAllCart());
        setLoadingAPI(false);
        setusedCoupon(data);
      } catch (e) {
        Alert.alert("Invalid Coupon", "Coupon Code Invalid");
        setLoadingAPI(false);
      }
    }
  };

  const checkIsPromoProduct = () => {
    let _promoProduct = false;
    if (twelvePromoProducts && data && data.items && data.items.length > 0) {
      for (let i = 0; i < twelvePromoProducts.length; i++) {
        for (let j = 0; j < data.items.length; j++) {
          if (data.items[j].product_id == twelvePromoProducts[i].id) {
            _promoProduct = true;
          }
        }
      }
    }

    if (_promoProduct) {
      setPromoProduct(true);
    } else {
      setPromoProduct(false);
    }
  };

  useEffect(() => {
    checkIsPromoProduct();
  }, [data]);

  useEffect(() => {
    if (quantity > 0) {
      dispatch(getAllCart());
      fetchState();
    }
  }, [quantity, user]);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  if (loading) {
    return (
      <>
        {Platform.OS === "ios" && (
          <SafeAreaView style={{ backgroundColor: THEME.primary }} />
        )}
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor:
              Platform.OS === "android" ? "transparent" : THEME.primary,
          }}
        >
          <Header visibleBack={true} />
          <CartLoader />
        </SafeAreaView>
      </>
    );
  }

  if (data == null || data.item_count < 0 || data.length < 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "android" ? "transparent" : THEME.primary,
        }}
      >
        <Header visibleBack={true} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: THEME.background,
          }}
        >
          <Text style={{ fontSize: 18, color: "#333", lineHeight: 38 }}>
            No Items in Cart
          </Text>
          <Button
            onPress={() => navigation.goBack()}
            title="Add Some"
            buttonStyle={{ backgroundColor: THEME.primary }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const _removeCoupon = async (coupon, saved = false) => {
    try {
      await Cart.delete("coupon", {
        data: {
          coupon,
        },
      });

      if (saved) {
        dispatch(AddCoupon(selectedCoupon));
      }
      await Cart.post("calculate", {
        cart_key,
      });
      dispatch(getAllCart());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View style={{ flex: 1, backgroundColor: THEME.background }}>
        <Header visibleBack={true} />
        <View style={[styles.titleContainer, { marginTop: 20 }]}>
          <Text style={[styles.title, { paddingLeft: 8 }]}>
            Your Cart Items
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ paddingHorizontal: 8, paddingTop: 8, flex: 1 }}
        >
          {/* <View style={styles.notice}>
          <Text style={{ color: THEME.text_primary }}>
            Checkout and earned 1983 Tomato Coins.
          </Text>
        </View> */}

          {data.items &&
            data.items.map((product, index) => (
              <View
                key={index.toString()}
                style={{
                  backgroundColor: THEME.card,
                  padding: 5,
                  marginBottom: 10,
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity onPress={() => toProduct(product.product_id)}>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={styles.productImgContainer}>
                      <Image
                        resizeMode="contain"
                        style={styles.productImg}
                        source={{ uri: product.product_image }}
                      />
                    </View>
                    <View style={{ flex: 1, padding: 4 }}>
                      <Text style={{ color: "#000", marginBottom: 5 }}>
                        {product.product_name}
                      </Text>

                      <View style={{ flexDirection: "row" }}>
                        <Text>{product.product_price}</Text>
                        <Text> x </Text>
                        <Text style={{ color: THEME.primary }}>
                          {product.quantity}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <Text
                          style={{ fontWeight: "bold", color: THEME.primary }}
                        >
                          Total: {hp.moneyFormat(product.line_total)} - Ks
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => onRemove(product)}
                      style={{
                        height: 40,
                        width: 40,
                        borderBottomRightRadius: 50,
                        borderBottomLeftRadius: 50,
                        backgroundColor: THEME.primary,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AntDesgin name="close" color="#fff" size={18} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <Quantity
                  onMinus={() => onMinus(product)}
                  onPlus={() => onPlus(product)}
                  quantity={product.quantity}
                />
              </View>
            ))}
          <Button
            onPress={() => navigation.navigate("HomeStack")}
            buttonStyle={{ backgroundColor: THEME.primary }}
            icon={
              <Icon
                name="arrow-back"
                size={15}
                color="white"
                iconStyle={{ marginRight: 10 }}
              />
            }
            title="Back To Shop"
          />
          <Button
            onPress={() => dispatch(clearCart())}
            type="outline"
            buttonStyle={{
              marginTop: 10,
              marginBottom: 5,
              borderColor: THEME.secondary,
              borderWidth: 1,
            }}
            titleStyle={{
              fontFamily: "Roboto-Black",
              color: THEME.text_primary,
            }}
            title="Clear Cart"
          />

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Coupon Discount</Text>
          </View>

          <View>
            <Input
              onChangeText={(text) => setCoupon(text)}
              placeholder="Coupon Code"
              inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 10 }}
              containerStyle={{ paddingHorizontal: 0 }}
            />
          </View>

          <Button
            type="outline"
            buttonStyle={{
              marginBottom: 5,
              borderColor: THEME.secondary,
              borderWidth: 1,
              width: CONFIG.width * 0.4,
            }}
            titleStyle={{
              fontFamily: "Roboto-Black",
              color: THEME.text_primary,
            }}
            title="Apply Coupon"
            onPress={applyCoupon}
          />

          {myCoupons.length ? (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 4,
                  fontFamily: "Roboto-Regular",
                }}
              >
                Or
              </Text>

              {/* my coupons */}
              <View
                style={{
                  marginVertical: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (selectedCoupon) {
                      Alert.alert(
                        "You can apply only one coupon.",
                        "If you want to use another coupon, please remove applied coupon first."
                      );
                    } else {
                      setCouponModalVisible(true);
                    }
                  }}
                  style={{
                    paddingVertical: 10,
                    backgroundColor: THEME.primary,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto-Bold",
                      textAlign: "center",
                      color: "#FFF",
                    }}
                  >
                    Apply My Coupon
                  </Text>
                </TouchableOpacity>

                <Modal
                  isVisible={couponModalVisibile}
                  deviceHeight={height}
                  deviceWidth={width}
                  style={{
                    justifyContent: "flex-end",
                    margin: 0,
                  }}
                  onBackdropPress={() => {
                    setCouponModalVisible(false);
                  }}
                  onBackButtonPress={() => {
                    setCouponModalVisible(false);
                  }}
                >
                  <View
                    style={{
                      height: height / 2,
                      backgroundColor: "#FFF",
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                        fontFamily: "Roboto-Bold",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      My Coupons
                    </Text>

                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 8,
                        paddingVertical: 16,
                      }}
                    >
                      {myCoupons.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            marginBottom: 10,
                            borderWidth: 1,
                            borderColor: "#ddd",
                            borderStyle: "solid",
                            flexDirection: "row",
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              paddingVertical: 10,
                              flexDirection: "row",
                            }}
                          >
                            <View
                              style={{
                                width: "23%",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                source={require("../../assets/icon.png")}
                                style={{
                                  height: 50,
                                  width: 50,
                                  resizeMode: "contain",
                                }}
                              />
                            </View>

                            <View
                              style={{
                                flex: 1,
                              }}
                            >
                              <View
                                style={{
                                  marginBottom: 10,
                                  alignItems: "center",
                                  flexDirection: "row",
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Roboto-Regular",
                                  }}
                                >
                                  Coupon code :
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Roboto-Bold",
                                    color: THEME.primary,
                                  }}
                                >
                                  {" "}
                                  {item.coupon}
                                </Text>
                              </View>

                              <Text
                                style={{
                                  fontFamily: "Roboto-Bold",
                                }}
                              >
                                Save {item.saving} MMK
                              </Text>
                            </View>
                          </View>

                          <TouchableOpacity
                            style={{
                              width: "20%",
                              backgroundColor: THEME.primary,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onPress={() => {
                              myCouponApply(item);
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "Roboto-Medium",
                                color: "#fff",
                              }}
                            >
                              Apply
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </Modal>
              </View>
            </View>
          ) : null}

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Caculate Shipping</Text>
          </View>

          <View>
            <Input
              value="Myanmar"
              editable={false}
              inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 10 }}
              containerStyle={{ paddingHorizontal: 0 }}
            />
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                borderColor: "#333",
                marginBottom: 8,
              }}
            >
              <Picker
                note
                selectedValue={selectedState}
                onValueChange={stateChange}
                textStyle={{ color: "#333" }}
              >
                <Picker.Item label="Select State" value={null} />
                {state.map((item, index) => (
                  <Picker.Item
                    label={item.name}
                    value={item.id}
                    key={item.id}
                  />
                ))}
              </Picker>
            </View>

            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                borderColor: "#333",
                marginBottom: 8,
              }}
            >
              {stateLoading ? (
                <ActivityIndicator size="small" color={THEME.primary} />
              ) : (
                <Picker
                  note
                  selectedValue={selectedRegion}
                  onValueChange={regionChange}
                >
                  <Picker.Item label="Select Region" value={null} />
                  {region.map((item, index) => (
                    <Picker.Item
                      label={item.name}
                      value={item.name}
                      key={item.code}
                    />
                  ))}
                </Picker>
              )}
            </View>
          </View>
          <View style={{ backgroundColor: THEME.card, padding: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 3 }}>Sub Total</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>
                {data.totals.subtotal ? data.totals.subtotal : 2000}
              </Text>
            </View>
            <View style={styles.hr} />
            <View>
              <Text style={{ marginBottom: 5 }}>Tomato Standard</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 3, color: THEME.text_secondary }}>
                  {isPromoProduct
                    ? "Over KG Charge (Free Shipping 3KG below):"
                    : " Tomato Standard Shipping:"}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    color: THEME.text_secondary,
                  }}
                >
                  {data.totals.shipping_total}
                </Text>
              </View>
            </View>
            <View>
              <Text>Deliver within 3 - 5 Days</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text>
                Shipping to -
                <Text style={{ fontFamily: "Roboto-Bold" }}>
                  {" "}
                  {selectedRegion}
                </Text>
              </Text>
            </View>

            {data.coupons && data.coupons.length > 0 ? (
              <>
                <View style={styles.hr} />

                {data.coupons.map((coupon) => (
                  <View style={{ flexDirection: "row" }} key={coupon.coupon}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 18,
                        fontFamily: "Roboto-Bold",
                      }}
                    >
                      Coupon
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 2,
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 1.2 }}>
                        <Text
                          style={{
                            color: THEME.primary,
                            fontSize: 22,
                            textAlign: "right",
                          }}
                        >
                          {coupon.coupon}
                        </Text>
                        <Text
                          style={{
                            flex: 1.2,
                            color: "#333",
                            fontSize: 14,
                            textAlign: "right",
                          }}
                        >
                          Save: {coupon.saving}
                        </Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ marginHorizontal: 8 }}
                        onPress={() =>
                          _removeCoupon(
                            coupon.coupon,
                            selectedCoupon ? true : false
                          )
                        }
                      >
                        <Icon
                          name="ios-close-circle"
                          type="ionicon"
                          color="#333"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <></>
            )}

            <View style={styles.hr} />
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ flex: 2, fontSize: 22, fontFamily: "Roboto-Bold" }}
              >
                Total
              </Text>
              <Text
                style={{
                  flex: 1.2,
                  color: THEME.primary,
                  fontSize: 22,
                  textAlign: "right",
                }}
              >
                {data.totals.total}
              </Text>
            </View>
          </View>
          {!loadingAPI && (
            <Button
              buttonStyle={{ backgroundColor: THEME.primary, marginTop: 20 }}
              titleStyle={{ fontFamily: "Roboto-Bold" }}
              title="Proceed To Checkout"
              onPress={() => {
                navigation.navigate(
                  user.id ? "AddressConfirmation" : "AccountTab"
                );
              }}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notice: {
    flexDirection: "row",
    borderTopWidth: 2,
    padding: 8,
    borderTopColor: THEME.primary,
    backgroundColor: THEME.card,
  },
  titleContainer: {
    marginVertical: 15,
    marginTop: 64,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
  },
  productImgContainer: {
    height: 110,
    width: 110,
    marginRight: 3,
  },
  productImg: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: THEME.secondary,
    marginVertical: 20,
  },
});
