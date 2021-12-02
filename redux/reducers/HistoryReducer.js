import { SAVE_HISTORY } from "../constants"

const initialState = {
    history: []
}

export const HistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_HISTORY:
            let history = state.history
            let index

            index = history.findIndex(p => p.id == action.payload.id)
            if (index > -1) {
                history.splice(index, 1)
                history.unshift(action.payload)
            } else {
                if (history.length < 15) {
                    history.unshift(action.payload)
                } else {
                    history.splice(14, 1)
                    history.unshift(action.payload)
                }
            }


            return {
                history
            }

        default:
            return state
    }


}