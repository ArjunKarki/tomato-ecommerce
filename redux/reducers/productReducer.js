import {
  SET_CATEGORY_ROW,
  SET_BEAUTY_ROW,
  SET_POPULAR_ROW,
  SET_DAILY_DISCOVER_ROW,
  SET_PRODUCT,
  SET_ELECTRONIC_ROW,
  SET_KIDS_ROW,
  SET_FLASHDEALS,
  SET_PET_PRODUCT_ROW,
} from "../constants";

const initialState = {
  beautyRow: [],
  kitchenRow: [],
  daillyDiscoverRow: [],
  categoryRow: {
    data: [],
    date: null,
  },
  electronicRow: [],
  kidsRow: [],
  petProductRow: [],
  product: null,
  flashDeals: {
    data: [],
    expired_date: null,
  },
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEAUTY_ROW:
      return Object.assign({}, state, { beautyRow: action.payload });

    case SET_POPULAR_ROW:
      return Object.assign({}, state, { kitchenRow: action.payload });

    case SET_DAILY_DISCOVER_ROW:
      return Object.assign({}, state, { daillyDiscoverRow: action.payload });

    case SET_CATEGORY_ROW:
      return Object.assign({}, state, { categoryRow: action.payload });

    case SET_ELECTRONIC_ROW:
      return Object.assign({}, state, { electronicRow: action.payload });

    case SET_KIDS_ROW:
      return Object.assign([], state, { kidsRow: action.payload });

    case SET_PET_PRODUCT_ROW:
      return Object.assign([], state, { petProductRow: action.payload });

    case SET_PRODUCT:
      return Object.assign({}, state, { product: action.payload });

    case SET_FLASHDEALS:
      return Object.assign({}, state, { flashDeals: action.payload });

    default:
      return state;
  }
};
