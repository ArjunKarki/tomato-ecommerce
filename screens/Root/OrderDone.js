import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { Container } from "../../components";
import { THEME, TYPO } from "../../DynamicStyle/style";
import { hp } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";

const OrderDone = ({ navigation, route }) => {
  const { order } = route.params;
  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Platform.OS === "android" ? "transparent" : THEME.primary }}>
      <Container style={{backgroundColor: THEME.background}}>
        <View style={{ paddingHorizontal: 8 }}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Roboto-Bold",
                color: THEME.text_primary,
                textAlign: "center",
              }}
            >
              Thank You. Your order has been received.
            </Text>
          </View>

          <View style={{ backgroundColor: THEME.card, marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <Text>ORDER NUMBER :</Text>
              <Text>{order.number}</Text>
            </View>
            <View style={styles.hr} />
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <Text>Email :</Text>
              <Text>{order.billing.email}</Text>
            </View>
            <View style={styles.hr} />
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <Text>Order Date :</Text>
              <Text>
                {order.date_created.match(/\d{4}\-\d{1,2}\-\d{1,2}/).join()}
              </Text>
            </View>
            <View style={styles.hr} />
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <Text>PAYMENT METHOD :</Text>
              <Text>{order.payment_method_title}</Text>
            </View>
            <View style={styles.hr} />
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <Text>Total :</Text>
              <Text>{hp.moneyFormat(order.total)} Ks</Text>
            </View>
          </View>

          <TouchableNativeFeedback
            onPress={() => {
              navigation.navigate("HomeStack");
            }}
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
                Continue Shopping
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default OrderDone;

const styles = StyleSheet.create({
  hr: {
    width: "100%",
    height: 0.5,
    backgroundColor: THEME.secondary,
    marginVertical: 10,
  },
});
