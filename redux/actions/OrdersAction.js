import {
  ORDERS_FETCH_BEGIN,
  ORDERS_FETCH_SUCCESS,
  CLEAR_ORDERS,
} from "../constants";
import { Woo } from "../../API";

export const FetchOrders = (customer) => async (dispatch) => {
  dispatch({ type: ORDERS_FETCH_BEGIN });

  try {
    await Woo.get(`/customer/order/${customer}`).then(({ data }) => {
      dispatch({ type: ORDERS_FETCH_SUCCESS, payload: data });
    });
  } catch (err) {
    console.log("Error in fetching orders => ", err);
  }
};

export const ClearOrders = () => ({ type: CLEAR_ORDERS });
