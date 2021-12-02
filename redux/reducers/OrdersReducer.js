const { ORDERS_FETCH_BEGIN, ORDERS_FETCH_SUCCESS, CLEAR_ORDERS } = require("../constants");

const initialState = {
    data: [],
    loading: false,
}

export const OrdersReducer = (state=initialState, action) => {
    switch (action.type) {
        case ORDERS_FETCH_BEGIN:
            return {
                ...state,
                loading: true,
            }
    
        case ORDERS_FETCH_SUCCESS:
            return {
                data: action.payload,
                loading: false,
            }

        case CLEAR_ORDERS:
            return {
                ...state,
                data: [],
            }

        default:
            return state;
    }
}