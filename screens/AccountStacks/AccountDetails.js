import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { Container, ModalButtons, ModalPasswordInput } from "../../components";
import { CONFIG, hp } from "../../constants";
import { THEME, TYPO } from "../../DynamicStyle/style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Modal from "react-native-modal";
import { useForm, Controller } from "react-hook-form";
import { UpdateAccountDetails } from "../../redux/actions/AccountDetailsAction";
import { Woo } from "../../API";
import { useFocusEffect } from "@react-navigation/native";

const { height, width } = CONFIG;

const emailTypeValidate = (email) => {
  let mailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return mailFormat.test(email);
};

function AccountDetails({ navigation }) {
  const dispatch = useDispatch();
  const { accountDetails } = useSelector((state) => state, shallowEqual);

  const [state, setState] = useState({
    hideOldPassword: true,
    hideNewPassword: true,
    hideConfirmPassword: true,
    contactNameModalVisible: false,
    emailModalVisible: false,
    passwordModalVisible: false,
    updating: false,
  });
  const { control, handleSubmit, errors, setError, clearErrors } = useForm();

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("PasswordNotMatch");
    } else {
      setState({
        ...state,
        contactNameModalVisible: false,
        emailModalVisible: false,
        passwordModalVisible: false,
        updating: true,
      });

      if (data.oldPassword) {
        Woo.post("/user/login", {
          email: accountDetails.data.email,
          password: data.oldPassword,
        }).then((res) => {
          if (res.data.status !== "OK") {
            setError("WrongPassword");
            setState({
              ...state,
              updating: false,
              passwordModalVisible: true,
            });
          } else {
            dispatch(
              UpdateAccountDetails({
                first_name: data.first_name
                  ? data.first_name
                  : accountDetails.data.first_name,
                last_name: data.last_name
                  ? data.last_name
                  : accountDetails.data.last_name,
                email: data.email ? data.email : accountDetails.data.email,
                password: data.newPassword,
              })
            );
          }
        });
      } else {
        dispatch(
          UpdateAccountDetails({
            first_name: data.first_name
              ? data.first_name
              : accountDetails.data.first_name,
            last_name: data.last_name
              ? data.last_name
              : accountDetails.data.last_name,
            email: data.email ? data.email : accountDetails.data.email,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (!accountDetails.loading) {
      setState({
        ...state,
        updating: false,
      });
    }
  }, [accountDetails.loading]);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Platform.OS === "android" ? "transparent" : THEME.primary }}>
      <Container style={{backgroundColor: THEME.background}}>
        <View
          style={{
            marginTop: 10,
            padding: 8,
            backgroundColor: "#fff",
          }}
        >
          {/* updating modal */}
          <Modal
            isVisible={state.updating}
            style={{
              alignItems: "center",
            }}
          >
            <View style={[styles.updatingModalLoader]}>
              <ActivityIndicator color={THEME.primary} />
            </View>
          </Modal>

          {/* Contact Name */}
          <TouchableOpacity
            onPress={() => {
              setState({ ...state, contactNameModalVisible: true });
            }}
          >
            <View
              style={[
                styles.listBox,
                {
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Text
                style={{
                  ...TYPO.h5,
                  flex: 1,
                }}
              >
                Contact Name
              </Text>

              <Text
                style={{
                  ...TYPO.h5,
                  color: "#444",
                  marginRight: 10,
                }}
              >
                {accountDetails.data.first_name} {accountDetails.data.last_name}
              </Text>

              <FontAwesome5 name="angle-right" size={20} color="#999" />
            </View>
          </TouchableOpacity>
          <Modal
            deviceHeight={height}
            deviceWidth={width}
            isVisible={state.contactNameModalVisible}
            avoidKeyboard={true}
            backdropOpacity={0.1}
            onBackdropPress={() => {
              setState({ ...state, contactNameModalVisible: false });
            }}
            onBackButtonPress={() => {
              setState({ ...state, contactNameModalVisible: false });
            }}
            style={{ justifyContent: "flex-end", margin: 0 }}
          >
            <View style={[styles.modalChild]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...TYPO.h5,
                    paddingVertical: 8,
                    marginRight: 10,
                  }}
                >
                  First Name
                </Text>

                <View style={[styles.inputTextWrapper]}>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder={accountDetails.data.first_name}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        onBlur={onBlur}
                      />
                    )}
                    name="first_name"
                    defaultValue={null}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...TYPO.h5,
                    paddingVertical: 8,
                    marginRight: 10,
                  }}
                >
                  Last Name
                </Text>

                <View style={[styles.inputTextWrapper]}>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder={accountDetails.data.last_name}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        onBlur={onBlur}
                      />
                    )}
                    name="last_name"
                    defaultValue={null}
                  />
                </View>
              </View>

              {/* options */}
              <ModalButtons
                onSave={handleSubmit(onSubmit)}
                onCancel={() => {
                  setState({
                    ...state,
                    contactNameModalVisible: false,
                  });
                }}
              />
            </View>
          </Modal>

          {/* Email */}
          <TouchableOpacity
            onPress={() => {
              setState({ ...state, emailModalVisible: true });
            }}
          >
            <View
              style={[
                styles.listBox,
                {
                  borderBottomWidth: 0,
                },
              ]}
            >
              <Text
                style={{
                  ...TYPO.h5,
                  flex: 1,
                }}
              >
                Email
              </Text>

              <Text
                style={{
                  ...TYPO.h5,
                  color: "#444",
                  marginRight: 10,
                }}
              >
                {accountDetails.data.email}
              </Text>

              <FontAwesome5 name="angle-right" size={20} color="#999" />
            </View>
          </TouchableOpacity>
          <Modal
            deviceHeight={height}
            deviceWidth={width}
            isVisible={state.emailModalVisible}
            avoidKeyboard={true}
            backdropOpacity={0.1}
            onBackdropPress={() => {
              setState({ ...state, emailModalVisible: false });
            }}
            onBackButtonPress={() => {
              setState({ ...state, emailModalVisible: false });
            }}
            style={{ justifyContent: "flex-end", margin: 0 }}
          >
            <View style={[styles.modalChild]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...TYPO.h5,
                    paddingVertical: 8,
                    marginRight: 10,
                  }}
                >
                  Email
                </Text>

                <View style={[styles.inputTextWrapper]}>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder={accountDetails.data.email}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        onBlur={onBlur}
                        onFocus={() => {
                          clearErrors(errors.email);
                        }}
                      />
                    )}
                    name="email"
                    defaultValue={null}
                    rules={{ validate: emailTypeValidate }}
                  />
                </View>
              </View>
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

              {/* options */}
              <ModalButtons
                onSave={handleSubmit(onSubmit)}
                onCancel={() => {
                  setState({
                    ...state,
                    emailModalVisible: false,
                  });
                }}
              />
            </View>
          </Modal>
        </View>

        {/* change password */}
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 8,
            paddingVertical: 8,
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setState({ ...state, passwordModalVisible: true });
            }}
          >
            <View style={[styles.listBox, { marginBottom: 0 }]}>
              <Text
                style={{
                  ...TYPO.h5,
                  flex: 1,
                }}
              >
                Change Password
              </Text>
              <FontAwesome5 name="angle-right" size={20} color="#999" />
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          deviceHeight={height}
          deviceWidth={width}
          isVisible={state.passwordModalVisible}
          avoidKeyboard={true}
          backdropOpacity={0.1}
          onBackdropPress={() => {
            setState({ ...state, passwordModalVisible: false });
          }}
          onBackButtonPress={() => {
            setState({ ...state, passwordModalVisible: false });
          }}
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          <View style={[styles.modalChild]}>
            <View>
              {/* Old password */}
              <Text style={{ ...TYPO.h5 }}> Old Password </Text>
              <View
                style={[
                  styles.inputPasswordWrapper,
                  {
                    marginBottom:
                      errors.oldPassword || errors.WrongPassword ? 0 : 20,
                  },
                ]}
              >
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <ModalPasswordInput
                      props={{
                        onChange,
                        onBlur,
                        value,
                        onPressIn: () => {
                          setState({ ...state, hideOldPassword: false });
                        },
                        onPressOut: () => {
                          setState({ ...state, hideOldPassword: true });
                        },
                        onFocus: () => {
                          clearErrors("WrongPassword");
                        },
                        hidePassword: state.hideOldPassword,
                      }}
                    />
                  )}
                  name="oldPassword"
                  defaultValue={null}
                  rules={{ required: true }}
                />
              </View>
              {errors.oldPassword && (
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
              {errors.WrongPassword && (
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    color: THEME.primary,
                    marginBottom: 20,
                  }}
                >
                  Wrong Password.
                </Text>
              )}

              {/* New password */}
              <Text style={{ ...TYPO.h5 }}> New Password </Text>
              <View
                style={[
                  styles.inputPasswordWrapper,
                  {
                    marginBottom:
                      errors.newPassword || errors.PasswordNotMatch ? 0 : 10,
                  },
                ]}
              >
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <ModalPasswordInput
                      props={{
                        onChange,
                        onBlur,
                        value,
                        onPressIn: () => {
                          setState({ ...state, hideNewPassword: false });
                        },
                        onPressOut: () => {
                          setState({ ...state, hideNewPassword: true });
                        },
                        onFocus: () => {
                          clearErrors("PasswordNotMatch");
                        },
                        hidePassword: state.hideNewPassword,
                      }}
                    />
                  )}
                  name="newPassword"
                  defaultValue={null}
                  rules={{ required: true }}
                />
              </View>
              {errors.newPassword && (
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

              {/* Confirm password */}
              <Text style={{ ...TYPO.h5 }}> Confirm New Password </Text>
              <View
                style={[
                  styles.inputPasswordWrapper,
                  {
                    marginBottom:
                      errors.confirmPassword || errors.PasswordNotMatch
                        ? 0
                        : 20,
                  },
                ]}
              >
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <ModalPasswordInput
                      props={{
                        onChange,
                        onBlur,
                        value,
                        onPressIn: () => {
                          setState({ ...state, hideConfirmPassword: false });
                        },
                        onPressOut: () => {
                          setState({ ...state, hideConfirmPassword: true });
                        },
                        onFocus: () => {
                          clearErrors("PasswordNotMatch");
                        },
                        hidePassword: state.hideConfirmPassword,
                      }}
                    />
                  )}
                  name="confirmPassword"
                  defaultValue={null}
                  rules={{ required: true }}
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
            </View>

            {/* options */}
            <ModalButtons
              onSave={handleSubmit(onSubmit)}
              onCancel={() => {
                setState({
                  ...state,
                  passwordModalVisible: false,
                });
              }}
            />
          </View>
        </Modal>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  updatingModalLoader: {
    height: 50,
    width: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  listBox: {
    flexDirection: "row",
    borderBottomColor: "#ddd",
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  modalChild: {
    padding: 16,
    backgroundColor: "#fff",
  },
  inputTextWrapper: {
    paddingTop: 8,
    paddingBottom: 0,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    borderStyle: "solid",
    flex: 1,
  },
  inputPasswordWrapper: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
});

export default AccountDetails;
