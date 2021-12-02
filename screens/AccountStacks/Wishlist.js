import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { THEME, TYPO } from "../../DynamicStyle/style";
import AntDesgin from "react-native-vector-icons/AntDesign";
import { CONFIG } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { RemoveWishList } from "../../redux/actions/wishListActions";
import { hp } from "../../constants";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const { height, width } = CONFIG;

export default function Wishlist() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  useEffect(() => {
    // dispatch(FetchWishlist());
  }, []);

  const { wishList } = useSelector((state) => state.wishlist);

  const onRemoveWishlist = (id) => {
    dispatch(RemoveWishList(id));
  };

  const toProduct = (id) => {
    navigate("ProductDetailScreen", { id });
  };

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Platform.OS === "android" ? "transparent" : THEME.primary }}>
      <View
        style={{
          flex: 1,
          backgroundColor: THEME.background
        }}
      >
        {/* <View style={styles.top_title}>
        <Text
          style={{
            color: THEME.primary,
            fontFamily: "Roboto-Bold",
            fontSize: 20,
          }}
        >
          Your Wish Lists
        </Text>
      </View> */}
        {wishList.length > 0 ? (
          <FlatList
            data={wishList}
            keyExtractor={(item, index) => item.id.toString()}
            initialNumToRender={10}
            renderItem={({ item }) => (
              <TouchableNativeFeedback onPress={() => toProduct(item.id)}>
                <View style={styles.p_view}>
                  <TouchableNativeFeedback
                    onPress={() => onRemoveWishlist(item.id)}
                  >
                    <View style={styles.remove_btn}>
                      <AntDesgin name="close" color="#fff" size={18} />
                    </View>
                  </TouchableNativeFeedback>

                  <View style={styles.img_view}>
                    {item.images && item.images.length > 0 ? (
                      <Image
                        source={{ uri: item.images[0] }}
                        style={styles.img}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/images/placeholder.jpg")}
                        style={styles.img}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      paddingRight: 8,
                    }}
                  >
                    <View style={{ marginBottom: 8 }}>
                      <Text style={styles.p_name} numberOfLines={2}>
                        {item.name}
                      </Text>

                      <Text style={styles.price}>
                        {hp.moneyFormat(item.price)} ks
                      </Text>

                      {item.store && (
                        <Text style={styles.store}>{item.store.name}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableNativeFeedback>
            )}
            contentContainerStyle={{
              paddingVertical: 16,
              paddingHorizontal: 8,
            }}
          />
        ) : (
          <View style={styles.empty}>
            <Text>No wishes yet.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top_title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  p_view: {
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    flexDirection: "row",
  },
  remove_btn: {
    height: 40,
    width: 40,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: THEME.primary,
    position: "absolute",
    right: 8,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  img_view: {
    height: 110,
    flexBasis: "38%",
    marginRight: 5,
    padding: 5,
    justifyContent: "center",
  },
  img: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  p_name: {
    ...TYPO.h3,
    marginRight: 50,
    marginBottom: 8,
  },
  price: {
    ...TYPO.h5,
    color: THEME.primary,
    marginBottom: 8,
    fontWeight: "700",
  },
  store: {
    fontSize: 12,
    color: THEME.text_secondary,
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
