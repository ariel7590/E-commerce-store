import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyB1e_8ub8iC-6qaOYdQkDTaOFGnWlmQ_7c",
    authDomain: "crwn-db-9514f.firebaseapp.com",
    projectId: "crwn-db-9514f",
    storageBucket: "crwn-db-9514f.appspot.com",
    messagingSenderId: "867352656870",
    appId: "1:867352656870:web:437ff61f1d11bf2809b427",
    measurementId: "G-KCMPEHRTHR"
  };

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
