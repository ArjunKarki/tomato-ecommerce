import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { CONFIG, hp } from "../../constants";
import { THEME, TYPO } from "../../DynamicStyle/style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { ModalBilling } from "../../components";
import Modal from "react-native-modal";
import { UpdateBillingAddress } from "../../redux/actions/AccountDetailsAction";
import { useFocusEffect } from "@react-navigation/native";

const { height, width } = CONFIG;

function BillingAddress() {
  const dispatch = useDispatch();
  const { accountDetails } = useSelector((state) => state, shallowEqual);
  const { billing } = accountDetails.data;
  const [state, setState] = useState({
    modalVisible: false,
    updating: false,
  });

  const onSubmit = (data) => {
    setState({ modalVisible: false, updating: true });
    dispatch(
      UpdateBillingAddress({
        ...data,
        phone: data.phone.match(/\+?\d{1,}/).join(),
      })
    );
  };

  const onRemove = () => {
    setState({ ...state, updating: true });
    dispatch(
      UpdateBillingAddress({
        first_name: "",
        last_name: "",
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        postcode: "",
        country: "",
        state: "",
        email: accountDetails.data.email,
        phone: "",
      })
    );
  };

  useEffect(() => {
    if (!accountDetails.loading) {
      setState({ ...state, updating: false });
    }
  }, [accountDetails.loading]);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  if (accountDetails.loading && !state.updating) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Platform.OS === "android" ? "transparent" : THEME.primary }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: THEME.background
          }}
        >
          <ActivityIndicator color={THEME.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingVertical: 16,
          backgroundColor: THEME.background
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

        {billing.address_1.length ? (
          // address card
          <View style={[styles.addressCard]}>
            <TouchableOpacity onPress={onRemove} style={[styles.removeButton]}>
              <AntDesign name="close" color="#fff" size={18} />
            </TouchableOpacity>

            <View
              style={{
                marginRight: 10,
                marginTop: 4,
              }}
            >
              <FontAwesome5
                name="location-arrow"
                size={15}
                color={THEME.primary}
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 55,
                }}
              >
                <Text
                  style={{
                    ...TYPO.h3,
                  }}
                >
                  {billing.first_name} {billing.last_name}
                </Text>
                <Text
                  style={{
                    ...TYPO.h5,
                  }}
                >
                  , {billing.phone}
                </Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={{ ...TYPO.h5 }}>
                  {billing.company.length ? `${billing.company}, ` : ""}
                  {billing.email}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  {billing.address_1}
                  {billing.address_2.length
                    ? `, ${billing.address_2}`
                    : ""}, {billing.city}, {billing.state}, {billing.country}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  Postcode/ZIP: {billing.postcode}
                </Text>
              </View>

              <View style={[styles.editButtonWrapper]}>
                <TouchableOpacity
                  onPress={() => {
                    setState({ ...state, modalVisible: true });
                  }}
                >
                  <Text style={[styles.editButton]}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          // no address and add address
          <View>
            <View style={[styles.infoWrapper]}>
              <Text style={{ ...TYPO.h3 }}>There is no address yet.</Text>
            </View>
            <View style={{ marginTop: 20, alignItems: "flex-start" }}>
              <TouchableOpacity
                onPress={() => {
                  setState({ ...state, modalVisible: true });
                }}
              >
                <View style={[styles.info]}>
                  <Text style={{ ...TYPO.h5, color: "#fff" }}>
                    Add new address
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* shipping modal */}
        <ModalBilling
          props={{
            isVisible: state.modalVisible,
            closeModal: () => {
              setState({ ...state, modalVisible: false });
            },
            onSubmit,
            onRemove,
          }}
        />
      </View>
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
  addressCard: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    position: "relative",
    width: width - 16,
  },
  removeButton: {
    height: 40,
    width: 40,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: THEME.primary,
    position: "absolute",
    right: 8,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  infoWrapper: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: THEME.primary,
    borderRadius: 8,
  },
  editButtonWrapper: {
    marginTop: 10,
    alignItems: "flex-start",
  },
  editButton: {
    fontFamily: "Roboto-Regular",
    color: "#336EF5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
});

export default BillingAddress;
