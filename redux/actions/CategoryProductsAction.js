import {
  FETCH_CATEGORY_PRODUCTS_BEGIN,
  FETCH_CATEGORY_PRODUCTS_SUCCESS,
  ADD_CATEGORY_PRODUCTS,
  REFRESH_CATEGORY_PRODUCTS_BEGIN,
  REFRESH_CATEGORY_PRODUCTS_SUCCESS,
} from "../constants";
import { Woo } from "../../API";

const FetchCategoryProductsBegin = () => ({
  type: FETCH_CATEGORY_PRODUCTS_BEGIN,
});

const FetchCategoryProductsSuccess = (payload) => ({
  type: FETCH_CATEGORY_PRODUCTS_SUCCESS,
  payload,
});

const AddCategoryPrducts = (payload) => ({
  type: ADD_CATEGORY_PRODUCTS,
  payload,
});

export const FetchCategoryProducts = (Cid, page) => (dispatch) => {
  dispatch(FetchCategoryProductsBegin());
  console.log(Cid, page);
  try {
    Woo.get("/products", {
      params: {
        category: Cid,
        page,
        per_page: 40,
      },
    }).then(({ data }) => {
      console.log("category paroduct", data.length);
      if (page === 1) {
        dispatch(FetchCategoryProductsSuccess(data));
      } else {
        dispatch(AddCategoryPrducts(data));
      }
    });
  } catch (err) {
    console.log("Error in fetching category products => ", err);
  }
};

export const FetchBySorting = (Cid, page) => (dispatch) => {
  dispatch(FetchCategoryProductsBegin());
  try {
    Woo.get(`mall/category/${Cid}`, {
      params: {
        sortby: "popular_menu_order",
        all: true,
      },
    }).then(({ data }) => {
      dispatch(FetchCategoryProductsSuccess(data));
    });
  } catch (err) {
    console.log("Error in fetching category products => ", err);
  }
};

export const FetchFlashDealsCategoryProducts = (page) => (dispatch) => {
  dispatch(FetchCategoryProductsBegin());
  try {
    Woo.get(`flashdeals`, {
      params: {
        on_sale: true,
      },
    }).then(({ data }) => {
      if (page === 1) {
        dispatch(FetchCategoryProductsSuccess(data));
      } else {
        dispatch(AddCategoryPrducts(data));
      }
    });
  } catch (err) {
    console.log("Error in fetching flashdeals category products => ", err);
  }
};

const RefreshCategoryProductsBegin = () => ({
  type: REFRESH_CATEGORY_PRODUCTS_BEGIN,
});

const RefreshCategoryProductsSuccess = (payload) => ({
  type: REFRESH_CATEGORY_PRODUCTS_SUCCESS,
  payload,
});

export const RefreshCategoryProducts = (Cid) => (dispatch) => {
  dispatch(RefreshCategoryProductsBegin());
  try {
    Woo.get("/products", {
      params: {
        category: Cid,
      },
    }).then(({ data }) => {
      dispatch(RefreshCategoryProductsSuccess(data));
    });
  } catch (err) {
    console.log("Error in refreshing category products => ", err);
  }
};

export const RefreshFlashDealsProducts = () => (dispatch) => {
  dispatch(RefreshCategoryProductsBegin());
  try {
    Woo.get("/flashdeals", {
      params: {
        on_sale: true,
      },
    }).then(({ data }) => {
      dispatch(RefreshCategoryProductsSuccess(data));
    });
  } catch (err) {
    console.log("Error in refreshing category products => ", err);
  }
};

export const ResetCategoryProducts = () => (dispatch) => {
  dispatch(FetchCategoryProductsSuccess([]));
};
