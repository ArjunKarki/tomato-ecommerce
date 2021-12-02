import { SET_WHISHLIST, REMOVE_WISHLIST, ADD_WHISHLIST, FETCH_WHISHLIST_SUCCESS, FETCH_WHISHLIST_BEGIN, } from '../constants';

const initialState = {
    wishList: [],
    loading: false,
};

export const wishListReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_WHISHLIST_BEGIN:
            return {
                ...state,
                loading: true,
            }

        case FETCH_WHISHLIST_SUCCESS:
            return {
                loading: false,
                wishList: action.payload,
            }

        case ADD_WHISHLIST:

            let wishList = state.wishList

            const index = wishList.findIndex(wl => wl.id == action.payload.id)
            if (index > -1)
                wishList[index] = action.payload
            else
                wishList.unshift(action.payload)

            return {
                ...state,
                wishList
            }

        case REMOVE_WISHLIST:
            return {
                ...state,
                wishList: state.wishList.filter(tmpList => {
                    return tmpList.id !== action.payload;
                })
            }

        case SET_WHISHLIST:
            return {
                ...state,
                wishList: [
                    ...action.payload
                ]
            }


        default:
            return state;
    }
}