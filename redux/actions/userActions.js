import { SET_USER } from "../constants";

export const SetUser = (data) => (dispatch) => {
  // some async code here
  return dispatch({
    type: SET_USER,
    payload: data || {},
  });
};
