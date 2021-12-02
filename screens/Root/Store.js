import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Woo, Vendor } from "../../API";
import { useSelector } from "react-redux";
import {
  Container,
  ProductGrid,
  ProductGridPlaceholder,
} from "../../components";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

import { CONFIG, hp } from "../../constants";
import Axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { THEME } from "../../DynamicStyle/style";

const Store = ({ navigation, route }) => {
  const { id, name } = route.params;

  const [loadingStore, setLoadingStore] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [store, setStore] = useState(null);
  const [products, setProduct] = useState(null);

  let source = Axios.CancelToken.source();

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, []);

  useEffect(() => {
    Vendor.get(`/stores/${id}`, { cancelToken: source.token })
      .then(({ data }) => {
        setStore(data);
        setLoadingStore(false);
      })
      .catch((e) => {
        if (Axios.isCancel(e)) {
        } else setLoadingStore(false);
      });

    Woo.get(`/stores/${id}/products?per_page=100`, {
      cancelToken: source.token,
    })
      .then(({ data }) => {
        setProduct(data);
        setLoadingProduct(false);
      })
      .catch((e) => {
        if (Axios.isCancel(e)) {
        } else setLoadingProduct(false);
      });
    return () => {
      source.cancel();
    };
  }, []);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <Container style={{ backgroundColor: THEME.background }}>
        {loadingStore ? (
          <Placeholder style={{ marginBottom: 10 }} Animation={Fade}>
            <PlaceholderLine
              height={200}
              style={{ borderRadius: 0, marginBottom: 0 }}
            />
          </Placeholder>
        ) : (
          store && (
            <View
              style={{ width: CONFIG.width, height: 200, marginBottom: 10 }}
            >
              {store.banner ? (
                <Image
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="stretch"
                  source={{ uri: store.banner }}
                />
              ) : (
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={require("../../assets/images/placeholder.jpg")}
                />
              )}
            </View>
          )
        )}
        {loadingProduct ? (
          <ProductGridPlaceholder />
        ) : products && products.length ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 8,
            }}
          >
            {products.map((product, i) => (
              <View key={i}>
                <ProductGrid product={product} index={i} key={i} />
              </View>
            ))}
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>No products found.</Text>
          </View>
        )}
      </Container>
    </SafeAreaView>
  );
};

export default Store;
