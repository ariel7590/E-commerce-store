import { all, call, takeLatest, put } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import { CartActionTypes } from "./cart.types";
import { clearCart } from "./cart.actions";
import {
	getCurrentUser,
	addItemsToUserCart,
} from "../../firebase/firebase.utils";

export function* addItemToFirebase({payload:{name, price}}) {
	const userAuth = yield getCurrentUser();
	if (!userAuth) return;
	try {
		addItemsToUserCart(userAuth, {name, price});
	} catch (error) {
		console.log("Error: " + error.message);
	}
}

export function* clearCartOnSignOut() {
	yield put(clearCart());
}

export function* onSignOutSuccess() {
	yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onAddCartItem() {
	yield takeLatest(CartActionTypes.ADD_ITEM, addItemToFirebase);
}
export function* cartSagas() {
	yield all([call(onSignOutSuccess), call(onAddCartItem)]);
}
