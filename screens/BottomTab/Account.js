import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Container from "../../components/Container";
import { CONFIG, hp, Query } from "../../constants";
import { THEME, TYPO } from "../../DynamicStyle/style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  CommonActions,
  StackActions,
  useFocusEffect,
} from "@react-navigation/native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  AddCoupon,
  FetchAccountDetails,
  RemoveCouponReducer,
  SetAccountDetails,
  UpdateAccountDetails,
  UpdateTomatoCoins,
  UpdateTomatoPoints,
} from "../../redux/actions/AccountDetailsAction";
import { Placeholder, PlaceholderLine, PlaceholderMedia } from "rn-placeholder";
import { ClearOrders } from "../../redux/actions/OrdersAction";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import Modal from "react-native-modal";
import { POINT_TYPE } from "../../constants/Query";
import { FontAwesome } from "@expo/vector-icons";

const { height, width } = CONFIG;

export default function Account({ navigation }) {
  const dispatch = useDispatch();
  const { accountDetails } = useSelector((state) => state, shallowEqual);
  const [tomatoCoinsModal, setTomatoCoinsModal] = useState(false);
  const [tomatoPointsModal, setTomatoPointsModal] = useState(false);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  useEffect(() => {
    dispatch(FetchAccountDetails());
    // dispatch(AddCoupon({ id: 54970, coupon: "developer", saving: 1000 }));
  }, []);

  useEffect(() => {
    if (accountDetails.data) {
      if (accountDetails.data.email) {
        FetchCoins(accountDetails.data.email);
        FetchPoints(accountDetails.data.email);
      }
    }
  }, [accountDetails.data.email]);

  useEffect(() => {
    if (accountDetails.data.id) {
      RegisterPushNotificationAsync()
        .then(({ status, token }) => {
          if (status === "denied") {
            dispatch(
              UpdateAccountDetails({
                ...accountDetails.data,
                meta_data: [
                  {
                    key: "token",
                    value: null,
                  },
                ],
              })
            );
          } else {
            dispatch(
              UpdateAccountDetails({
                ...accountDetails.data,
                meta_data: [
                  {
                    key: "token",
                    value: token,
                  },
                ],
              })
            );
          }
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const FetchCoins = (account) => {
    Query.RemoteGet(account, POINT_TYPE.coins)
      .then((data) => {
        if (data !== accountDetails.data.tomato_coins) {
          dispatch(UpdateTomatoCoins(data));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const FetchPoints = (account) => {
    Query.RemoteGet(account, POINT_TYPE.points)
      .then((data) => {
        if (data !== accountDetails.data.tomato_points) {
          dispatch(UpdateTomatoPoints(data));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const RegisterPushNotificationAsync = async () => {
    let token;
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // console.log(await Notifications.getDevicePushTokenAsync());
    token = (await Notifications.getExpoPushTokenAsync()).data;
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("order_channel", {
        name: "order_channel",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return {
      status: finalStatus,
      token,
    };
  };

  const handleLogout = async () => {
    dispatch(
      SetAccountDetails({
        id: null,
        // data: {
        //   id: null,
        // },
        // loading: false,
      })
    );

    dispatch(ClearOrders());
    // navigation.navigate("Auth");
    navigation.navigate("AccountTab", {
      screen: "Auth",
    });
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: "Auth" }],
    //   })
    // );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <Container style={{ backgroundColor: THEME.background }}>
        {/* name and mail */}
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: "#fff",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            {accountDetails.loading ? (
              <Placeholder
                style={{
                  height: 25,
                }}
              >
                <PlaceholderLine height={25} />
              </Placeholder>
            ) : (
              <Text
                style={{
                  ...TYPO.h1,
                  color: THEME.primary,
                  textTransform: "capitalize",
                }}
              >
                {accountDetails.data.first_name && accountDetails.data.last_name
                  ? accountDetails.data.first_name +
                    " " +
                    accountDetails.data.last_name
                  : accountDetails.data.username}
              </Text>
            )}

            {accountDetails.loading ? (
              <Placeholder
                style={{
                  height: 20,
                  marginTop: 10,
                }}
              >
                <PlaceholderLine height={25} width={80} />
              </Placeholder>
            ) : (
              <Text
                style={{
                  ...TYPO.h5,
                  marginTop: 10,
                }}
              >
                {accountDetails.data.email}
              </Text>
            )}
          </View>

          <View
            style={{
              width: (width * 30) / 100,
              alignItems: "center",
            }}
          >
            <View style={[styles.profileWrapper]}>
              <Fontisto
                name="person"
                size={(width * 10) / 100}
                color={THEME.primary}
              />
            </View>
          </View>
        </View>

        {/* Icons */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 8,
            justifyContent: "space-around",
          }}
        >
          {/* Tomato Points */}
          <TouchableOpacity
            onPress={() => {
              setTomatoPointsModal(true);
            }}
          >
            <View style={[styles.boxWrapper]}>
              <View style={[styles.box, { flexDirection: "row" }]}>
                <View
                  style={{
                    width: 15,
                  }}
                >
                  <FontAwesome5 name="dollar-sign" size={15} color={"#fff"} />
                </View>

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto-Medium",
                      fontSize: 14,
                      marginLeft: 5,
                      color: "#fff",
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                  >
                    {accountDetails.data.tomato_points
                      ? accountDetails.data.tomato_points
                      : 0}{" "}
                    points
                  </Text>
                </View>
              </View>
              <Text style={[styles.boxText]}>Tomato Points</Text>
            </View>
          </TouchableOpacity>
          {/* Modal for points */}
          <Modal
            isVisible={tomatoPointsModal}
            style={{ alignItems: "center" }}
            onBackButtonPress={() => {
              setTomatoPointsModal(false);
            }}
            onBackdropPress={() => {
              setTomatoPointsModal(false);
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "100%",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                  }}
                >
                  You have{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    color: THEME.primary,
                  }}
                >
                  {accountDetails.data.tomato_points
                    ? accountDetails.data.tomato_points
                    : 0}{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                  }}
                >
                  TOMATO Points.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Bold",
                    fontSize: 10,
                  }}
                >
                  * 200 TOMATO Coins can be exchanged to 1 TOMATO Point
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto-Bold",
                    fontSize: 10,
                  }}
                >
                  * 1 TOMATO Point is equal to 1 MMK
                </Text>
              </View>
            </View>
          </Modal>

          {/* Tomato Coins */}
          <TouchableOpacity
            onPress={() => {
              setTomatoCoinsModal(true);
            }}
          >
            <View style={[styles.boxWrapper]}>
              <View style={[styles.box, { flexDirection: "row" }]}>
                <View
                  style={{
                    width: 15,
                  }}
                >
                  <FontAwesome5 name="coins" size={15} color={"#fff"} />
                </View>

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto-Medium",
                      fontSize: 14,
                      marginLeft: 5,
                      color: "#fff",
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                  >
                    {accountDetails.data.tomato_coins
                      ? accountDetails.data.tomato_coins
                      : 0}{" "}
                    coins
                  </Text>
                </View>
              </View>
              <Text style={[styles.boxText]}>Tomato Coins</Text>
            </View>
          </TouchableOpacity>
          {/* Modal for coins */}
          <Modal
            isVisible={tomatoCoinsModal}
            style={{ alignItems: "center" }}
            onBackButtonPress={() => {
              setTomatoCoinsModal(false);
            }}
            onBackdropPress={() => {
              setTomatoCoinsModal(false);
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "100%",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                  }}
                >
                  You have{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    color: THEME.primary,
                  }}
                >
                  {accountDetails.data.tomato_coins
                    ? accountDetails.data.tomato_coins
                    : 0}{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                  }}
                >
                  TOMATO coins.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Bold",
                    fontSize: 10,
                  }}
                >
                  1 MMK Spending = 1 TOMATO Coin
                </Text>
              </View>
            </View>
          </Modal>

          {/* Exchange */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TomatoCoins");
            }}
          >
            <View style={[styles.boxWrapper]}>
              <View style={[styles.box]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5
                    name="coins"
                    size={20}
                    color={"#fff"}
                    style={{
                      marginRight: 10,
                    }}
                  />

                  <FontAwesome5 name="exchange-alt" size={15} color={"#fff"} />

                  <FontAwesome5
                    name="dollar-sign"
                    size={20}
                    color={"#fff"}
                    style={{
                      marginLeft: 10,
                    }}
                  />
                </View>
              </View>
              <Text style={[styles.boxText]}>Exchange</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Inner screen Navigations */}
        <View
          style={{
            paddingHorizontal: 8,
          }}
        >
          {/* Orders */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Orders");
            }}
          >
            <View style={[styles.list]}>
              <View
                style={{
                  width: 20,
                  marginRight: 10,
                  justifyContent: "center",
                }}
              >
                <Octicons name="checklist" size={20} color={THEME.primary} />
              </View>

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={{ ...TYPO.h5 }}>Orders</Text>
              </View>

              <View
                style={{
                  width: 20,
                }}
              >
                <FontAwesome5 name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          {/* RMA Request */}
          {/* <TouchableOpacity
            onPress={() => {
              Alert.alert("Coming Soon!");
            }}
          >
            <View style={[styles.list]}>
              <View
                style={{
                  width: 20,
                  marginRight: 10,
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="comment-question"
                  size={20}
                  color={THEME.primary}
                />
              </View>

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={{ ...TYPO.h5 }}>RMA Request</Text>
              </View>

              <View
                style={{
                  width: 20,
                }}
              >
                <FontAwesome5 name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity> */}

          {/* Shipping Address */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ShippingAddress");
            }}
          >
            <View style={[styles.list]}>
              <View
                style={{
                  width: 20,
                  marginRight: 10,
                  justifyContent: "center",
                }}
              >
                <Entypo name="location" size={20} color={THEME.primary} />
              </View>

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={{ ...TYPO.h5 }}>Shipping Address</Text>
              </View>

              <View
                style={{
                  width: 20,
                }}
              >
                <FontAwesome5 name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Billing Address */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BillingAddress");
            }}
          >
            <View style={[styles.list]}>
              <View
                style={{
                  width: 20,
                  marginRight: 10,
                  justifyContent: "center",
                }}
              >
                <Entypo name="location" size={20} color={THEME.primary} />
              </View>

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={{ ...TYPO.h5 }}>Billing Address</Text>
              </View>

              <View
                style={{
                  width: 20,
                }}
              >
                <FontAwesome5 name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Account Details */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AccountDetails");
            }}
          >
            <View style={[styles.list]}>
              <View
                style={{
                  width: 20,
                  marginRight: 10,
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="account-settings"
                  size={20}
                  color={THEME.primary}
                />
              </View>

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={{ ...TYPO.h5 }}>Account Details</Text>
              </View>

              <View
                style={{
                  width: 20,
                }}
              >
                <FontAwesome5 name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Wishlist */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Wishlist");
            }}
          >
            <View style={[styles.list]}>
              <View
                style={{
                  width: 20,
                  marginRight: 10,
                  justifyContent: "center",
                }}
              >
                <SimpleLineIcons name="heart" size={20} color={THEME.primary} />
              </View>

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={{ ...TYPO.h5 }}>Wishlist</Text>
              </View>

              <View
                style={{
                  width: 20,
                }}
              >
                <FontAwesome5 name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Coupons */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Coupons");
            }}
          >
            <View style={[styles.list]}>
              <View
                style={{
                  width: 20,
                  marginRight: 10,
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="ticket" size={20} color={THEME.primary} />
              </View>

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={{ ...TYPO.h5 }}>Coupons</Text>
              </View>

              <View
                style={{
                  width: 20,
                }}
              >
                <FontAwesome5 name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginVertical: 20,
            paddingHorizontal: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleLogout();
            }}
          >
            <View
              style={{
                backgroundColor: THEME.primary,
                paddingVertical: 16,
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  ...TYPO.h3,
                  color: "#fff",
                }}
              >
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileWrapper: {
    height: (width * 20) / 100,
    width: (width * 20) / 100,
    borderRadius: (width * 20) / 100,
    borderColor: THEME.primary,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boxWrapper: {
    width: (width * 30) / 100,
    paddingVertical: 16,
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: (width * 15) / 100,
    borderRadius: 10,
    backgroundColor: THEME.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  boxText: {
    ...TYPO.h5,
    textAlign: "center",
    marginTop: 8,
  },
  list: {
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
});
