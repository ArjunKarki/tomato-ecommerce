import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { THEME, TYPO } from "../../DynamicStyle/style";
import { CONFIG } from "../../constants/config";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Woo } from "../../API";
import { useDispatch } from "react-redux";
import { SetAccountDetails } from "../../redux/actions/AccountDetailsAction";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import logo from "../../assets/icon.png";
import { hp } from "../../constants";

const { height, width } = CONFIG;

const Register = ({ navigation }) => {
  const { control, handleSubmit, errors, setError, clearErrors } = useForm();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    hidePassword: true,
    hideConfirmPassword: true,
    loading: false,
  });

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  const emailTypeValidate = (email) => {
    let mailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailFormat.test(email);
  };

  const handleRegister = (data) => {
    setState({ ...state, loading: true });
    if (data.confirmPassword !== data.password) {
      setError("PasswordNotMatch", {
        message: "Password does not match",
      });
      setState({ ...state, loading: false });
    } else {
      Woo.post("/user", {
        email: data.email,
        password: data.password,
        phone: data.phone.match(/\+?\d{1,}/).join(),
      }).then(({ data }) => {
        if (data.status !== "OK") {
          setError("RegisterationError", {
            message: data.message.match(/[^((Error:)\s)].*[\.]/),
          });
          setState({ ...state, loading: false });
        } else {
          dispatch(
            SetAccountDetails({
              id: data.data.ID,
            })
          );

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Account" }],
            })
          );
        }
      });
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
            height: (width * 35) / 100,
            width: (width * 35) / 100,
            borderRadius: (width * 35) / 100,
            backgroundColor: THEME.primary,
            top: "2%",
            transform: [{ translateX: -(width * 17.5) / 100 }],
          }}
        ></View>

        <View
          style={{
            position: "absolute",
            height: (width * 50) / 100,
            width: (width * 50) / 100,
            borderRadius: (width * 50) / 100,
            backgroundColor: THEME.primary,
            top: "45%",
            right: 0,
            transform: [{ translateX: (width * 25) / 100 }],
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
              width: (width * 35) / 100,
              height: (width * 35) / 100,
              borderRadius: (width * 35) / 100,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              backgroundColor: THEME.text_secondary,
            }}
          >
            <Image
              source={logo}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: (width * 35) / 100,
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
            <Text style={{ ...TYPO.h3, marginTop: 8, marginBottom: 20 }}>
              Register An Account
            </Text>

            {errors.RegisterationError && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 10,
                }}
              >
                {errors.RegisterationError.message}
              </Text>
            )}

            {/* email */}
            <View
              style={[
                styles.inputWrapper,
                { marginBottom: errors.email ? 0 : 20 },
              ]}
            >
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    placeholder="Email address"
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    value={value}
                    onFocus={() => {
                      clearErrors(["RegisterationError", "validate"]);
                    }}
                  />
                )}
                name="email"
                rules={{ required: true, validate: emailTypeValidate }}
              />
            </View>
            {errors.email && errors.email.type !== "validate" && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 20,
                }}
              >
                This field is required
              </Text>
            )}
            {errors.email && errors.email.type === "validate" && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 20,
                }}
              >
                Your email is invalid.
              </Text>
            )}

            {/* password */}
            <View
              style={[
                styles.inputWrapper,
                {
                  marginBottom:
                    errors.password || errors.PasswordNotMatch ? 0 : 20,
                },
              ]}
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
                      secureTextEntry={state.hidePassword}
                      placeholder="Password"
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      value={value}
                      style={{ flex: 1 }}
                      onFocus={() => {
                        clearErrors("PasswordNotMatch");
                      }}
                    />
                    <TouchableOpacity
                      onPressIn={() => {
                        setState({ ...state, hidePassword: false });
                      }}
                      onPressOut={() => {
                        setState({ ...state, hidePassword: true });
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
                defaultValue={null}
              />
            </View>
            {errors.password && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 20,
                }}
              >
                This field is required
              </Text>
            )}
            {errors.PasswordNotMatch && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 20,
                }}
              >
                Passwords do not match.
              </Text>
            )}

            {/* confirm password */}
            <View
              style={[
                styles.inputWrapper,
                {
                  marginBottom:
                    errors.confirmPassword || errors.PasswordNotMatch ? 0 : 20,
                },
              ]}
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
                      secureTextEntry={state.hideConfirmPassword}
                      placeholder="Confirm Password"
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      value={value}
                      style={{ flex: 1 }}
                      onFocus={() => {
                        clearErrors("PasswordNotMatch");
                      }}
                    />
                    <TouchableOpacity
                      onPressIn={() => {
                        setState({ ...state, hideConfirmPassword: false });
                      }}
                      onPressOut={() => {
                        setState({ ...state, hideConfirmPassword: true });
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
                name="confirmPassword"
                rules={{ required: true }}
                defaultValue={null}
              />
            </View>
            {errors.confirmPassword && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 20,
                }}
              >
                This field is required
              </Text>
            )}
            {errors.PasswordNotMatch && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 20,
                }}
              >
                Passwords do not match.
              </Text>
            )}

            {/* phone */}
            <View
              style={[
                styles.inputWrapper,
                {
                  marginBottom: errors.phone ? 0 : 20,
                },
              ]}
            >
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Phone"
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="phone"
                rules={{ required: true }}
              />
            </View>
            {errors.phone && (
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  color: THEME.primary,
                  marginBottom: 20,
                }}
              >
                This field is required
              </Text>
            )}
          </View>

          {/* Register */}
          <TouchableOpacity onPress={handleSubmit(handleRegister)}>
            <View
              style={{
                marginTop: 20,
                backgroundColor: THEME.primary,
                borderRadius: 8,
                paddingVertical: 16,
              }}
            >
              {state.loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{
                    ...TYPO.h5,
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Register
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
});

export default Register;
