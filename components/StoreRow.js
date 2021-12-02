import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import { CONFIG } from "../constants/config";
const WIDTH = CONFIG.width;
const HEIGHT = CONFIG.height;
import { THEME } from "../DynamicStyle/style";
import { hp } from "../constants/hp";
import { useNavigation, StackActions } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { SaveHistory } from "../redux/actions/HistoryAction";
import CImage from "./CImage";
import FlashDealCountDown from "./FlashDealCountDown";

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

const StoreRow = ({ stores, title, onSeeMore }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const toStore = (store) => {
    if (!store.id) {
      alert("Comming Soon.");
      return;
    }

    const _store = hp.getOfficialStoreRoute(store);

    if (_store && _store.route)
      navigation.navigate(_store.route, { id: _store.id, name: _store.name });
    else navigation.navigate("Store", { id: _store.id, name: _store.name });
  };

  return (
    <View style={{ marginBottom: 4, paddingHorizontal: 8 }}>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            // marginBottom: 5,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // marginVertical: 5,
          }}
        >
          <Text style={{ fontFamily: "Roboto-Bold", color: THEME.primary }}>
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onSeeMore}
        >
          <Text style={{ color: THEME.text_secondary }}>See More{"  "}</Text>
          <Icon
            size={16}
            style={{ marginTop: 3 }}
            name="ios-arrow-forward"
            color={THEME.secondary}
          />
          <Icon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={stores}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => toStore(item)}
            key={index}
            style={styles.t_store(index)}
          >
            <Image source={item.img} style={styles.t_store_img} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

StoreRow.defaultProps = {
  products: [],
  onSeeMore: () => {},
};

export default StoreRow;
const styles = StyleSheet.create({
  cat_btn: {
    width: WIDTH / cat_width - 20,
    marginBottom: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  cat_view: {
    // borderWidth: 0.5,
    overflow: "hidden",
    // backgroundColor: THEME.card,
    // borderColor: THEME.secondary,
    borderRadius: 10,
    width: WIDTH / cat_width - 24,
    height: 50,
    // justifyContent: "center",
    // alignItems: "center",
  },
  cat_text: {
    textAlign: "center",
    fontSize: 10,
    color: THEME.text_secondary,
    marginTop: 5,
  },
  t_store: (index) => {
    return {
      padding: 9,
      borderWidth: 0.5,
      borderColor: THEME.text_secondary,
      marginRight: 10,
      //   hori_width == 3 ? (index == 2 ? 0 : 10) : index == 4 ? 0 : 10,
      marginTop: 8,
      marginBottom: 5,
    };
  },
  t_store_img: { width: WIDTH / hori_width - 50, height: 82 },
  bottom_btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.primary,
    alignSelf: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    paddingVertical: 10,
    marginTop: 10,
  },
  banner_wrapper: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  banner_photo: {
    width: "100%",
    height: "100%",
  },
});
