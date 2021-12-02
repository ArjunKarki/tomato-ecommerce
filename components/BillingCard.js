import React from "react";
import { View, Text } from "react-native";
import { THEME, TYPO } from "../DynamicStyle/style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BillingCard = ({ accountDetails }) => {
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
              marginRight: 55,
            }}
          >
            <Text
              style={{
                ...TYPO.h3,
              }}
            >
              {accountDetails.data.billing.first_name}{" "}
              {accountDetails.data.billing.last_name}
            </Text>
            <Text
              style={{
                ...TYPO.h5,
              }}
            >
              , {accountDetails.data.billing.phone}
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ ...TYPO.h5 }}>
              {accountDetails.data.billing.company.length
                ? `${accountDetails.data.billing.company}, `
                : ""}
              {accountDetails.data.billing.email}
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Medium",
              }}
            >
              {accountDetails.data.billing.address_1}{" "}
              {accountDetails.data.billing.address_2.length
                ? `, ${accountDetails.data.billing.address_2}`
                : ""}
              , {accountDetails.data.billing.city},{" "}
              {accountDetails.data.billing.state},{" "}
              {accountDetails.data.billing.country}
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Medium",
              }}
            >
              Postcode/ZIP: {accountDetails.data.billing.postcode}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BillingCard;
