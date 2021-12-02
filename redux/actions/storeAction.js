import { SET_TRENDING_STORE } from "../constants";

export const setTrendingStore = (data) => (dispatch) => {
  dispatch({
    type: SET_TRENDING_STORE,
    payload: data,
  });
};
