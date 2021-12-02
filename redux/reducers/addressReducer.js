import { ADD_ADDRESS, REMOVE_ADDRESS } from "../constants";

const initialState = [
    {
        addressID: "1",
        default: true,
        contactName: "John Doe",
        phoneNumber: "+959123456789",
        address: "11D. NO(452), White Pearl Condo. Example Road, Lanmadaw Township, Yangon."
    },
]

export const AddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            return [
                ...state.map(tmp => ({
                    ...tmp,
                    default: false,
                })),
                action.payload
            ]

        case REMOVE_ADDRESS:
            return state.filter(address => address.addressID !== action.payload.addressID);
    
        default:
            return state;
    }
}