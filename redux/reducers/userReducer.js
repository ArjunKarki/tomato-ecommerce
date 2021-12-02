import { GET_USER, SET_USER } from "../constants";

const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return state.user;

    case SET_USER:
      return Object.assign({}, state.user, { ...action.payload });

    default:
      return state;
  }
};
