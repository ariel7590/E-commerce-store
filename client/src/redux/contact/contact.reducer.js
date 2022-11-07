import { contactActionTypes } from "./contact.types";

const INITIAL_STATE = {
	message: undefined,
	error: null,
};

const contactReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case contactActionTypes.SEND_MESSAGE_SUCCESS:
			console.log("Message sent!");
			return {
				...state,
				message: action.payload,
				error: null,
			};

            case contactActionTypes.SEND_MESSAGE_FAILED:
                return {
                    ...state,
                    error: action.payload
                }
		default:
			return state;
	}
};

export default contactReducer;
