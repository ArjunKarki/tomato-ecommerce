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
} from "../constants";

const initialState = {
  data: {
    id: null,
  },
  loading: false,
};

export const AccountDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_DETAILS:
    
      return {
        ...state,
        data: action.payload,
      };

    case FETCH_ACCOUNT_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ACCOUNT_DETAILS_SUCCESS:
      return {
        data: {
          ...state.data,
          ...action.payload,
        },
        loading: false,
      };

    case UPDATE_ACCOUNT_DETAIL_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case CHANGE_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_SHIPPING_ADDRESS_BEGIN:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_BILLING_ADDRESS_BEGIN:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_TOMATO_COINS:
      return {
        ...state,
        data: {
          ...state.data,
          tomato_coins: action.payload,
        },
      };

    case UPDATE_TOMATO_POINTS:
      return {
        ...state,
        data: {
          ...state.data,
          tomato_points: action.payload,
        },
      };

    default:
      return state;
  }
};
