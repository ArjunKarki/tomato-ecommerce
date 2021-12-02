import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { THEME, TYPO } from "../DynamicStyle/style";
import { Picker } from "native-base";
import { Woo } from "../API";
import Axios from "axios";

const BillingForm = ({ props }) => {
  const { control, errors, setError, clearErrors, accountDetails } = props;
  const CancelToken = Axios.CancelToken;
  const source = CancelToken.source();

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
    await Woo.get("/shipping-zones").then(({ data }) => {
      setState({
        ...state,
        formState: data,
        loadingState: false,
      });
    }).catch(err => {
      console.log(err);
    });;
  };

  const formStateOnChange = async (value, onChange) => {
    let tmp = state.formState.filter((tmpstate) => tmpstate.id === value)[0];
    onChange(tmp.name);
    setState({
      ...state,
      selectedState: value,
      loadingCity: true,
    });

    await Woo.get(`/shipping-zones/${value}/locations`).then(({ data }) => {
      setState((previousState) => ({
        ...state,
        selectedState:
          previousState.selectedState === null
            ? value
            : previousState.selectedState,
        formCity: data,
        loadingCity: false,
      }));
    }).catch(err => {
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
    }
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 8,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          ...TYPO.h1,
          color: THEME.primary,
        }}
      >
        New billing address
      </Text>

      <View
        style={{
          marginVertical: 10,
          padding: 8,
          backgroundColor: "#fff",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, marginRight: 20 }}>
            {/* First Name */}
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <View style={[styles.inputWrapper]}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        ...TYPO.h5,
                      }}
                    >
                      First Name
                    </Text>
                    <Text style={{ color: THEME.primary }}> *</Text>
                  </View>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="First name"
                    style={[styles.input]}
                  />
                </View>
              )}
              name="billing_firstName"
              rules={{ required: true }}
            />
            {errors.billing_firstName && (
              <Text style={[styles.errorText]}>This is required.</Text>
            )}
          </View>

          <View style={{ flex: 1 }}>
            {/* Last Name */}
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <View style={[styles.inputWrapper]}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        ...TYPO.h5,
                      }}
                    >
                      Last Name
                    </Text>
                    <Text style={{ color: THEME.primary }}> *</Text>
                  </View>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="Last name"
                    style={[styles.input]}
                  />
                </View>
              )}
              name="billing_lastName"
              rules={{ required: true }}
            />
            {errors.billing_lastName && (
              <Text style={[styles.errorText]}>This is required.</Text>
            )}
          </View>
        </View>

        {/* Company Name */}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <View style={[styles.inputWrapper]}>
              <View>
                <Text
                  style={{
                    ...TYPO.h5,
                  }}
                >
                  Company Name (optional)
                </Text>
              </View>
              <TextInput
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
                placeholder="Company Name"
                style={[styles.input]}
              />
            </View>
          )}
          name="billing_companyName"
          rules={{ required: false }}
        />

        {/* address_1 */}
        <View>
          <Text style={{ ...TYPO.h5 }}>Street Address</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <View style={[styles.inputWrapper]}>
                <TextInput
                  placeholder="House number and street name"
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
            )}
            name="billing_address_1"
            rules={{ required: true }}
            defaultValue={null}
          />
          {errors.billing_address_1 && (
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                color: THEME.primary,
              }}
            >
              This field is required.
            </Text>
          )}
        </View>

        {/* address_2 */}
        <View>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <View style={[styles.inputWrapper]}>
                <TextInput
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
            )}
            name="billing_address_2"
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
                  <View style={[styles.inputWrapper]}>
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
              name="billing_state"
              rules={{ required: true }}
              defaultValue={null}
            />
            {errors.state && (
              <Text style={[styles.errorText]}>This field is required.</Text>
            )}
          </View>

          {/* city */}
          <View style={{ flex: 1 }}>
            <Text style={{ ...TYPO.h5 }}>City</Text>
            <Controller
              control={control}
              render={({ onChange }) =>
                state.loadingCity ? (
                  <View style={[styles.inputWrapper]}>
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
              name="billing_city"
              rules={{ required: true }}
              defaultValue={null}
            />
            {errors.city && (
              <Text style={[styles.errorText]}>This field is required.</Text>
            )}
          </View>
        </View>

        {/* postcode and country */}
        <View style={{ flexDirection: "row" }}>
          {/* postcode */}
          <View style={{ flex: 1, marginRight: 20 }}>
            <Text style={{ ...TYPO.h5 }}>Postcode/ZIP</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <View style={[styles.inputWrapper]}>
                  <TextInput
                    placeholder="Postcode/ZIP"
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
              name="billing_postcode"
              rules={{ required: true }}
              defaultValue={null}
            />
            {errors.billing_postcode && (
              <Text style={[styles.errorText]}>This field is required.</Text>
            )}
          </View>

          {/* country */}
          <View style={{ flex: 1 }}>
            <Text style={{ ...TYPO.h5 }}>Country</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <View style={[styles.inputWrapper]}>
                  <TextInput
                    editable={false}
                    placeholder="country"
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    value={value}
                  />
                </View>
              )}
              name="billing_country"
              rules={{ required: true }}
              defaultValue="Myanmar"
            />
            {errors.billing_country && (
              <Text style={[styles.errorText]}>This field is required.</Text>
            )}
          </View>
        </View>

        {/* phone */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ ...TYPO.h5 }}>Phone</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <View style={[styles.inputWrapper]}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Phone"
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
            )}
            name="billing_phone"
            rules={{ required: true }}
            defaultValue={accountDetails.data.billing && accountDetails.data.billing.phone.length ? accountDetails.data.billing.phone : null}
          />
          {errors.billing_phone && (
            <Text style={[styles.errorText]}>This field is required.</Text>
          )}
        </View>

        {/* email */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ ...TYPO.h5 }}>Email (optional)</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <View style={[styles.inputWrapper]}>
                <TextInput
                  placeholder={accountDetails.data.email}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
            )}
            name="billing_email"
            defaultValue={accountDetails.data.email}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  input: {
    fontFamily: "Roboto-Regular",
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

export default BillingForm;
