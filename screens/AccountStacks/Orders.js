import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { CONFIG, hp } from "../../constants";
import { THEME, TYPO } from "../../DynamicStyle/style";
import { OrderList } from "../../components";
import { FetchOrders } from "../../redux/actions/OrdersAction";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = CONFIG;

function Orders({ navigation }) {
  const dispatch = useDispatch();
  const { orders, accountDetails } = useSelector(
    (state) => state,
    shallowEqual
  );

  useEffect(() => {
    dispatch(FetchOrders(accountDetails.data.id));
  }, []);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  const handleRefresh = async () => {
    dispatch(FetchOrders(accountDetails.data.id));
  }

  if (orders.loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "android" ? "transparent" : THEME.primary,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: THEME.background,
          }}
        >
          <ActivityIndicator color={THEME.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return orders.data.length ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 8,
          backgroundColor: THEME.background,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orders.data.filter((arr) => arr.created_via === "rest-api")}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <OrderList item={item} navigation={navigation} />
          )}
          contentContainerStyle={{
            marginTop: 16,
            paddingBottom: 16,
          }}
          refreshing={false}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: THEME.background,
        }}
      >
        <Text style={{ ...TYPO.h5 }}>There is no orders.</Text>
      </View>
    </SafeAreaView>
  );
}

export default Orders;
