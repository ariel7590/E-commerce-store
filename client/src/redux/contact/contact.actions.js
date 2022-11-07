import { contactActionTypes } from "./contact.types";

export const sendMessageStart = (message) => ({
	type: contactActionTypes.SEND_MESSAGE_START,
	payload: message,
});

export const sendMessageSuccess = (message) => ({
	type: contactActionTypes.SEND_MESSAGE_SUCCESS,
	payload: message,
});

export const sendMessageFailed = (error) => ({
	type: contactActionTypes.SEND_MESSAGE_FAILED,
	payload: error,
});