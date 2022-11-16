import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
	apiKey: "AIzaSyB1e_8ub8iC-6qaOYdQkDTaOFGnWlmQ_7c",
	authDomain: "crwn-db-9514f.firebaseapp.com",
	projectId: "crwn-db-9514f",
	storageBucket: "crwn-db-9514f.appspot.com",
	messagingSenderId: "867352656870",
	appId: "1:867352656870:web:437ff61f1d11bf2809b427",
	measurementId: "G-KCMPEHRTHR",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}
	return userRef;
};

export const addItemsToUserCart = async (userAuth, cartItem) => {
	if (!userAuth) return;

	const userCartRef = firestore.collection(`users/${userAuth.uid}/cartItems`);

	const snapShot = await userCartRef.get();

	try {
		const { id, name, price, imageUrl } = cartItem;
		const existingItem = await snapShot.docs.find(
			(item) => item.data().id === id
		);
		if (existingItem) {
			await userCartRef.doc(existingItem.id).set({
				...existingItem.data(),
				quantity: existingItem.data().quantity + 1,
			});
		} else {
			await userCartRef.doc().set({
				id,
				name,
				price,
				imageUrl,
				quantity: 1,
			});
		}
	} catch (error) {
		console.log("error at adding items", error.message);
	}

	return userCartRef;
};

export const removeItemFromUsersCart = async (userAuth, itemToRemove) => {
	if (!userAuth) return;

	const userCartRef = firestore.collection(`users/${userAuth.uid}/cartItems`);

	const snapShot = await userCartRef.get();

	const itemInDb = await snapShot.docs.find(
		(item) => item.data().id === itemToRemove.id
	);
	try {
		if (itemToRemove.quantity > 1) {
			await userCartRef.doc(itemInDb.id).set({
				...itemToRemove,
				quantity: itemToRemove.quantity - 1,
			});
		} else {
			await clearItemFromUsersCart(userAuth, itemToRemove);
		}
	} catch (error) {
		console.log("error at removing items", error.message);
	}

	return userCartRef;
};

export const clearItemFromUsersCart = async (userAuth, itemToClear) => {
	if (!userAuth) return;

	const userCartRef = firestore.collection(`users/${userAuth.uid}/cartItems`);

	const snapShot = await userCartRef.get();

	const itemInDb = await snapShot.docs.find(
		(item) => item.data().id === itemToClear.id
	);
	try {
		await userCartRef.doc(itemInDb.id).delete();
	} catch (error) {
		console.log("error at removing items", error.message);
	}
};

export const clearUsersCartAfterPayment = async (userAuth) => {
	if (!userAuth) return;

	const userCartRef = firestore.collection(`users/${userAuth.uid}/cartItems`);

	const snapShot = await userCartRef.get();

	try {
		await snapShot.docs.map(
			(item) => userCartRef.doc(item.id).delete()
		);
	} catch (error) {
		console.log("error at removing items", error.message);
	}
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
		console.log(newDocRef);
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

// use this method to add a cartItems collection to all the existing users, since I added the cart to the firestore
// after I had some users in it
export const addCartItemstoUsers = async () => {
	const userDocsArray = (await firestore.collection("users").get()).docs;
	console.log(userDocsArray);
	const batch = firestore.batch();

	userDocsArray.forEach((userDoc) => {
		const userRef = firestore
			.collection("users")
			.doc(userDoc.id)
			.collection("cartItems")
			.doc();
		console.log(userRef);
		batch.set(userRef, {});
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
	const transfomedCollections = collections.docs.map((doc) => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		};
	});

	return transfomedCollections.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
