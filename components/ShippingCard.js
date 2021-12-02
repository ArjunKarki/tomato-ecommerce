import React from "react";
import { View, Text } from "react-native";
import { THEME, TYPO } from "../DynamicStyle/style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ShippingCard = ({ accountDetails }) => {
  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderRadius: 8,
          backgroundColor: "#FFF",
          padding: 16,
        }}
      >
        <View
          style={{
            marginRight: 10,
            marginTop: 4,
          }}
        >
          <FontAwesome5 name="location-arrow" size={15} color={THEME.primary} />
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 50,
            }}
          >
            <Text
              style={{
                ...TYPO.h3,
              }}
            >
              {accountDetails.data.shipping.first_name}{" "}
              {accountDetails.data.shipping.last_name}
            </Text>
            <Text
              style={{
                ...TYPO.h5,
              }}
            >
              {accountDetails.data.shipping.company.length
                ? ", " + accountDetails.data.shipping.company
                : ""}
            </Text>
          </View>

          <View
            style={{
              marginTop: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Medium",
              }}
            >
              {accountDetails.data.shipping.address_1}
              {accountDetails.data.shipping.address_2.length
                ? `, ${accountDetails.data.shipping.address_2}`
                : ""}
              , {accountDetails.data.shipping.city},{" "}
              {accountDetails.data.shipping.state},{" "}
              {accountDetails.data.shipping.country}
            </Text>
          </View>

          <View style={{ marginTop: 8 }}>
            <Text style={{ fontFamily: "Roboto-Medium" }}>
              Postcode/ZIP: {accountDetails.data.shipping.postcode}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShippingCard;
