import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  Alert,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Container } from "../../components";
import { THEME, TYPO } from "../../DynamicStyle/style";
import { CONFIG, hp } from "../../constants";
import { Woo } from "../../API";
import { ActivityIndicator } from "react-native-paper";
import Axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Platform } from "react-native";

const { height, width } = CONFIG;
const cancelToken = Axios.CancelToken;
const source = cancelToken.source();

export default function OrderDetails({ navigation, route }) {
  const { id } = route.params;
  const [state, setState] = useState({
    order: null,
    loading: false,
  });

  const fetchOrder = async () => {
    try {
      await Woo.get(`/order/${id}`, {
        cancelToken: source.token,
      }).then(({ data }) => {
        setState({
          order: data,
          loading: false,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!state.order) {
      fetchOrder();
    }

    return () => {
      if (state.loading) {
        source.cancel();
      }
    };
  }, []);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  if (!state.order) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Platform.OS === "android" ? "transparent" : THEME.primary }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: THEME.background }}
        >
          <ActivityIndicator color={THEME.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Platform.OS === "android" ? "transparent" : THEME.primary }}>
      <Container style={{backgroundColor: THEME.background}}>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 16,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              borderStyle: "solid",
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
            <Text style={{ fontFamily: "Roboto-Medium", color: "green" }}>
              Status:{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                textTransform: "capitalize",
              }}
            >
              {state.order.status}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: "Roboto-Regular" }}>
                Order ID: {state.order.id}
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={{ fontFamily: "Roboto-Regular" }}>
                Order Date:{" "}
                {state.order.date_created.match(/\d{4}\-\d{1,2}\-\d{1,2}/)}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 16,
            paddingHorizontal: 8,
            marginTop: 10,
          }}
        >
          <Text style={{ ...TYPO.h3, marginBottom: 10 }}>Order Summary</Text>

          <ScrollView
            horizontal={true}
            scrollEnabled={false}
            contentContainerStyle={{ flex: 1 }}
          >
            <FlatList
              contentContainerStyle={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              data={state.order.line_items}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ paddingVertical: 8, flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Roboto-Regular",
                        fontSize: 14,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontFamily: "Roboto-Regular" }}>
                      x {item.quantity}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Roboto-Medium",
                      }}
                    >
                      {item.total} {state.order.currency}
                    </Text>
                  </View>
                </View>
              )}
            />
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              borderTopColor: "#ddd",
              borderTopWidth: 1,
              borderStyle: "solid",
              paddingVertical: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ fontFamily: "Roboto-Regular" }}>
              Shipping Charges
            </Text>
            <Text style={{ fontFamily: "Roboto-Medium", marginLeft: "auto" }}>
              {hp.moneyFormat(state.order.shipping_total)}{" "}
              {state.order.currency}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingTop: 8,
              borderTopColor: "#ddd",
              borderTopWidth: 1,
              borderStyle: "solid",
            }}
          >
            <Text style={{ fontFamily: "Roboto-Regular" }}>Total</Text>
            <Text style={{ fontFamily: "Roboto-Medium", marginLeft: "auto" }}>
              {hp.moneyFormat(state.order.total)} {state.order.currency}
            </Text>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
}
