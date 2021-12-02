import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { THEME, TYPO } from "../../DynamicStyle/style";
import { CONFIG } from "../../constants/config";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Woo } from "../../API";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { SetAccountDetails } from "../../redux/actions/AccountDetailsAction";
import logo from "../../assets/icon.png";
import * as WebBrowser from "expo-web-browser";
import { hp } from "../../constants";
const { height, width } = CONFIG;

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLogingIn, setIsLogingIn] = useState(false);
  const [seePassword, setSeePassword] = useState(true);
  const { control, handleSubmit, errors, setError, clearErrors } = useForm();
  const { accountDetails, orders } = useSelector(
    (state) => state,
    shallowEqual
  );

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  const clearLoginFailedError = () => {
    clearErrors("LoginFailed");
  };

  const handleLogin = (data) => {
    setIsLogingIn(true);

    try {
      Woo.post("/user/login", {
        email: data.email,
        password: data.password,
      }).then(({ data }) => {
        if (data.status === "OK") {
          dispatch(
            SetAccountDetails({
              id: data.data.ID,
            })
          );
          navigation.navigate("Account");
          // navigation.navigate("AccountTab", {
          //   screen: "Account",
          //   initial: false,
          // });
          // navigation.dispatch(
          //   CommonActions.reset({
          //     index: 1,
          //     routes: [{ name: "Account" }],
          //   })
          // );
        } else {
          setError("LoginFailed", {
            message: "Username or Password is incorrect.",
          });
          setIsLogingIn(false);
        }
      });
    } catch (err) {
      console.log("error in loging user in => ", err);
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
          paddingHorizontal: 8,
          paddingVertical: 16,
          backgroundColor: THEME.background,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            height: width,
            width: width,
            borderRadius: width / 2,
            backgroundColor: THEME.primary,
            top: 0,
            left: 0,
            transform: [{ translateY: -width / 2 }, { translateX: -width / 2 }],
          }}
        ></View>

        <View
          style={{
            position: "absolute",
            height: width,
            width: width,
            borderRadius: width,
            backgroundColor: "#fff",
            bottom: 0,
            right: 0,
            transform: [{ translateX: width / 2 }, { translateY: width / 2 }],
          }}
        ></View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: (width * 45) / 100,
              height: (width * 45) / 100,
              borderRadius: (width * 45) / 100,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              backgroundColor: THEME.text_secondary,
              borderWidth: 5,
              borderColor: THEME.background,
              borderStyle: "solid",
            }}
          >
            <Image
              source={logo}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: (width * 45) / 100,
              }}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              padding: 20,
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 8,
            }}
          >
            <Text style={{ ...TYPO.h3, marginVertical: 8 }}>
              Log In Your Account
            </Text>

            <View
              style={{
                marginTop: 20,
                marginBottom: errors.email ? 0 : 10,
                borderBottomColor: "#333",
                borderBottomWidth: 1,
                borderStyle: "solid",
              }}
            >
              {errors.LoginFailed && (
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    color: THEME.primary,
                  }}
                >
                  {errors.LoginFailed.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    placeholder="User name or email address"
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    onBlur={onBlur}
                    onFocus={clearLoginFailedError}
                  />
                )}
                name="email"
                rules={{ required: true }}
              />
            </View>
            {errors.email && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 10,
                }}
              >
                Username or Email address cannot be empty.
              </Text>
            )}

            <View
              style={{
                marginTop: 25,
                marginBottom: errors.password ? 0 : 32,
                borderBottomColor: "#333",
                borderBottomWidth: 1,
                borderStyle: "solid",
              }}
            >
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      secureTextEntry={seePassword}
                      placeholder="Password"
                      onChangeText={(text) => onChange(text)}
                      value={value}
                      onBlur={onBlur}
                      onFocus={clearLoginFailedError}
                      style={{ flex: 1 }}
                    />

                    <TouchableOpacity
                      onPressIn={() => {
                        setSeePassword(false);
                      }}
                      onPressOut={() => {
                        setSeePassword(true);
                      }}
                    >
                      <View
                        style={{
                          paddingHorizontal: 8,
                          justifyContent: "center",
                        }}
                      >
                        <FontAwesome5 name="eye" size={20} color="#888" />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                name="password"
                rules={{ required: true }}
              />
            </View>
            {errors.password && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 32,
                }}
              >
                Password is required.
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("ForgetPassword");
              WebBrowser.openBrowserAsync(
                "https:/tomato.com.mm/my-account/lost-password/"
              );
            }}
          >
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text style={{ color: THEME.primary }}>Forgot Password?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit(handleLogin)}>
            <View
              style={{
                marginTop: 10,
                backgroundColor: THEME.primary,
                borderRadius: 8,
                paddingVertical: 16,
              }}
            >
              {isLogingIn ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{
                    ...TYPO.h5,
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Log In
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 16,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: "Roboto-Light", marginRight: 5 }}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  color: THEME.primary,
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
