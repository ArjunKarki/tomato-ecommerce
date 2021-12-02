import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Woo } from "../../API";
import { ProductGrid, ProductGridPlaceholder } from "../../components";

const PromoWithTag = ({ navigation, route }) => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    let { params } = route;

    {
      params.name && navigation.setOptions({ title: params.name });
    }

    Woo.get(`products?tag=${params.tagId}&per_page=20`)
      .then((res) => {
        setloading(false);
        setproducts(res.data);
      })
      .catch((err) => this.setloading(false));
  }, []);

  useEffect(() => {}, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <ProductGridPlaceholder />
      ) : products.length > 0 ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 8,
            marginTop: 5,
          }}
        >
          {products.map((item, index) => (
            <ProductGrid key={index} product={item} index={index} />
          ))}
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginTop: "50%",
          }}
        >
          <Text>No products found.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default PromoWithTag;
