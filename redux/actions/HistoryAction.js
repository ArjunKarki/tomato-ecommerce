import { SAVE_HISTORY } from "../constants";

export const SaveHistory = (data) => (dispatch) => {
    return  dispatch({
            type: SAVE_HISTORY,
            payload: data   
        })
    
}