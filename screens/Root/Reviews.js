import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Woo } from "../../API";
import Axios from "axios";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { AirbnbRating, Rating } from "react-native-ratings";
import { THEME } from "../../DynamicStyle/style";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import { hp } from "../../constants";

const ReviewPlaceholder = () => (
  <Placeholder
    Animation={Fade}
    style={{ marginVertical: 8 }}
    Left={PlaceholderMedia}
  >
    <PlaceholderLine width={50} />
    <PlaceholderLine width={100} />
  </Placeholder>
);

export default function Reviews({ route }) {
  const product_id = route.params.product_id;
  const source = Axios.CancelToken.source();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReview = async () => {
    setLoading(true);
    try {
      const { data } = await Woo.get(`/reviews/${product_id}`, {
        cancelToken: source.token,
      });
      setReviews(data);
      setLoading(false);
    } catch (e) {
      if (!Axios.isCancel(e)) {
        console.log(e);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
    return () => {
      source.cancel("Not Mounted");
    };
  }, [product_id]);

  const getAvator = (review) => {
    return Object.values(review.avatar)[2];
  };

  const RenderReviews = ({ item }) => (
    <View style={styles.reviewWrapper}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          overflow: "hidden",
          marginRight: 16,
        }}
      >
        <Image
          source={{ uri: getAvator(item) }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <Text>{item.reviewer} - </Text>
          <Text>{moment(item.review_at).fromNow()}</Text>
        </View>
        <Rating
          isDisabled
          startingValue={item.rating}
          ratingCount={5}
          imageSize={20}
          ratingColor={THEME.primary}
          ratingBackgroundColor="#fff"
        />
        <Text>{item.review}</Text>
      </View>
    </View>
  );

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "android" ? "transparent" : THEME.primary,
        }}
      >
        <FlatList
          data={[...new Array(15).keys()]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <ReviewPlaceholder />}
          contentContainerStyle={{
            padding: 8,
            backgroundColor: THEME.background,
          }}
        />
      </SafeAreaView>
    );
  }

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
          backgroundColor: THEME.background,
        }}
      >
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderReviews}
          contentContainerStyle={{ padding: 8, backgroundColor: "#fff" }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reviewWrapper: {
    flexDirection: "row",
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
});
