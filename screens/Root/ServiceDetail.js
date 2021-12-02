import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { apisAreAvailable } from "expo";
import { NotificationTimeoutError } from "expo-notifications";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";
import { Woo } from "../../API";
import { THEME } from "../../DynamicStyle/style";

const data = [
  {
    name: "ROYAL VETERINARY CLINIC",
    phNo: "09423616037",
    time: "8AM - 11AM",
    address: "No. 287 , Shwe Gon Daing Road, Bahan.",
  },
  {
    name: "ROYAL VETERINARY CLINIC",
    phNo: "09423616037",
    time: "8AM - 11AM",
    address: "No. 287 , Shwe Gon Daing Road, Bahan.",
  },
  {
    name: "ROYAL VETERINARY CLINIC",
    phNo: "09423616037",
    time: "8AM - 11AM",
    address: "No. 287 , Shwe Gon Daing Road, Bahan.",
  },
  {
    name: "ROYAL VETERINARY CLINIC",
    phNo: "09423616037",
    time: "8AM - 11AM",
    address: "No. 287 , Shwe Gon Daing Road, Bahan.",
  },
  {
    name: "ROYAL VETERINARY CLINIC",
    phNo: "09423616037",
    time: "8AM - 11AM",
    address: "No. 287 , Shwe Gon Daing Road, Bahan.",
  },
];
// const _backgroundImage = require("../../assets/images/services/11.png");
const ServiceDetail = ({ navigation, route }) => {
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    err: null,
  });
  useEffect(() => {
    let { name, service } = route.params;
    navigation.setOptions({ title: name });
    fetchData();
  }, []);

  const fetchData = () => {
    let { service } = route.params;

    Woo.get(`/services?type=${service}`)
      .then((res) => {
        console.log(res.data);
        setState({ ...state, data: res.data, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, isLoading: false, err: "fetch fail." });
      });
  };

  const onRetry = () => {
    setState({ ...state, isLoading: true, error: null });
    fetchData();
  };

  const getImagePath = () => {
    switch (route.params.service) {
      case "grooming":
        return require("../../assets/images/services/11.png");
      case "clinic":
        return require("../../assets/images/services/22.png");
      case "training":
        return require("../../assets/images/services/33.png");
      default:
        return require("../../assets/images/services/11.png");
    }
  };

  if (state.isLoading) {
    return (
      <View style={{ flex: 1 }}>
        {[1, 2, 3, 4, 5, 6, 7].map((d, i) => (
          <Placeholder key={i} Animation={Fade}>
            <View
              style={{
                alignItems: "center",
                marginHorizontal: 15,
                borderWidth: 0.2,
                borderRadius: 5,
                borderColor: THEME.secondary,
                marginTop: 10,
                paddingVertical: 8,
                backgroundColor: THEME.card,
                height: 110,
                justifyContent: "space-around",
              }}
            >
              <PlaceholderLine width={80} height={10} />
              <PlaceholderLine width={30} height={10} />
              <PlaceholderLine width={40} height={10} />
              <PlaceholderLine width={65} height={10} />
            </View>
          </Placeholder>
        ))}
      </View>
    );
  } else {
    if (state.data) {
      let path = getImagePath();
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={state.data}
            contentContainerStyle={{ paddingVertical: 10 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ImageBackground source={path} style={styles.cardContainer}>
                <View style={styles.nameContainer}>
                  <Text
                    style={[
                      styles.labelStyle,
                      {
                        color: THEME.primary,
                        marginBottom: 4,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
                {item.phone !== "" && (
                  <Text style={[styles.labelStyle, { color: "#28B463" }]}>
                    {item.phone}
                  </Text>
                )}
                {item.time !== "" && (
                  <Text style={[styles.labelStyle]}>{item.time}</Text>
                )}
                {item.address !== "" && (
                  <Text style={[styles.labelStyle]}>{item.address}</Text>
                )}
                <View style={styles.socialContainer}>
                  <TouchableOpacity>
                    <FontAwesome
                      name="facebook-square"
                      color="#035EAF"
                      size={20}
                      style={{ marginRight: 15, marginTop: 10 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      color="#035EAF"
                      style={{ marginTop: 10 }}
                      name="web"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.errorContainer}>
          <TouchableOpacity onPress={onRetry} style={styles.allCenter}>
            <Text>Failed To Fetch!</Text>
            <Text>Try again.</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
};
export default ServiceDetail;

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 16,
  },
  cardContainer: {
    alignItems: "center",
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: THEME.secondary,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: THEME.card,
  },
  nameContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: THEME.primary,
    marginBottom: 12,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
  allCenter: { justifyContent: "center", alignItems: "center" },
});
