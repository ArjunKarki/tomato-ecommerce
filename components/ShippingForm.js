import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { THEME, TYPO } from "../DynamicStyle/style";
import { Picker } from "native-base";
import { Cart, Woo } from "../API";
import Axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllCart } from "../redux/actions/CartAction";
import { UpdateAccountDetails } from "../redux/actions/AccountDetailsAction";

const ShippingForm = ({ props }) => {
  const { control, errors, setError, clearErrors } = props;
  const CancelToken = Axios.CancelToken;
  const source = CancelToken.source();
  const { cart, accountDetails } = useSelector(state => state, shallowEqual);
  const dispatch = useDispatch();

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
    }).then(({ data }) => {
      setState({
        ...state,
        formState: data,
        loadingState: false,
      });
    }).catch(err => {
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
    });;
  };

  const formCityOnChange = async (value, onChange) => {
    const selectedCity = state.formCity.find((tmp) => tmp.name == value);
    onChange(value);
    setState({
      ...state,
      selectedCity: value,
    });
    await Cart.post("calculate/shipping", {
      cart_key: cart.cart_key,
      country: "MM",
      state: selectedCity.code,
      return_methods: true,
    });
    await Cart.post("calculate", {
      cart_key: cart.cart_key,
    });
    dispatch(getAllCart());
    dispatch(UpdateAccountDetails({
      ...accountDetails.data,
      meta_data: [
        ...accountDetails.data.meta_data,
        {
          key: "city_code",
          value: selectedCity.code,
        }
      ]
    }))
  };

  useEffect(() => {
    fetchFormState();

    return () => {
      source.cancel("Request Cancelled!");
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
        New shipping address
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
              name="shipping_firstName"
              rules={{ required: true }}
            />
            {errors.shipping_firstName && (
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
              name="shipping_lastName"
              rules={{ required: true }}
            />
            {errors.shipping_lastName && (
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
          name="shipping_companyName"
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
            name="shipping_address_1"
            rules={{ required: true }}
            defaultValue={null}
          />
          {errors.shipping_address_1 && (
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
            name="shipping_address_2"
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
              name="shipping_state"
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
              name="shipping_city"
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
              name="shipping_postcode"
              rules={{ required: true }}
              defaultValue={null}
            />
            {errors.shipping_postcode && (
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
              name="shipping_country"
              rules={{ required: true }}
              defaultValue="Myanmar"
            />
            {errors.shipping_country && (
              <Text style={[styles.errorText]}>This field is required.</Text>
            )}
          </View>
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

export default ShippingForm;
