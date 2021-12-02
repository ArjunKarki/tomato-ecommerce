import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CONFIG, hp } from "../constants";
import { TYPO, THEME } from "../DynamicStyle/style";

const { height, width } = CONFIG;

const OrderList = ({ item, navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderStyle: "solid",
          borderBottomColor: "#ddd",
          paddingBottom: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            textTransform: "capitalize",
            marginRight: 5,
            color: "green",
          }}
        >
          Status :
        </Text>
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            textTransform: "capitalize",
          }}
        >
          {item.status}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderStyle: "solid",
          borderBottomColor: "#ddd",
          paddingBottom: 8,
          marginTop: 8,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ fontFamily: "Roboto-Regular" }}>
            Order ID: {item.id}
          </Text>
          <Text style={{ fontFamily: "Roboto-Regular" }}>
            Order Date: {item.date_created.match(/\d{4}\-\d{1,2}\-\d{1,2}/)}
          </Text>
        </View>

        <View style={{
            flex: 1,
            alignItems: "flex-end"
        }}>
            <Text style={{fontFamily: "Roboto-Medium", fontSize: 15,}}>Total - {hp.moneyFormat(item.total)} {item.currency}</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            textTransform: "capitalize",
          }}
        >
          Payment Method - {item.payment_method_title}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("OrderDetails", { id: item.id });
        }}
      >
        <View
          style={{
            backgroundColor: THEME.primary,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              ...TYPO.h5,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Order Details
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OrderList;
