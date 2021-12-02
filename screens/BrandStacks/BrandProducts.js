import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Woo } from "../../API";
import { ProductGrid, ProductGridPlaceholder } from "../../components";
import { THEME } from "../../DynamicStyle/style";
import { useProductCategory } from "../../hooks/useProductCategory";
import { useStoreBrand } from "../../hooks/useStoreBrand";

const BrandDetail = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({ title: route.params.brand.name });
  }, []);
  const brandProducts = useStoreBrand(route.params.brand.id);
  //   const petGrooming = useProductCategory(2198);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View style={{ flex: 1, backgroundColor: THEME.background }}>
        {brandProducts.loading ? (
          <View style={{ marginTop: 10 }}>
            <ProductGridPlaceholder />
          </View>
        ) : brandProducts.data.length > 0 ? (
          <ScrollView>
            <ProductGrid products={brandProducts.data} />
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No products found!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BrandDetail;
