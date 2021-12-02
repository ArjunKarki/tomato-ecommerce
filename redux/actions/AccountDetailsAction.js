import {
  FETCH_ACCOUNT_DETAILS_BEGIN,
  FETCH_ACCOUNT_DETAILS_SUCCESS,
  UPDATE_ACCOUNT_DETAIL_BEGIN,
  CHANGE_PASSWORD_BEGIN,
  CHANGE_PASSWORD_SUCCESS,
  SET_ACCOUNT_DETAILS,
  UPDATE_SHIPPING_ADDRESS_BEGIN,
  UPDATE_BILLING_ADDRESS_BEGIN,
  UPDATE_TOMATO_COINS,
  UPDATE_TOMATO_POINTS,
  UPDATE_COUPONS,
} from "../constants";
import { Woo } from "../../API";
import { AsyncStorage } from "react-native";

export const SetAccountDetails = (payload) => ({
  type: SET_ACCOUNT_DETAILS,
  payload,
});

const FetchAccountDetailsBegin = () => ({
  type: FETCH_ACCOUNT_DETAILS_BEGIN,
});

const FetchAccountDetailsSuccess = (payload) => ({
  type: FETCH_ACCOUNT_DETAILS_SUCCESS,
  payload,
});

export const FetchAccountDetails = () => (dispatch, getState) => {
  dispatch(FetchAccountDetailsBegin());
  const { accountDetails } = getState();
  try {
    Woo.get(`/user/${accountDetails.data.id}`).then(({ data }) => {
      dispatch(FetchAccountDetailsSuccess(data));
    });
  } catch (error) {
    console.log("Error in fetching Account detail => ", error);
  }
};

const UpdateAccountDetailsBegin = () => ({
  type: UPDATE_ACCOUNT_DETAIL_BEGIN,
});

export const UpdateAccountDetails = (payload) => async (dispatch, getState) => {
  dispatch(UpdateAccountDetailsBegin);
  const { accountDetails } = getState();
  try {
    const { data } = await Woo.put(`user/${accountDetails.data.id}`, payload);
    console.log(data);
    if (data.status == "OK") {
      dispatch(FetchAccountDetails());
    } else {
      dispatch(FetchAccountDetails());
      console.log("Something went wrong in updating account detail!");
    }
  } catch (err) {
    console.log("Error in updating account detail => ", err);
  }
};

export const AddCoupon = (payload) => async (dispatch, getState) => {
  dispatch(UpdateAccountDetailsBegin);
  const { accountDetails } = getState();

  if (accountDetails.data.meta_data) {
    const metaCoupons = accountDetails.data.meta_data?.filter(
      (_tmp) => _tmp.key == "coupons"
    );
    let coupons = [];

    if (metaCoupons.length) {
      coupons = metaCoupons[0].value;
    }
    const existCoupon = coupons.find((c) => c.id === payload.id);

    if (typeof existCoupon != "object") {
      try {
        const { data } = await Woo.put(`user/${accountDetails.data.id}`, {
          ...accountDetails.data,
          meta_data: [
            ...accountDetails.data.meta_data,
            {
              key: "coupons",
              value: [...coupons, payload],
            },
          ],
        });

        if (data.status === "OK") {
          dispatch(FetchAccountDetails());
        } else {
          console.log("Something went wrong in updating coupons!");
        }
      } catch (err) {
        console.log("Error in updating coupons => ", err);
      }
    }
  } else {
    try {
      const { data } = await Woo.put(`user/${accountDetails.data.id}`, {
        ...accountDetails.data,
        meta_data: [
          ...accountDetails.data.meta_data,
          {
            key: "coupons",
            value: [payload],
          },
        ],
      });

      if (data.status === "OK") {
        dispatch(FetchAccountDetails());
      } else {
        console.log("Something went wrong in updating coupons!");
      }
    } catch (err) {
      console.log("Error in updating coupons => ", err);
    }
  }
};

export const RemoveCouponReducer = (payload) => async (dispatch, getState) => {
  dispatch(UpdateAccountDetailsBegin);
  const { accountDetails } = getState();
  const metaCoupons = accountDetails.data.meta_data.filter(
    (_tmp) => _tmp.key == "coupons"
  );

  let coupons = [];
  if (metaCoupons.length) {
    coupons = metaCoupons[0].value.filter((_tmp) => _tmp.id != payload.id);
  }
  try {
    const { data } = await Woo.put(`user/${accountDetails.data.id}`, {
      ...accountDetails.data,
      meta_data: [
        ...accountDetails.data.meta_data,
        {
          key: "coupons",
          value: [...coupons],
        },
      ],
    });

    if (data.status === "OK") {
      dispatch(FetchAccountDetails());
    } else {
      console.log("Something went wrong in updating coupons!");
    }
  } catch (err) {
    console.log("Error in updating coupons => ", err);
  }

  dispatch(
    FetchAccountDetailsSuccess({
      ...accountDetails.data,
      meta_data: [
        ...accountDetails.data.meta_data,
        {
          key: "coupons",
          value: [...coupons],
        },
      ],
    })
  );
};

const UpdateShippingAddressBegin = () => ({
  type: UPDATE_SHIPPING_ADDRESS_BEGIN,
});

export const UpdateShippingAddress = (payload) => (dispatch, getState) => {
  dispatch(UpdateShippingAddressBegin());
  const { accountDetails } = getState();
  try {
    Woo.put(`user/${accountDetails.data.id}/shipping`, payload).then(
      ({ data }) => {
        if (data.status === "OK") {
          dispatch(FetchAccountDetails());
        } else {
          console.log("Something went wrong in updating shipping address!");
        }
      }
    );
  } catch (err) {
    console.log("Error in updating shipping address => ", err);
  }
};

const UpdateBillingAddressBegin = () => ({
  type: UPDATE_BILLING_ADDRESS_BEGIN,
});

export const UpdateBillingAddress = (payload) => (dispatch, getState) => {
  dispatch(UpdateBillingAddressBegin());
  const { accountDetails } = getState();
  try {
    Woo.put(`user/${accountDetails.data.id}/billing`, payload).then(
      ({ data }) => {
        if (data.status === "OK") {
          dispatch(FetchAccountDetails());
        } else {
          console.log("Something went wrong in updating billing address!");
        }
      }
    );
  } catch (err) {
    console.log("Error in updating billing address => ", err);
  }
};

export const UpdateTomatoCoins = (payload) => ({
  type: UPDATE_TOMATO_COINS,
  payload,
});

export const UpdateTomatoPoints = (payload) => ({
  type: UPDATE_TOMATO_POINTS,
  payload,
});
