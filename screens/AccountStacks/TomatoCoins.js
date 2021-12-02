import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Platform,
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { THEME } from "../../DynamicStyle/style";
import { CONFIG, hp, Query } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { POINT_TYPE } from "../../constants/Query";
import {
  UpdateTomatoCoins,
  UpdateTomatoPoints,
} from "../../redux/actions/AccountDetailsAction";

const { height, width } = CONFIG;

export const TomatoCoins = ({ navigation }) => {
  const { accountDetails } = useSelector((state) => state, shallowEqual);
  const dispatch = useDispatch();

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  const { control, handleSubmit, errors, setError, clearErrors } = useForm();

  const onSubmit = (data) => {
    let balance;
    if (typeof accountDetails.data.tomato_coins == "number") {
      balance = accountDetails.data.tomato_coins;
    } else {
      balance = accountDetails.data.tomato_coins.includes(",")
        ? parseInt(accountDetails.data.tomato_coins.replace(",", ""))
        : parseInt(accountDetails.data.tomato_coins);
    }
    let val = parseInt(data.coins);

    if (isNaN(val) || val < 0) {
      setError("coins", { type: "invalid" });
      return false;
    }

    // check data is an exchangeable balance
    if (val > balance) {
      setError("coins", { type: "not_enough" });
      return false;
    }

    if (val < 200) {
      setError("coins", { type: "required" });
    } else {
      // all db and reducer stuff here

      // // to reduce coins balance from db
      Query.RemoteDebit(
        accountDetails.data.email,
        val,
        POINT_TYPE.coins,
        "Reducing " + val + " coins for exchange."
      )
        .then((res) => {
          if (res == "COMPLETED") {
            // // to update coins balance to reducer
            Query.RemoteGet(accountDetails.data.email, POINT_TYPE.coins)
              .then((data) => {
                dispatch(UpdateTomatoCoins(data));
              })
              .catch((e) => {
                console.log("Error in getting reduced coins balance => ", e);
              });
          }
        })
        .catch((e) => {
          console.log("Error in reducing coins balance => ", e);
        });

      // calculate points balance
      let _tmpPoints = Math.round(val / 200);

      if (!isNaN(_tmpPoints)) {
        // // to update points balance to db
        Query.RemoteCredit(
          accountDetails.data.email,
          _tmpPoints,
          POINT_TYPE.points,
          "Adding " +
            _tmpPoints +
            " Points getting from exchanged " +
            val +
            " Coins"
        )
          .then((res) => {
            if (res == "COMPLETED") {
              // // update points to reducer
              Query.RemoteGet(accountDetails.data.email, POINT_TYPE.points)
                .then((data) => {
                  dispatch(UpdateTomatoPoints(data));
                })
                .catch((e) => {
                  console.log("Error in getting added coins balance => ", e);
                });
            }
          })
          .catch((e) => {
            console.log("Error in adding points balance => ", e);
          });

        navigation.goBack();
      } else {
        setError("coins", { type: "invalid" });
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View
          style={{
            flexGrow: 1,
          }}
        >
          <ImageBackground
            source={require("../../assets/images/tomato_coin/bg.jpg")}
            style={{
              resizeMode: "cover",
              height: "100%",
            }}
          >
            <View
              style={{
                paddingVertical: 16,
              }}
            >
              {/* Image */}
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/tomato_coin/coin.png")}
                  style={{
                    height: (width * 25) / 100,
                    width: (width * 25) / 100,
                  }}
                  resizeMode="contain"
                />
              </View>

              {/* balance */}
              <View
                style={{
                  marginTop: 20,
                  width: "100%",
                  paddingHorizontal: 8,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    maxWidth: 200,
                    minWidth: 100,
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Roboto-Medium",
                    }}
                  >
                    {accountDetails.data.tomato_coins
                      ? accountDetails.data.tomato_coins
                      : 0}
                  </Text>
                </View>

                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Roboto-Medium",
                    marginTop: 8,
                  }}
                >
                  Tomato Reward Coin Balance
                </Text>
              </View>

              {/* info */}
              <View
                style={{
                  paddingHorizontal: 8,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="dot-circle-o" size={18} color="#fff" />

                  <View
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Roboto-Regular",
                        color: "#fff",
                        fontSize: 13,
                      }}
                    >
                      1 MMK Spending = 1 TOMATO Coin
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <FontAwesome name="dot-circle-o" size={18} color="#fff" />

                  <View
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Roboto-Regular",
                        color: "#fff",
                        fontSize: 13,
                      }}
                    >
                      TOMATO Coins can be exchanged into TOMATO Points.
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <FontAwesome name="dot-circle-o" size={18} color="#fff" />

                  <View
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Roboto-Regular",
                        color: "#fff",
                        fontSize: 13,
                      }}
                    >
                      200 TOMATO Coins = 1 TOMATO Point = 1 MMK
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Form */}
            <View
              style={{
                paddingVertical: 16,
              }}
            >
              {/* converter img */}
              <View style={styles.converterWrapper}>
                <View
                  style={{
                    height: 80,
                    width: 80,
                  }}
                >
                  <Image
                    source={require("../../assets/images/tomato_coin/cal_coins.png")}
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "contain",
                    }}
                  />
                </View>

                <Entypo
                  name="arrow-long-right"
                  color="#fff"
                  size={20}
                  style={{ marginHorizontal: 10 }}
                />

                <View
                  style={{
                    height: 80,
                    width: 80,
                  }}
                >
                  <Image
                    source={require("../../assets/images/tomato_coin/cal_points.png")}
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </View>

              {/* text Input */}
              <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    marginBottom: 10,
                    color: "#fff",
                  }}
                >
                  Change Tomato Coins into Tomato Points
                </Text>

                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <View style={styles.inputWrapper}>
                      <TextInput
                        placeholder="Coins"
                        onChangeText={(text) => {
                          onChange(text);
                        }}
                        value={value}
                        onBlur={onBlur}
                        keyboardType="numeric"
                      />
                    </View>
                  )}
                  name="coins"
                  rules={{ required: true }}
                />
                {errors.coins && errors.coins.type == "required" ? (
                  <Text style={styles.errorText}>
                    * Minimum exchangeable coins amount is 200.
                  </Text>
                ) : null}
                {errors.coins && errors.coins.type == "not_enough" ? (
                  <Text style={styles.errorText}>
                    * Sorry, you don't have enough coins.
                  </Text>
                ) : null}
                {errors.coins && errors.coins.type == "invalid" ? (
                  <Text style={styles.errorText}>
                    * Sorry, the value is invalid.
                  </Text>
                ) : null}

                {/* Change */}
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    style={styles.changeBtn}
                    onPress={handleSubmit(onSubmit)}
                  >
                    <Text
                      style={{
                        fontFamily: "Roboto-Regular",
                      }}
                    >
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* View Transaction */}
              {/* <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.historyBtn}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text style={{ fontFamily: "Roboto-Regular" }}>
                    View Transaction History
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  converterWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    backgroundColor: "#fff",
    minWidth: 150,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    fontFamily: "Roboto-Bold",
    color: "#FFF",
    marginTop: 5,
    fontSize: 13,
  },
  changeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  historyBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
