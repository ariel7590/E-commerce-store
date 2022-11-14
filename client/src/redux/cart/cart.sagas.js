import { all, call, takeLatest, put } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import { CartActionTypes } from "./cart.types";
import { clearCart, showUsersCart } from "./cart.actions";
import {
	getCurrentUser,
	addItemsToUserCart,
	firestore,
	removeItemFromUsersCart,
	clearItemFromUsersCart
} from "../../firebase/firebase.utils";

export function* addItemToFirebase({ payload: { id, name, price, imageUrl } }) {
	const userAuth = yield getCurrentUser();
	if (!userAuth) return;
	try {
		addItemsToUserCart(userAuth, { id, name, price, imageUrl });
	} catch (error) {
		console.log("Error: " + error.message);
	}
}

export function* updateCartOnSignIn() {
	const userAuth = yield getCurrentUser();
	if (!userAuth) return;
	try {
		const cartCollectionRef = yield firestore.collection(
			`users/${userAuth.uid}/cartItems`
		);
		const cartCollectionSnapshot = yield cartCollectionRef.get();
		let cartItems = [];
		yield cartCollectionSnapshot.docs.map(
			(item) => (cartItems = [...cartItems, item.data()])
		);
		yield put(showUsersCart(cartItems));
	} catch (error) {
		console.log("Error: " + error.message);
	}
}

export function* removeItemFromFirebase(action) {
	const userAuth = yield getCurrentUser();
	if (!userAuth) return;
	try {
		const itemToRemove = action.payload;
		removeItemFromUsersCart(userAuth, itemToRemove);
	} catch (error) {
		console.log("Error: " + error.message);
	}
}

export function* clearItemFromFirebase(action){
	const userAuth = yield getCurrentUser();
	if (!userAuth) return;
	try {
		const itemToClear = action.payload;
		clearItemFromUsersCart(userAuth, itemToClear);
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

export function* onSignInSuccess() {
	yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, updateCartOnSignIn);
}

export function* onAddCartItem() {
	yield takeLatest(CartActionTypes.ADD_ITEM, addItemToFirebase);
}

export function* onRemoveItemFromCart() {
	yield takeLatest(CartActionTypes.REMOVE_ITEM, removeItemFromFirebase);
}

export function* onClearItemFromCart(){
	yield takeLatest(CartActionTypes.CLEAR_ITEM_FROM_CART, clearItemFromFirebase);
}
export function* cartSagas() {
	yield all([
		call(onSignOutSuccess),
		call(onAddCartItem),
		call(onSignInSuccess),
		call(onRemoveItemFromCart),
		call(onClearItemFromCart)
	]);
}
