import { SET_TRENDING_STORE } from "../constants";

const intialState = {
  trendingStore: [],
};

export const storeReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_TRENDING_STORE:
      return Object.assign({}, state, { trendingStore: action.payload });

    default:
      return state;
  }
};
