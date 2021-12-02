import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { THEME, TYPO } from "../../DynamicStyle/style";
import { Container, CartLoader } from "../../components";
import { RadioButton } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getAllCart } from "../../redux/actions/CartAction";
import { hp } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";

export default function PaymentOptions({ navigation }) {
  const dispatch = useDispatch();
  const { accountDetails, cart } = useSelector((state) => state, shallowEqual);
  const {
    city: shipping_city,
    state: shipping_state,
  } = accountDetails.data.shipping;

  const [state, setState] = useState({
    subTotal: 0,
    tomatoStandard: 0,
    total: 0,
  });

  const ExtraWeightPrice = useMemo(() => {
    if (cart.data) {
      return hp.calculateExtraWeight(
        cart.data.total_weight.total,
        cart.data.total_weight.weight_unit
      );
    } else {
      return 0;
    }
  }, [cart.data]);

  // console.log(hp.shippingCost(shipping_state, shipping_city));
  const [paymentOption, setPaymentOption] = useState("cod");

  const CalculateAmount = useCallback(() => {
    const {
      city: shipping_city,
      state: shipping_state,
    } = accountDetails.data.shipping;

    // const shippingCost = hp.shippingCost(shipping_state, shipping_city);
    const shippingCost = parseInt(
      cart.data.totals.shipping_total.match(/\d/g).join("")
    );

    let tmpSub = 0;
    let tmpTotal = 0;
    cart.data &&
      cart.data.items.forEach(
        (item) => (tmpSub += parseInt(item.price) * item.quantity)
      );
    tmpTotal = tmpSub + shippingCost + ExtraWeightPrice;

    setState({
      ...state,
      subTotal: tmpSub,
      total: tmpTotal,
      tomatoStandard: shippingCost,
    });
  }, [cart.data]);

  const checkPoints = () => {
    if (cart.data.coupons && cart.data.coupons.length) {
      Alert.alert("Please remove the coupons to pay with TOMATO Points");
      navigation.navigate("CartScreen");
    } else {
      if (accountDetails.data.tomato_points) {
        let points;
        if (typeof accountDetails.data.tomato_points == "number") {
          points = accountDetails.data.tomato_points;
        } else {
          points = accountDetails.data.tomato_points.includes(",")
            ? parseInt(accountDetails.data.tomato_points.replace(",", ""))
            : parseInt(accountDetails.data.tomato_points);
        }
        if (points >= state.total) {
          setPaymentOption("points");
        } else {
          Alert.alert(
            "Not enough Points!",
            `You only have ${accountDetails.data.tomato_points} TOMATO Points.`
          );
        }
      } else {
        Alert.alert("Sorry!", `You don't have any TOMATO Points yet.`);
      }
    }
  };

  useEffect(() => {
    dispatch(getAllCart());
  }, []);

  useEffect(() => {
    CalculateAmount();
  }, [cart.data]);

  useEffect(() => {
    if (!accountDetails.data.id) {
      navigation.navigate("CartScreen");
    }
  }, [accountDetails.data]);

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
      <Container style={{ backgroundColor: THEME.background }}>
        {/* Order */}
        <View style={[styles.order]}>
          <Text style={[styles.title]}>Your Order</Text>

          <View style={{ marginTop: 10 }}>
            {/* thRow */}
            <View style={[styles.thRow]}>
              <View style={{ flex: 2, marginRight: 10 }}>
                <Text style={[styles.thRowFirstChild]}>Product</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.thRowLastChild]}>Price</Text>
              </View>
            </View>

            {/* P list */}
            <View style={{ marginBottom: 16 }}>
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
                            {item.product_name}{" "}
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

            {/* subtotal */}
            <View style={[styles.subTotal]}>
              <View style={{ flex: 2, marginRight: 10 }}>
                <Text style={{ fontFamily: "Roboto-Medium" }}>SubTotal</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.subTotalPrice]}>
                  {hp.moneyFormat(state.subTotal)} Ks
                </Text>
              </View>
            </View>

            {/* Tomato Standard */}
            <Text style={{ fontFamily: "Roboto-Medium", fontSize: 15 }}>
              Tomato Standard
            </Text>
            <View style={[styles.tStandard]}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 2, marginRight: 10 }}>
                  <Text style={{ fontFamily: "Roboto-Light", color: "#555" }}>
                    Tomato Standard Shipping :
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[styles.tStandardPrice]}>
                    {cart.loading
                      ? `Loading ... `
                      : `${hp.moneyFormat(state.tomatoStandard)} Ks`}
                  </Text>
                </View>
              </View>

              <Text style={{ fontFamily: "Roboto-Medium", marginTop: 5 }}>
                Deliver within 3 - 5 Days
              </Text>
            </View>

            {/* ExtraWeight */}
            {ExtraWeightPrice ? (
              <View
                style={{
                  marginBottom: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                  borderStyle: "solid",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 3,
                      color: THEME.text_secondary,
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    Shipping price for extra weight (500 ks for 3 kg and plus
                    500 ks per kg above)
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: "right",
                      fontFamily: "Roboto-Regular",
                      color: THEME.text_secondary,
                    }}
                  >
                    {ExtraWeightPrice} Ks
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}

            {/* Total */}
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 2, ...TYPO.h1 }}>Total</Text>
              <Text style={[styles.totalPrice]}>
                {hp.moneyFormat(state.total)} ks
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Option */}
        <View style={{ paddingHorizontal: 8, marginTop: 25 }}>
          <Text style={[styles.title]}>Set up for payment</Text>
        </View>

        <View style={[styles.paymentWrapper]}>
          <View style={[styles.paymentBox]}>
            {/* COD */}
            <TouchableOpacity
              onPress={() => {
                setPaymentOption("cod");
              }}
            >
              <View style={[styles.paymentRadio]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    value="cod"
                    status={paymentOption === "cod" ? "checked" : "unchecked"}
                    onPress={() => {
                      setPaymentOption("cod");
                    }}
                    color={THEME.primary}
                  />
                  <Text style={{ ...TYPO.h3 }}>Cash on delivery</Text>
                </View>
                {paymentOption === "cod" && (
                  <Text style={{ color: "#888", marginLeft: 30 }}>
                    *Pay with cash upon delivery.
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            {/* Card */}
            {/* <TouchableOpacity
              onPress={() => {
                setPaymentOption("card");
              }}
            >
              <View style={[styles.paymentRadio]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    value="card"
                    status={paymentOption === "card" ? "checked" : "unchecked"}
                    onPress={() => {
                      setPaymentOption("card");
                    }}
                    color={THEME.primary}
                  />
                  <Text
                    style={{
                      ...TYPO.h3,
                      flex: 1,
                    }}
                  >
                    Pay Securely by 123, MPU, Internet Banking
                  </Text>
                </View>
              </View>
            </TouchableOpacity> */}

            {/* Points */}
            <TouchableOpacity onPress={checkPoints}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="points"
                  status={paymentOption === "points" ? "checked" : "unchecked"}
                  onPress={checkPoints}
                  color={THEME.primary}
                />
                <Text
                  style={{
                    ...TYPO.h3,
                    flex: 1,
                  }}
                >
                  Pay with TOMATO Points
                </Text>
              </View>
              {paymentOption === "points" && (
                <Text style={{ color: "#888", marginLeft: 30 }}>
                  *Your points can't be refund after purchase.
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Next Step */}
        <View style={{ paddingHorizontal: 8, marginVertical: 20 }}>
          {cart.loading ? (
            <View style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Loading ...</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrderSummary", {
                  paymentMethod: paymentOption,
                  subTotal: state.subTotal,
                  shippingTotal: state.tomatoStandard,
                  extraWeightPrice: ExtraWeightPrice,
                  total: state.total,
                });
              }}
            >
              <View style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Place Order</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  order: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  title: {
    ...TYPO.h1,
    color: THEME.primary,
  },
  thRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderStyle: "solid",
    paddingBottom: 8,
    marginBottom: 8,
  },
  thRowFirstChild: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
  },
  thRowLastChild: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    textAlign: "right",
  },
  subTotal: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderStyle: "solid",
    paddingBottom: 8,
    marginBottom: 8,
  },
  subTotalPrice: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    textAlign: "right",
    color: THEME.primary,
  },
  tStandard: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderStyle: "solid",
    paddingBottom: 8,
    marginVertical: 10,
  },
  tStandardPrice: {
    fontFamily: "Roboto-Light",
    textAlign: "right",
    color: "#555",
  },
  totalPrice: {
    flex: 1,
    ...TYPO.h1,
    textAlign: "right",
    color: THEME.primary,
  },
  paymentWrapper: {
    marginTop: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  paymentBox: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  paymentRadio: {
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: THEME.primary,
  },
  nextButtonText: {
    ...TYPO.h3,
    color: "#fff",
    textAlign: "center",
  },
});
