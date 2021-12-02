import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { Container, CartLoader } from "../../components";
import { THEME, TYPO } from "../../DynamicStyle/style";
import { hp, Query } from "../../constants";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import { Cart, Woo } from "../../API";
import * as Linking from "expo-linking";

import Modal from "react-native-modal";
import { clearCart } from "../../redux/actions/CartAction";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { POINT_TYPE } from "../../constants/Query";
import { UpdateTomatoPoints } from "../../redux/actions/AccountDetailsAction";

const OrderSummary = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {
    paymentMethod,
    subTotal,
    shippingTotal,
    total,
    extraWeightPrice,
  } = route.params;
  const displayPayment =
    paymentMethod == "cod"
      ? "Cash on delivery"
      : paymentMethod == "points"
      ? "TOMATO Points"
      : "Pay Securely by 123, MPU, Internet Banking";
  const [loading, setLoading] = useState(false);
  const { accountDetails, cart } = useSelector((state) => state, shallowEqual);

  useEffect(() => {
    Linking.addEventListener("url", handleExpoLinking);
  }, []);

  const proceedCardProcess = async () => {
    const schema = Linking.makeUrl("gateway-redirect", {
      cart_key: cart.cart_key,
    });
    setLoading(true);
    try {
      const { data } = await Woo.post("/hash", {
        price: total,
      });
      setLoading(false);
      console.log(schema);
      const gatewayUrl = encodeURI(
        `https://tomato.com.mm/mobile-payment/?cart_key=${cart.cart_key}&schema=${schema}&price=${total}&hash=${data.hash}`
      );

      await WebBrowser.openBrowserAsync(gatewayUrl);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const makeOrder = async (method, title) => {
    setLoading(true);
    let selectedCity = accountDetails.data.meta_data.find(
      (tmp) => tmp.key == "city_code"
    );
    const shippingData = await Cart.post("calculate/shipping", {
      cart_key: cart.cart_key,
      country: "MM",
      state: selectedCity.value,
      return_methods: true,
    }).then(({ data }) => Object.values(data));
    const _tmpShippingMethodObj = shippingData.find(
      (_tmp) => _tmp.chosen_method
    );

    let param = {
      payment_method: method == "points" ? "cod" : method,
      payment_method_title: method == "points" ? "Pay with point" : title,
      set_paid: method === "2c2p" || method == "points" ? true : false,
      customer_id: accountDetails.data.id,
      billing: {
        ...accountDetails.data.billing,
      },
      shipping: {
        ...accountDetails.data.shipping,
      },
      line_items: cart.data.items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        variation_id: item.variation_id,
      })),
      shipping_lines: [
        {
          method_id: _tmpShippingMethodObj.method_id,
          method_title: _tmpShippingMethodObj.label,
          total:
            method == "points"
              ? "0"
              : (shippingTotal + extraWeightPrice).toString(),
        },
      ],
    };

    if (method == "points") {
      let args = {
        cart_key: cart.cart_key,
        user_id: accountDetails.data.id,
        point: total,
      };
      // point_checkout
      try {
        await Woo.post("/point-checkout", args).then(({ data }) => {
          if (data.success) {
            // get latest points amount
            Query.RemoteGet(accountDetails.data.email, POINT_TYPE.points)
              .then((data) => {
                // update points amount to reducer
                dispatch(UpdateTomatoPoints(data));
                // continue to order
                _postOrder(param);
              })
              .catch((e) => {
                console.log("Error from OrderSummary getting points => ", e);
              });
          } else {
            setLoading(false);
            Alert.alert(data.data);
          }
        });
      } catch (e) {
        setLoading(false);
        console.log("Error in point checkout => ", e);
      }
    } else {
      _postOrder(param);
    }
  };

  const _postOrder = (param) => {
    try {
      Woo.post("/orders", param).then(({ data }) => {
        dispatch(clearCart());
        console.log(data);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "OrderDone", params: { order: data } }],
          })
        );
      });
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
    }
  };

  const handleExpoLinking = ({ url }) => {
    let { path, queryParams } = Linking.parse(url);
    if (path === "gateway-redirect") {
      makeOrder("2c2p", "Pay Securely by 123, MPU, Internet Banking");
    }
  };

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  if (loading) {
    return <CartLoader />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <Container style={{ backgroundColor: THEME.background }}>
        {/* Loading Modal */}
        <Modal
          isVisible={loading}
          style={{
            alignItems: "center",
          }}
        >
          <View style={[styles.updatingModalLoader]}>
            <ActivityIndicator color={THEME.primary} />
          </View>
        </Modal>

        <View style={{ paddingHorizontal: 8, paddingVertical: 12 }}>
          <Text
            style={{
              fontSize: 22,
              color: THEME.primary,
              fontFamily: "Roboto-Bold",
            }}
          >
            Order Detail
          </Text>
        </View>
        <View style={{ padding: 8, backgroundColor: THEME.card }}>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2, marginRight: 10 }}>
                <Text style={{ fontFamily: "Roboto-Medium", fontSize: 15 }}>
                  {" "}
                  Product
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    fontSize: 15,
                    textAlign: "right",
                  }}
                >
                  SubTotal
                </Text>
              </View>
            </View>

            <View style={styles.hr} />

            <View
              style={{
                flexDirection: "row",
                marginBottom: 8,
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={{
                  width: "100%",
                }}
              >
                <FlatList
                  scrollEnabled={false}
                  contentContainerStyle={{
                    width: "100%",
                  }}
                  data={cart.data && cart.data.items}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                      <View
                        style={{
                          flex: 2,
                          marginRight: 10,
                          flexDirection: "row",
                        }}
                      >
                        <View>
                          <Text style={{ fontFamily: "Roboto-Regular" }}>
                            {item.product_name}
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontFamily: "Roboto-Regular" }}>
                            x {item.quantity}
                          </Text>
                        </View>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontFamily: "Roboto-Medium",
                            textAlign: "right",
                          }}
                        >
                          {hp.moneyFormat(item.price * item.quantity)} ks
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </ScrollView>
            </View>
          </View>
          <View style={styles.hr} />
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={{ flex: 2 }}>
              <Text>SubTotal :</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "right",
                  fontFamily: "Roboto-Bold",
                  color: THEME.primary,
                }}
              >
                {hp.moneyFormat(subTotal)} Ks
              </Text>
            </View>
          </View>

          <View style={styles.hr} />
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={{ flex: 2 }}>
              <Text>Shipping :</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  color: THEME.primary,
                  fontSize: 18,
                }}
              >
                {hp.moneyFormat(shippingTotal)} Ks{" "}
                <Text
                  style={{
                    color: THEME.text_secondary,
                    fontSize: 14,
                    fontWeight: "normal",
                  }}
                >
                  {" "}
                  via tomato Standard shipping
                </Text>
              </Text>
            </View>
          </View>

          {/* ExtraWeight */}
          {extraWeightPrice ? (
            <View>
              <View style={styles.hr}></View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    flex: 2,
                    color: THEME.text_secondary,
                    fontFamily: "Roboto-Regular",
                  }}
                >
                  Shipping price for extra weight (500 ks for 3 kg and plus 500
                  ks per kg above)
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontFamily: "Roboto-Regular",
                    color: THEME.text_secondary,
                  }}
                >
                  {extraWeightPrice} Ks
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}

          <View style={styles.hr} />
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={{ flex: 2 }}>
              <Text>Payment method :</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right" }}>{displayPayment}</Text>
            </View>
          </View>

          <View style={styles.hr} />
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: paymentMethod == "points" ? 14 : 18,
                }}
              >
                Total
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "right",
                  color: THEME.primary,
                  fontFamily: "Roboto-Bold",
                  fontSize: paymentMethod == "points" ? 14 : 18,
                }}
              >
                {hp.moneyFormat(total)} Ks
              </Text>
            </View>
          </View>

          {paymentMethod == "points" ? (
            <View>
              <View style={styles.hr} />
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <View style={{ flex: 2 }}>
                  <Text style={{ fontFamily: "Roboto-Medium" }}>
                    Your points :
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ textAlign: "right", fontFamily: "Roboto-Bold" }}
                  >
                    {accountDetails.data.tomato_points}
                  </Text>
                </View>
              </View>

              <View style={styles.hr} />
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <View style={{ flex: 2 }}>
                  <Text style={{ fontFamily: "Roboto-Bold", fontSize: 18 }}>
                    Total Points
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      textAlign: "right",
                      color: THEME.primary,
                      fontFamily: "Roboto-Bold",
                      fontSize: 18,
                    }}
                  >
                    {hp.moneyFormat(total)}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() =>
            paymentMethod == "card"
              ? proceedCardProcess()
              : makeOrder(paymentMethod, "Cash On Delivery")
          }
        >
          <View
            style={{
              paddingVertical: 16,
              borderRadius: 8,
              marginHorizontal: 8,
              marginTop: 15,
              backgroundColor: THEME.primary,
            }}
          >
            <Text
              style={{
                ...TYPO.h3,
                color: "#fff",
                textAlign: "center",
              }}
            >
              Confirm Order
            </Text>
          </View>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  updatingModalLoader: {
    height: 50,
    width: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: THEME.secondary,
    marginVertical: 10,
  },
});
