import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { CONFIG } from "../constants";
import ModalButtons from "./ModalButtons";
import { useForm, Controller } from "react-hook-form";
import { THEME, TYPO } from "../DynamicStyle/style";
import { useSelector, shallowEqual } from "react-redux";
import { Picker } from "native-base";
import { Woo } from "../API";
import Axios from "axios";

const { height, width } = CONFIG;
const cancelToken = Axios.CancelToken;
const source = cancelToken.source();

const ModalBilling = ({ props }) => {
  const { isVisible, closeModal, townShips, onSubmit } = props;
  const { control, handleSubmit, errors, setError, clearErrors } = useForm();
  const { accountDetails } = useSelector((state) => state, shallowEqual);

  const [state, setState] = useState({
    formState: [],
    selectedState: null,
    loadingState: false,
    formCity: [],
    selectedCity: null,
    loadingCity: false,
  });

  const fetchFormState = async () => {
    setState({
      ...state,
      loadingState: true,
    });
    await Woo.get("/shipping-zones", {
      cancelToken: source.token,
    })
      .then(({ data }) => {
        setState({
          ...state,
          formState: data,
          loadingState: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formStateOnChange = async (value, onChange) => {
    let tmp = state.formState.filter((tmpstate) => tmpstate.id === value)[0];
    onChange(tmp.name);
    setState({
      ...state,
      selectedState: value,
      loadingCity: true,
    });

    await Woo.get(`/shipping-zones/${value}/locations`, {
      cancelToken: source.token,
    })
      .then(({ data }) => {
        setState((previousState) => ({
          ...state,
          selectedState:
            previousState.selectedState === null
              ? value
              : previousState.selectedState,
          formCity: data,
          loadingCity: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formCityOnChange = (value, onChange) => {
    onChange(value);
    setState({
      ...state,
      selectedCity: value,
    });
  };

  useEffect(() => {
    fetchFormState();

    return () => {
      source.cancel("Request Canceled!");
    };
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      deviceHeight={height}
      deviceWidth={width}
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
      onBackdropPress={closeModal}
    >
      <View style={[styles.modalChild]}>
        <View style={{ height: "80%" }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 5 }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* firstname & lastname */}
            <View style={{ flexDirection: "row" }}>
              {/* firstname */}
              <View style={{ marginBottom: 16, flex: 1, marginRight: 20 }}>
                <Text style={{ ...TYPO.h5 }}>First name</Text>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <View style={[styles.textInputWrapper]}>
                      <TextInput
                        placeholder="First Name"
                        onChangeText={(text) => onChange(text)}
                        onBlur={onBlur}
                        value={value}
                      />
                    </View>
                  )}
                  name="first_name"
                  rules={{ required: true }}
                  defaultValue={null}
                />
                {errors.first_name && (
                  <Text style={[styles.errorText]}>
                    This field is required.
                  </Text>
                )}
              </View>

              {/* lastname */}
              <View style={{ marginBottom: 16, flex: 1 }}>
                <Text style={{ ...TYPO.h5 }}>Last name</Text>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <View style={[styles.textInputWrapper]}>
                      <TextInput
                        placeholder="Last Name"
                        onChangeText={(text) => onChange(text)}
                        onBlur={onBlur}
                        value={value}
                      />
                    </View>
                  )}
                  name="last_name"
                  rules={{ required: true }}
                  defaultValue={null}
                />
                {errors.last_name && (
                  <Text style={[styles.errorText]}>
                    This field is required.
                  </Text>
                )}
              </View>
            </View>

            {/* company */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ ...TYPO.h5 }}>Company name (optional)</Text>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <View style={[styles.textInputWrapper]}>
                    <TextInput
                      placeholder="Company name (optional)"
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      value={value}
                    />
                  </View>
                )}
                name="company"
                defaultValue=""
              />
            </View>

            {/* address_1 */}
            <View>
              <Text style={{ ...TYPO.h5 }}>Street Address</Text>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <View style={[styles.textInputWrapper]}>
                    <TextInput
                      placeholder="House number and street name"
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      value={value}
                    />
                  </View>
                )}
                name="address_1"
                rules={{ required: true }}
                defaultValue={null}
              />
              {errors.address_1 && (
                <Text style={[styles.errorText]}>This field is required.</Text>
              )}
            </View>

            {/* address_2 */}
            <View style={{ marginBottom: 16 }}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <View style={[styles.textInputWrapper]}>
                    <TextInput
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      value={value}
                    />
                  </View>
                )}
                name="address_2"
                defaultValue=""
              />
            </View>

            {/* city and state */}
            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              {/* state */}
              <View style={{ flex: 1, marginRight: 20 }}>
                <Text style={{ ...TYPO.h5 }}>State</Text>
                <Controller
                  control={control}
                  render={({ onChange }) =>
                    state.loadingState ? (
                      <View style={[styles.textInputWrapper]}>
                        <Text style={{ fontFamily: "Roboto-Regular" }}>
                          Loading...
                        </Text>
                      </View>
                    ) : (
                      <View style={[styles.pickerWrapper]}>
                        <Picker
                          note
                          selectedValue={state.selectedState}
                          textStyle={{ color: "#333" }}
                          onValueChange={(value) =>
                            formStateOnChange(value, onChange)
                          }
                        >
                          <Picker.Item label="Select State" value={null} />
                          {state.formState.map((item, index) => (
                            <Picker.Item
                              label={item.name}
                              value={item.id}
                              key={item.id}
                            />
                          ))}
                        </Picker>
                      </View>
                    )
                  }
                  name="state"
                  rules={{ required: true }}
                  defaultValue={null}
                />
                {errors.state && (
                  <Text style={[styles.errorText]}>
                    This field is required.
                  </Text>
                )}
              </View>

              {/* city */}
              <View style={{ flex: 1 }}>
                <Text style={{ ...TYPO.h5 }}>City</Text>
                <Controller
                  control={control}
                  render={({ onChange }) =>
                    state.loadingCity ? (
                      <View style={[styles.textInputWrapper]}>
                        <Text
                          style={{
                            fontFamily: "Roboto-Regular",
                            color: "#ddd",
                          }}
                        >
                          Loading...
                        </Text>
                      </View>
                    ) : (
                      <View style={[styles.pickerWrapper]}>
                        <Picker
                          note
                          selectedValue={state.selectedCity}
                          onValueChange={(value) =>
                            formCityOnChange(value, onChange)
                          }
                        >
                          <Picker.Item
                            label={
                              state.selectedState
                                ? "Select Region"
                                : "Please Select State First"
                            }
                            value={null}
                          />
                          {state.formCity.map((item, index) => (
                            <Picker.Item
                              label={item.name}
                              value={item.name}
                              key={item.code}
                            />
                          ))}
                        </Picker>
                      </View>
                    )
                  }
                  name="city"
                  rules={{ required: true }}
                  defaultValue={null}
                />
                {errors.city && (
                  <Text style={[styles.errorText]}>
                    This field is required.
                  </Text>
                )}
              </View>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              {/* postcode */}
              <View style={{ flex: 1, marginRight: 20 }}>
                <Text style={{ ...TYPO.h5 }}>Postcode/ZIP</Text>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <View style={[styles.textInputWrapper]}>
                      <TextInput
                        placeholder="Postcode/ZIP"
                        onChangeText={(text) => onChange(text)}
                        onBlur={onBlur}
                        value={value}
                      />
                    </View>
                  )}
                  name="postcode"
                  rules={{ required: true }}
                  defaultValue={null}
                />
                {errors.postcode && (
                  <Text style={[styles.errorText]}>
                    This field is required.
                  </Text>
                )}
              </View>

              {/* country */}
              <View style={{ flex: 1 }}>
                <Text style={{ ...TYPO.h5 }}>Country</Text>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <View style={[styles.textInputWrapper]}>
                      <TextInput
                        editable={false}
                        placeholder="country"
                        onChangeText={(text) => onChange(text)}
                        onBlur={onBlur}
                        value="Myanmar"
                      />
                    </View>
                  )}
                  name="country"
                  rules={{ required: true }}
                  defaultValue="Myanmar"
                />
                {errors.country && (
                  <Text style={[styles.errorText]}>
                    This field is required.
                  </Text>
                )}
              </View>
            </View>

            {/* phone */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ ...TYPO.h5 }}>Phone</Text>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <View style={[styles.textInputWrapper]}>
                    <TextInput
                      keyboardType="number-pad"
                      placeholder="Phone"
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      value={value}
                    />
                  </View>
                )}
                name="phone"
                rules={{ required: true }}
                defaultValue={
                  accountDetails.data.billing.phone.length
                    ? accountDetails.data.billing.phone
                    : null
                }
              />
              {errors.phone && (
                <Text style={[styles.errorText]}>This field is required.</Text>
              )}
            </View>

            {/* email */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ ...TYPO.h5 }}>Email (optional)</Text>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <View style={[styles.textInputWrapper]}>
                    <TextInput
                      placeholder={accountDetails.data.email}
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      value={value}
                    />
                  </View>
                )}
                name="email"
                defaultValue={accountDetails.data.email}
              />
            </View>
          </ScrollView>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <ModalButtons onCancel={closeModal} onSave={handleSubmit(onSubmit)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalChild: {
    padding: 16,
    backgroundColor: "#fff",
    height: "75%",
  },
  textInputWrapper: {
    marginTop: 5,
    paddingBottom: 8,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  errorText: {
    fontFamily: "Roboto-Regular",
    color: THEME.primary,
    marginBottom: 20,
  },
  pickerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderStyle: "solid",
  },
});

export default ModalBilling;
