import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { THEME, TYPO } from "../../DynamicStyle/style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CONFIG } from "../../constants/config";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { height, width } = CONFIG;

const ForgetPassword = () => {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
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
          height: (width * 50) / 100,
          width: (width * 50) / 100,
          borderRadius: (width * 50) / 100,
          backgroundColor: THEME.primary,
          top: "2%",
          transform: [{ translateX: -(width * 25) / 100 }],
        }}
      ></View>

      <View
        style={{
          position: "absolute",
          height: (width * 35) / 100,
          width: (width * 35) / 100,
          borderRadius: (width * 35) / 100,
          backgroundColor: THEME.primary,
          top: "30%",
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
            marginTop: -30,
            width: (width * 25) / 100,
            height: (width * 25) / 100,
            borderRadius: (width * 25) / 100,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            backgroundColor: "#fff",
          }}
        >
          <FontAwesome5
            name="wrench"
            size={(width * 10) / 100}
            color={THEME.primary}
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
            Lost your password?
          </Text>

          <Text style={{ fontFamily: "Roboto-Regular" }}>
            Please enter your username or email address. You will receive a link
            to create a new password via email.
          </Text>

          <Text
            style={{
              ...TYPO.h5,
              marginTop: 20,
            }}
          >
            Username or emaill
          </Text>

          <View
            style={{
              marginTop: 10,
              marginBottom: errors.email ? 0 : 20,
              borderBottomColor: "#333",
              borderBottomWidth: 1,
              borderStyle: "solid",
            }}
          >
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
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
                marginBottom: 20,
              }}
            >
              This field is required
            </Text>
          )}
        </View>

        <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <View
            style={{
              marginTop: 10,
              backgroundColor: THEME.primary,
              borderRadius: 8,
              paddingVertical: 16,
            }}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{
                  ...TYPO.h5,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Reset Password
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgetPassword;
