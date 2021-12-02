import React from "react";
import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import { CONFIG } from "../../constants";
import { THEME, TYPO } from "../../DynamicStyle/style";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const VisaIcon = (props) => (
  <FontAwesome name="cc-visa" color="#1a1f71" {...props} />
);

const { height, width } = CONFIG;

function Wallet({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 16,
      }}
    >
      <View style={{
        flexDirection: "row"
      }}>
        <Text
          style={{
            ...TYPO.h3,
            marginBottom: 10,
          }}
        >
          My Credit/Debit Cards
        </Text>

        <TouchableNativeFeedback>
          <Text style={{ fontFamily: "Roboto-Regular", marginLeft: "auto", color: "#336EF5" }}>Add card</Text>
        </TouchableNativeFeedback>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 8,
          flexDirection: "row",
        }}
      >
        <VisaIcon size={60} style={{ marginRight: 20 }} />
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text>************1234</Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            marginLeft: "auto",
            padding: 10,
            backgroundColor: "#eee",
            borderRadius: 10,
          }}
        >
          <TouchableNativeFeedback>
            <FontAwesome name="trash" size={25} color={THEME.primary} />
          </TouchableNativeFeedback>
        </View>
      </View>

      <Text
        style={{
          textAlign: "center",
          fontFamily: "Roboto-Regular",
          fontSize: 12,
          marginTop: 10,
          color: "#666",
        }}
      >
        Your card details are securely saved for a faster and easier checkout
        experience on Tomato.
      </Text>
    </View>
  );
}

export default Wallet;
