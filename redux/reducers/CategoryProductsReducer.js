import { FETCH_CATEGORY_PRODUCTS_BEGIN, FETCH_CATEGORY_PRODUCTS_SUCCESS, ADD_CATEGORY_PRODUCTS, REFRESH_CATEGORY_PRODUCTS_BEGIN, REFRESH_CATEGORY_PRODUCTS_SUCCESS } from '../constants';

const initialState = {
    data: [],
    loading: false,
    refreshing: false,
}

export const CategoryProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_PRODUCTS_BEGIN:
            return {
                ...state,
                loading: true,
            }

        case FETCH_CATEGORY_PRODUCTS_SUCCESS:
            return {
                data: action.payload,
                loading: false,
            }

        case ADD_CATEGORY_PRODUCTS:
            return {
                data: [
                    ...state.data,
                    ...action.payload,
                ],
                loading: false,
            }
            
        case REFRESH_CATEGORY_PRODUCTS_BEGIN:
            return {
                ...state,
                refreshing: true,
            }

        case REFRESH_CATEGORY_PRODUCTS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                refreshing: false,
            }

        default:
            return state;
    }
}