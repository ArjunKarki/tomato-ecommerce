import React, { useEffect, createRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Header } from "../../components";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { hp } from "../../constants/hp";
import { THEME } from "../../DynamicStyle/style";
import { Vendor, Woo } from "../../API";
import Axios from "axios";
import { TouchableRipple, ActivityIndicator } from "react-native-paper";
import { CONFIG } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";
let source = "";

export default function SearchScreen({ navigation }) {
  const [state, setState] = useState({
    keyword: "",
    search_result: [],
    isSearching: true,
  });
  const [searchBarHeight, setSearchBarHeight] = useState(0);

  useEffect(() => {
    fetchResult();
  }, [state.keyword]);

  const onSearchStart = (text) => {
    setState({ ...state, keyword: text, isSearching: true });
  };

  const fetchResult = () => {
    if (source) {
      source.cancel();
    }

    if (state.keyword == "") {
      setState({ ...state, search_result: [], isSearching: false });
      return;
    }

    source = Axios.CancelToken.source();

    Woo.get(`search?q=${state.keyword}`, {
      cancelToken: source.token,
    })
      .then(({ data }) => {
        setState({ ...state, search_result: data, isSearching: false });
      })
      .catch((e) => {});
  };

  function toProduct(id) {
    navigation.navigate("ProductDetailScreen", { id });
  }

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  const renderPrice = (item) => {
    let _price;
    if (item.price.includes("Ks")) {
      _price = item.price;
    } else {
      _price = `${hp.moneyFormat(item.price)} Ks`;
    }

    return (
      <View>
        <Text style={{ flex: 0 }}>{_price}</Text>
        {item.regular_price.length > 0 &&
          item.regular_price !== 0 &&
          item.price !== item.regular_price && (
            <Text
              style={{
                color: THEME.secondary,
                fontFamily: "Roboto-Bold",
                fontSize: 13,
                textDecorationLine: "line-through",
              }}
            >
              {hp.moneyFormat(item.regular_price)} ks
            </Text>
          )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View style={{ flex: 1, backgroundColor: THEME.background }}>
        <Header
          autofocus={true}
          value={state.keyword}
          editable={true}
          visibleBack={true}
          onChangeText={(text) => onSearchStart(text)}
          onLayout={({ nativeEvent }) => {
            setSearchBarHeight(nativeEvent.layout.height);
          }}
        />
        <FlatList
          data={state.search_result}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          keyExtractor={(data) => data.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => toProduct(item.id)}
                style={styles.row}
              >
                <View style={styles.row_left}>
                  {item.images.length > 0 && item.images[0] ? (
                    <Image
                      style={styles.p_image}
                      source={{ uri: item.images[0] }}
                    />
                  ) : (
                    <Image
                      style={styles.p_image}
                      source={require("../../assets/images/placeholder.jpg")}
                    />
                  )}
                </View>
                <View style={styles.row_right}>
                  <Text numberOfLines={2} style={styles.p_name}>
                    {item.name}
                  </Text>
                  {renderPrice(item)}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {state.isSearching && (
          <View
            style={{
              flex: 1,
              position: "absolute",
              height: CONFIG.height,
              width: CONFIG.width,
              top: 60,
              backgroundColor: "#00000033",
            }}
          >
            <ActivityIndicator
              size={40}
              color={THEME.primary}
              style={{ marginTop: CONFIG.height * 0.4 }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.7,
    borderBottomColor: THEME.secondary,
    padding: 5,
    alignItems: "center",
  },
  row_left: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 2,
    backgroundColor: THEME.card,
    borderColor: THEME.secondary,
  },
  row_right: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  p_image: {
    width: 30,
    height: 30,
  },
  p_name: {
    textAlign: "left",
    flex: 1,
    marginHorizontal: 5,
  },
});
