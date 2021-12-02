import { FETCH_CATEGORIES_BEGIN, FETCH_CATEGORIES_SUCCESS } from '../constants';

const initialState = {
    data: [],
    loading: false,
}

export const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_BEGIN:
            return {
                ...state,
                loading: true,
            }
    
        case FETCH_CATEGORIES_SUCCESS:
            return {
                data: action.payload,
                loading: false,
            }
        
        default: 
            return state;
    }
}