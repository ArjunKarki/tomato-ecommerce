import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CONFIG, hp } from "../../constants";
import { THEME } from "../../DynamicStyle/style";
import logo from "../../assets/icon.png";
import {
  AddCoupon,
  FetchAccountDetails,
  RemoveCouponReducer,
  UpdateAccountDetails,
} from "../../redux/actions/AccountDetailsAction";

const { height, width } = CONFIG;

const CouponCard = ({ item }) => {
  return (
    /* Coupon Card */
    <View style={[styles.couponWrapper]}>
      {/* left */}
      <View style={[styles.couponLeft]}>
        {/* absolute circle */}
        <View
          style={[
            styles.absoluteCircle,
            {
              left: -(width * 10) / 200,
              top: -(width * 10) / 200,
            },
          ]}
        />
        <Image
          source={logo}
          style={{
            height: (width * 15) / 100,
            width: (width * 15) / 100,
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Right */}
      <View style={[styles.couponRight]}>
        {/* absolute circle */}
        <View
          style={[
            styles.absoluteCircle,
            {
              right: -(width * 10) / 200,
              top: -(width * 10) / 200,
            },
          ]}
        />

        <Text style={[styles.savingText]}>SAVE {item.saving} MMK</Text>

        <View
          style={{
            flexDirection: "row",
            paddingTop: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Medium",
            }}
          >
            Coupon Code :{" "}
          </Text>

          <Text
            style={{
              fontFamily: "Roboto-Bold",
              color: THEME.primary,
            }}
          >
            {item.coupon}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Coupons = ({ navigation }) => {
  const { accountDetails } = useSelector((state) => state, shallowEqual);

  const dispatch = useDispatch();

  const metaCoupons = accountDetails.data.meta_data.filter(
    (_tmp) => _tmp.key === "coupons"
  );

  let coupons = [];
  if (metaCoupons.length) {
    coupons = metaCoupons[0].value;
  }

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  const handleRefresh = () => {
    dispatch(FetchAccountDetails());
  };

  if (accountDetails.loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={THEME.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.background,
      }}
    >
      {coupons.length ? (
        <FlatList
          data={coupons}
          extraData={coupons}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <CouponCard item={item} />}
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingVertical: 16,
          }}
          onRefresh={handleRefresh}
          refreshing={false}
        />
      ) : (
        <View
          style={{
            paddingVertical: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Roboto-Regular", textAlign: "center" }}>
            There is no coupons.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Coupons;

const styles = StyleSheet.create({
  couponWrapper: {
    flexDirection: "row",
    marginBottom: 12,
    position: "relative",
    overflow: "hidden",
    borderRadius: 5,
  },
  couponLeft: {
    width: "23%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 8,
  },
  couponRight: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 5,
  },
  absoluteCircle: {
    position: "absolute",
    height: (width * 10) / 100,
    width: (width * 10) / 100,
    borderRadius: (width * 10) / 100,
    backgroundColor: THEME.primary,
  },
  savingText: {
    fontFamily: "Roboto-Bold",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontSize: 15,
  },
});
