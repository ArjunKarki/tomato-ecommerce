import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { CONFIG, hp } from "../../constants";
import { THEME, TYPO } from "../../DynamicStyle/style";
import {
  Container,
  ShippingForm,
  ShippingCard,
  BillingCard,
  BillingForm,
} from "../../components";
import { useForm, Controller } from "react-hook-form";
import {
  UpdateShippingAddress,
  UpdateBillingAddress,
} from "../../redux/actions/AccountDetailsAction";
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";
import { Cart } from "../../API";
import { getAllCart } from "../../redux/actions/CartAction";

const { height, width } = CONFIG;

export default function AddressConfirmation({ navigation }) {
  const dispatch = useDispatch();
  const { accountDetails, cart } = useSelector((state) => state, shallowEqual);
  const { control, handleSubmit, errors, clearErrors, setError } = useForm();
  const [state, setState] = useState({
    useShippingDefault: false,
    calculatedShipping: false,
    useBillingDefault:
      accountDetails.data.shipping &&
      accountDetails.data.billing.address_1.length
        ? true
        : false,
    addressLoaded: false,
    loading: false,
    submitted: false,
  });

  const checkShipping = async () => {
    if (
      accountDetails.data.shipping &&
      accountDetails.data.shipping.address_1.length
    ) {
      let selectedCity = accountDetails.data.meta_data.find(
        (tmp) => tmp.key == "city_code"
      );
      if (selectedCity === undefined) {
        Alert.alert(
          "Unable to detect Shipping Address!",
          "Please refill your Shipping Address."
        );
        setState((preState) => ({
          ...preState,
          useShippingDefault: false,
        }));
      } else {
        setState({
          ...state,
          useShippingDefault: !state.useShippingDefault,
        });
        await Cart.post("calculate/shipping", {
          cart_key: cart.cart_key,
          country: "MM",
          state: selectedCity.value,
          return_methods: true,
        });
        await Cart.post("calculate", {
          cart_key: cart.cart_key,
        });
        dispatch(getAllCart());

        setState((preState) => ({
          ...preState,
          calculatedShipping: true,
        }));
      }
    } else {
      Alert.alert(
        "Found no address!",
        "There is no address. Please add a new address."
      );
    }
  };

  const onSubmit = (data) => {
    if (!state.useShippingDefault || !state.useBillingDefault) {
      setState({ ...state, loading: true, submitted: true });
      if (!state.useShippingDefault) {
        let shippingObj = {
          first_name: data.shipping_firstName,
          last_name: data.shipping_lastName,
          address_1: data.shipping_address_1,
          address_2: data.shipping_address_2,
          company: data.shipping_companyName,
          city: data.shipping_city,
          postcode: data.shipping_postcode,
          state: data.shipping_state,
          country: data.shipping_country,
        };
        dispatch(UpdateShippingAddress(shippingObj));
      }

      if (!state.useBillingDefault) {
        let billingObj = {
          first_name: data.billing_firstName,
          last_name: data.billing_lastName,
          address_1: data.billing_address_1,
          address_2: data.billing_address_2,
          company: data.billing_companyName,
          city: data.billing_city,
          postcode: data.billing_postcode,
          state: data.billing_state,
          country: data.billing_country,
          email: data.billing_email,
          phone: data.billing_phone.match(/\+?\d{1,}/).join(),
        };
        dispatch(UpdateBillingAddress(billingObj));
      }
    } else {
      navigation.navigate("PaymentOptions");
    }
  };

  useEffect(() => {
    if (accountDetails.data.id) {
      if (
        accountDetails.data.billing.address_1.length &&
        accountDetails.data.shipping.address_1.length
      ) {
        setState({
          ...state,
          useShippingDefault: true,
          useBillingDefault: accountDetails.data.billing.address_1.length
            ? true
            : false,
          addressLoaded: true,
          loading: false,
        });
        checkShipping();
      } else {
        setState({
          ...state,
          useShippingDefault: accountDetails.data.shipping.address_1.length
            ? true
            : false,
          useBillingDefault: accountDetails.data.billing.address_1.length
            ? true
            : false,
          addressLoaded: false,
        });
      }
    } else {
      navigation.navigate("CartScreen");
    }
  }, [accountDetails.data]);

  useEffect(() => {
    if (!accountDetails.loading && state.addressLoaded && state.submitted) {
      setState((perviousState) => ({
        ...perviousState,
        submitted: false,
      }));
      navigation.navigate("PaymentOptions");
    }
  }, [accountDetails.loading, state]);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <Container style={{ backgroundColor: THEME.background }}>
        {/* updating modal */}
        {/* <Modal
          isVisible={state.loading}
          style={{
            alignItems: "center",
          }}
        >
          <View style={[styles.updatingModalLoader]}>
            <ActivityIndicator color={THEME.primary} />
          </View>
        </Modal> */}

        {/* Shipping */}
        <Text style={[styles.title]}>Shipping Address</Text>
        <View style={[styles.switchWrapper]}>
          <Switch
            trackColor="#ddd"
            thumbColor={state.useShippingDefault ? THEME.primary : "#eee"}
            value={state.useShippingDefault}
            onValueChange={checkShipping}
          />

          <Text style={[styles.switchText]}>Use saved shipping address</Text>
        </View>

        {state.useShippingDefault && accountDetails.data.shipping ? (
          state.calculatedShipping ? (
            <ShippingCard accountDetails={accountDetails} />
          ) : (
            <View
              style={{
                padding: 10,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color={THEME.primary} />
            </View>
          )
        ) : (
          <></>
        )}

        {!state.useShippingDefault || !accountDetails.data.shipping ? (
          <ShippingForm
            props={{
              Controller,
              control,
              errors,
              setError,
              clearErrors,
            }}
          />
        ) : (
          <></>
        )}

        {/* Billing */}
        <Text style={[styles.title]}>Billing Address</Text>
        <View style={[styles.switchWrapper]}>
          <Switch
            trackColor="#ddd"
            thumbColor={state.useBillingDefault ? THEME.primary : "#eee"}
            value={state.useBillingDefault}
            onValueChange={() => {
              if (
                accountDetails.data.billing &&
                accountDetails.data.billing.address_1.length
              ) {
                setState({
                  ...state,
                  useBillingDefault: !state.useBillingDefault,
                });
              } else {
                Alert.alert(
                  "Found no address!",
                  "There is no address. Please add a new address."
                );
              }
            }}
          />

          <Text style={[styles.switchText]}>Use saved billing address</Text>
        </View>

        {state.useBillingDefault && accountDetails.data.billing ? (
          <BillingCard accountDetails={accountDetails} />
        ) : (
          <></>
        )}

        {!state.useBillingDefault || !accountDetails.data.billing ? (
          <BillingForm
            props={{
              Controller,
              control,
              errors,
              setError,
              clearErrors,
              accountDetails,
            }}
          />
        ) : (
          <></>
        )}

        {/* Next step button */}
        <View
          style={{
            paddingHorizontal: 8,
          }}
        >
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <View
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                backgroundColor: THEME.primary,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ ...TYPO.h3, color: "#fff" }}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    ...TYPO.h1,
    paddingHorizontal: 8,
    marginVertical: 16,
    color: THEME.primary,
  },
  switchWrapper: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    flex: 1,
    fontFamily: "Roboto-Medium",
    marginLeft: 10,
  },
  inputWrapper: {
    marginVertical: 10,
    paddingVertical: 5,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  input: {
    fontFamily: "Roboto-Regular",
  },
  updatingModalLoader: {
    height: 50,
    width: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
