import { Item } from "native-base";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Woo } from "../../API";
import { BrandPlaceholder } from "../../components";
import { CONFIG } from "../../constants";
import { THEME } from "../../DynamicStyle/style";

const WIDTH = CONFIG.width;
const HEIGHT = CONFIG.height;
const Brands = ({ navigation, route }) => {
  const [brands, setBrands] = useState({ loading: true, data: null });

  useEffect(() => {
    Woo.get("/brands").then(({ data }) => {
      setBrands({ loading: false, data });
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View style={{ flex: 1, backgroundColor: THEME.background }}>
        {brands.loading ? (
          <View style={{ marginTop: 10 }}>
            <BrandPlaceholder num={8} />
          </View>
        ) : brands.data ? (
          <View style={styles.brandContainer}>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 12 }}
              keyExtractor={(item, index) => item.id.toString()}
              data={brands.data}
              numColumns={2}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("BrandDetail", { brand: item })
                  }
                  style={styles.brand(index)}
                  key={index}
                >
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: "center",
                      marginBottom: 7,
                    }}
                    source={
                      item.image
                        ? { uri: item.image }
                        : require("../../assets/images/placeholder.jpg")
                    }
                  />

                  <Text style={{ fontFamily: "Roboto-Medium" }}>
                    {item.name}
                  </Text>
                  <Text style={{ color: THEME.text_primary }}>
                    {item.count} products
                  </Text>
                </TouchableOpacity>
              )}
            />
            {/* {brands.data.map((item, index) => {
              return (
                <View style={styles.brand(index)} key={index}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: "center",
                      marginBottom: 7,
                    }}
                    source={
                      item.image
                        ? { uri: item.image }
                        : require("../../assets/images/placeholder.jpg")
                    }
                  />

                  <Text style={{ fontFamily: "Roboto-Medium" }}>
                    {item.name}
                  </Text>
                  <Text style={{ color: THEME.text_primary }}>
                    {item.count} products
                  </Text>
                </View>
              );
            })} */}
          </View>
        ) : (
          <View style={{ marginVertical: 5 }} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Brands;

const styles = StyleSheet.create({
  title: { fontSize: 20, fontFamily: "Roboto-Medium", marginBottom: 8 },
  leftView: {
    width: 3,
    height: 22,
    backgroundColor: THEME.primary,
    marginRight: 8,
  },
  brandContainer: {
    marginTop: 12,
  },
  brand: (index) => ({
    width: WIDTH / 2 - 14,
    height: 120,
    // borderWidth: 0.2,
    borderColor: THEME.secondary,
    backgroundColor: THEME.card,
    borderRadius: 5,
    marginRight: index % 2 == 0 ? 5 : 0,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  }),
});
