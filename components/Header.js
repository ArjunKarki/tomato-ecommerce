import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../DynamicStyle/style";
import { useSelector } from "react-redux";
import Constants from "expo-constants";

// import { TextInput } from "react-native-gesture-handler";

export default function Header({
  editable,
  autofocus,
  visibleBack,
  value,
  onChangeText,
  onLayout,
  type,
}) {
  const navigation = useNavigation();
  const { quantity } = useSelector((state) => state.cart);
  useEffect(() => {}, [quantity]);
  return (
    <View
      style={[
        styles.headerContainer,
        {
          position: type == "Home" ? "absolute" : "relative",
          backgroundColor: type == "Home" ? "rgba(0,0,0,0)" : THEME.primary,
          top:
            Platform.OS === "android"
              ? type == "Home"
                ? Constants.statusBarHeight
                : 0
              : type == "Home"
              ? 26
              : 0,
        },
      ]}
      onLayout={onLayout}
    >
      {visibleBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(50,50,50,0.2)",
            height: 35,
            width: 35,
            borderRadius: 35,
            marginLeft: 8,
            marginTop: Platform.OS === "ios" ? (type == "Home" ? 26 : -26) : 0,
          }}
        >
          <Feather name="arrow-left" size={25} color="#f5f7fc" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("SearchStack")}
      >
        <SearchBar
          onTouchStart={() => navigation.navigate("SearchStack")}
          placeholder="I'm shopping for..."
          placeholderTextColor={THEME.primary}
          editable={editable}
          autoFocus={autofocus}
          value={value}
          onChangeText={(t) => onChangeText(t)}
          inputContainerStyle={[
            styles.headerInputContainer,
            { top: Platform.OS === "ios" && type != "Home" ? -26 : 0 },
          ]}
          containerStyle={styles.headerInput}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("CartStack")}
        style={[
          styles.CartBtn,
          { top: Platform.OS === "ios" && type != "Home" ? -26 : 0 },
        ]}
      >
        <Feather
          name="shopping-bag"
          size={25}
          color={type == "Home" ? THEME.primary : "#fff"}
        />
        <View style={styles.count}>
          <Text style={{ color: THEME.background }}>{quantity}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

Header.defaultProps = {
  autofocus: false,
  editable: false,
  visibleBack: false,
  value: "",
  onChangeText: () => {},
};

const styles = StyleSheet.create({
  headerInputContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    height: 40,
    borderRadius: 20,
    zIndex: 99999,
  },
  headerInput: {
    backgroundColor: "rgba(0,0,0,0)",
    height: 50,
    flex: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    width: "100%",
    zIndex: 10,
    paddingTop: Platform.OS === "ios" ? 28 : 0,
  },
  CartBtn: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    height: 50,
    width: 40,
    paddingTop: Platform.OS === "ios" ? 28 : 0,
  },
  count: {
    position: "absolute",
    overflow: "visible",
    left: 0,
    top: Platform.OS === "ios" ? 15 : 10,
    width: 22,
    height: 22,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
