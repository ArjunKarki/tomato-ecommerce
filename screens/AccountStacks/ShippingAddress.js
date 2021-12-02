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
import { ModalShipping } from "../../components";
import {
  UpdateAccountDetails,
  UpdateShippingAddress,
} from "../../redux/actions/AccountDetailsAction";
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";

const { height, width } = CONFIG;

function ShippingAddress() {
  const dispatch = useDispatch();
  const { accountDetails } = useSelector((state) => state, shallowEqual);
  const { shipping } = accountDetails.data;
  const [state, setState] = useState({
    modalVisible: false,
    updating: false,
  });

  // console.log(accountDetails);

  const onSubmit = (data) => {
    setState({ modalVisible: false, updating: true });
    dispatch(
      UpdateShippingAddress({
        first_name: data.first_name.length ? data.first_name : "",
        last_name: data.last_name.length ? data.last_name : "",
        address_1: data.address_1.length ? data.address_1 : "",
        address_2: data.address_2.length ? data.address_2 : "",
        company: data.company.length ? data.company : "",
        city: data.city.length ? data.city : "",
        state: data.state.length ? data.state : "",
        country: data.country.length ? data.country : "",
        postcode: data.postcode.length ? data.postcode : "",
      })
    );
    dispatch(
      UpdateAccountDetails({
        ...accountDetails.data,
        meta_data: [
          ...accountDetails.data.meta_data,
          {
            key: "city_code",
            value: data.city_code,
          },
        ],
      })
    );
  };

  const onRemove = () => {
    setState({ ...state, updating: true });
    dispatch(
      UpdateShippingAddress({
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        company: "",
        city: "",
        state: "",
        country: "",
        postcode: "",
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
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "android" ? "transparent" : THEME.primary,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: THEME.background,
          }}
        >
          <ActivityIndicator color={THEME.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 8,
          paddingVertical: 16,
          backgroundColor: THEME.background,
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

        {shipping.address_1.length ? (
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
                  {shipping.first_name} {shipping.last_name}
                </Text>
                <Text
                  style={{
                    ...TYPO.h5,
                  }}
                >
                  {shipping.company.length ? `, ${shipping.company}` : ""}
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
                  {shipping.address_1}
                  {shipping.address_2.length
                    ? `, ${shipping.address_2}`
                    : ""}, {shipping.city}, {shipping.state}, {shipping.country}
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
                  Postcode/ZIP: {shipping.postcode}
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
        <ModalShipping
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

export default ShippingAddress;
