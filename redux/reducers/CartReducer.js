import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_ERROR,
  LOADING_CART,
  GET_ALL_CART,
  CLEAR_CART,
  UPDATE_CART,
  ADD_PROMO_PRODUCT,
  REMOVE_PROMO_PRODUCT,
} from "../constants";

const initialState = {
  data: null,
  loading: false,
  error: false,
  quantity: 0,
  cart_key: null,
  twelvePromoProducts: [],
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CART:
      return Object.assign({}, state, { loading: true, error: false });

    case ADD_TO_CART:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        quantity: action.payload.quantity,
        cart_key: action.payload.cart_key,
      });

    case REMOVE_FROM_CART:
      return Object.assign({}, state, {
        loading: false,
        error: false,
      });

    case GET_ALL_CART:
      return Object.assign({}, state, {
        data: action.payload,
        loading: false,
        error: false,
      });
    case UPDATE_CART:
      return Object.assign({}, state, {
        data: action.payload.items,
        quantity: action.payload.quantity,
        loading: false,
        error: false,
      });
    case SET_CART_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        data: null,
        quantity: 0,
        cart_key: null,
      });
    case CLEAR_CART:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        data: null,
        quantity: 0,
        cart_key: null,
      });

    case ADD_PROMO_PRODUCT:
      return {
        ...state,
        twelvePromoProducts: [...state.twelvePromoProducts, action.payload],
      };
    case REMOVE_PROMO_PRODUCT:
      return {
        ...state,
        twelvePromoProducts: state.twelvePromoProducts.filter((_product) => {
          return _product.id != action.payload.product_id;
        }),
      };
    default:
      return state;
  }
};
