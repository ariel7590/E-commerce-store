import { takeLatest, put, all, call } from "redux-saga/effects";
import { contactActionTypes } from "./contact.types";
import {
	sendMessageSuccess,
	sendMessageFailed,
} from "./contact.actions";

export function* sendMessage(payload) {
	try {
		yield console.log("Sending the message...");
		yield put(sendMessageSuccess(payload));
	} catch (error) {
		yield put(sendMessageFailed(error));
	}
}

export function* onSendMessageStart() {
	yield takeLatest(contactActionTypes.SEND_MESSAGE_START, sendMessage);
}

export function* contactSagas() {
	yield all([call(onSendMessageStart)]);
}
