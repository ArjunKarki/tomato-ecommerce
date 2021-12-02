import {
  FETCH_WHISHLIST_SUCCESS,
  FETCH_WHISHLIST_BEGIN,
  REMOVE_WISHLIST,
  ADD_WHISHLIST,
  GET_WISHLIST
} from "../constants";
import { AsyncStorage } from "react-native";

export const AddWishlist = (data) => ({

  type: ADD_WHISHLIST,
  payload: data
})

export const RemoveWishList = (data) => ({
  type: REMOVE_WISHLIST,
  payload: data

})

const CheckUser = async () => {
  let user = await AsyncStorage.getItem("user").then((res) => JSON.parse(res));
  return user;
};

const CheckWhishlist = async () => {
  let wishList = await AsyncStorage.getItem("wishlist").then((res) =>
    JSON.parse(res)
  );
  return wishList;
};

const PersistWhishlist = async (wishlist) => {
  await AsyncStorage.setItem("wishlist", wishlist);
};

const FetchWishlistBegin = () => ({
  type: FETCH_WHISHLIST_BEGIN,
});

const FetchWishlistSuccess = (payload) => ({
  type: FETCH_WHISHLIST_SUCCESS,
  payload,
});

export const FetchWishlist = () => {
  return async (dispatch) => {
    dispatch(FetchWishlistBegin());
    let tmpArr = [];

    if ((await CheckUser()) === null) {
      let tmpWishlist = await CheckWhishlist();
      if (tmpWishlist !== null) {
        tmpWishlist.forEach((item) => {
          tmpArr.push(item);
        });
      }
    }

    dispatch(FetchWishlistSuccess(tmpArr));
  };
};
