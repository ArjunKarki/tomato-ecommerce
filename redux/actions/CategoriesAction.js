import { FETCH_CATEGORIES_BEGIN, FETCH_CATEGORIES_SUCCESS } from "../constants";
import { Woo } from "../../API";

const FetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN,
});

const FetchCategoriesSuccess = (payload) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload,
});

export const FetchCategories = () => (dispatch) => {
  dispatch(FetchCategoriesBegin);

  try {
    Woo.get("category-lists?per_page=50").then(({ data }) => {
      console.log(data);

      dispatch(FetchCategoriesSuccess(data));
    });
  } catch (err) {
    console.log("Error fetching categories => ", err);
  }
};
