import {
  SET_BEAUTY_ROW,
  SET_DAILY_DISCOVER_ROW,
  SET_CATEGORY_ROW,
  SET_PRODUCT,
  SET_ELECTRONIC_ROW,
  SET_KIDS_ROW,
  SET_FLASHDEALS,
  SET_PET_PRODUCT_ROW,
} from "../constants";

export const SetBeautyRow = (data) => (dispatch) => {
  return dispatch({
    type: SET_BEAUTY_ROW,
    payload: data,
  });
};

export const SetPetProductRow = (data) => (dispatch) => {
  return dispatch({
    type: SET_PET_PRODUCT_ROW,
    payload: data,
  });
};

export const SetDailyDiscoverRow = (data) => (dispatch) => {
  return dispatch({
    type: SET_DAILY_DISCOVER_ROW,
    payload: data,
  });
};

export const SetCategoryRow = (data) => (dispatch) => {
  return dispatch({
    type: SET_CATEGORY_ROW,
    payload: data,
  });
};

export const SetProduct = (data) => (dispatch) => {
  return dispatch({
    type: SET_PRODUCT,
    payload: data,
  });
};

export const SetElectronicRow = (data) => (dispatch) => {
  return dispatch({
    type: SET_ELECTRONIC_ROW,
    payload: data,
  });
};

export const SetKidRow = (data) => (dispatch) => {
  return dispatch({
    type: SET_KIDS_ROW,
    payload: data,
  });
};

export const SetFlashDeals = (data) => (dispatch) => {
  return dispatch({
    type: SET_FLASHDEALS,
    payload: data,
  });
};
