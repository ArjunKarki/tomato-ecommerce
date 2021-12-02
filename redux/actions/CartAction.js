import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOADING_CART,
  SET_CART_ERROR,
  GET_ALL_CART,
  CLEAR_CART,
  UPDATE_CART,
  ADD_PROMO_PRODUCT,
  REMOVE_PROMO_PRODUCT,
} from "../constants";
import { Cart } from "../../API";
import * as Random from "expo-random";
import { Alert } from "react-native";
import Axios from "axios";

export const AddToCard = (product_meta) => async (dispatch, getState) => {
  let cart_key;
  const { cart } = getState();
  const { product_id, quantity, type, variation } = product_meta;

  if (cart.cart_key) {
    cart_key = cart.cart_key;
  } else {
    cart_key = (await Random.getRandomBytesAsync(5)).join("-");
  }
  dispatch({ type: LOADING_CART });

  const cartData = {
    cart_key: `${cart_key}`,
    product_id: `${product_id}`,
    quantity,
    return_cart: true,
  };

  if (type === "variable") {
    cartData.variation = variation;
  }

  try {
    const { data } = await Axios.post(
      `https://tomato.com.mm/wp-json/cocart/v1/add-item?cart_key=${cart_key}`,
      cartData
    );

    dispatch({
      type: ADD_TO_CART,
      payload: { quantity: data.item_count, cart_key },
    });
  } catch (e) {
    dispatch({
      type: SET_CART_ERROR,
    });
    Alert.alert("Oops", "Your Cart Session Experied, Please Try Again");
    console.log(e);
  }
};

export const RemoveFromCard = (data) => (dispatch) => {
  return dispatch({
    type: REMOVE_FROM_CART,
    payload: data,
  });
};

export const UpdateCartItem = ({ product, type }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: LOADING_CART });
  const { cart } = getState();
  if (type === "ADD_ONE") {
    try {
      const { data } = await Cart.post(
        `/item?cart_item_key=${product.key}&quantity=${
          product.quantity + 1
        }&cart_key=${cart.cart_key}&return_cart=true`
      );
      dispatch({
        type: UPDATE_CART,
        payload: { quantity: data.item_count },
      });
    } catch (e) {
      dispatch({
        type: SET_CART_ERROR,
      });
      Alert.alert("Oops", "Your Cart Session Experied, Please Try Again");
      console.log(e);
    }
  } else if (type == "REMOVE_ONE" && product.quantity > 1) {
    try {
      const { data } = await Cart.post(
        `/item?cart_item_key=${product.key}&quantity=${
          product.quantity - 1
        }&cart_key=${cart.cart_key}&return_cart=true`
      );
      dispatch({
        type: UPDATE_CART,
        payload: { quantity: data.item_count },
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      const { data } = await Cart.delete(
        `/item?cart_item_key=${product.key}&cart_key=${cart.cart_key}&return_cart=true`
      );
      dispatch({
        type: UPDATE_CART,
        payload: {
          quantity: data.item_count,
          items: data.items.length > 0 ? cart.data : null,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  return;
};

export const getAllCart = () => async (dispatch, getState) => {
  const { cart } = getState();
  dispatch({ type: LOADING_CART });
  try {
    const { data } = await Cart.get("/get-cart", {
      params: {
        cart_key: cart.cart_key,
        thumb: true,
      },
    });
    dispatch({
      type: GET_ALL_CART,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: SET_CART_ERROR,
    });
    console.log(e);
  }
};

export const clearCart = () => async (dispatch, getState) => {
  const { cart } = getState();
  dispatch({ type: LOADING_CART });

  try {
    const { data } = await Cart.post("/clear", { cart_key: cart.cart_key });
    dispatch({
      type: CLEAR_CART,
    });
  } catch (e) {
    dispatch({
      type: SET_CART_ERROR,
    });
    console.log(e);
  }
};

export const removePromoProduct = (product) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_PROMO_PRODUCT,
    payload: product,
  });
};
