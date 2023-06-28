import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Create a difference beetween test env and prod env
const isLocalhost = window.location.hostname === "localhost";

let firebaseConfig;

if (isLocalhost) {
  // For testing, use this
  firebaseConfig = {
    apiKey: "AIzaSyASBORQbGRChT6VvQW0fJePj_bk_xcijps",
    authDomain: "reliance-stone.firebaseapp.com",
    projectId: "reliance-stone",
    storageBucket: "reliance-stone.appspot.com",
    messagingSenderId: "111347042760",
    appId: "1:111347042760:web:93702e418b66be6e04d8fd",
  };
} else {
  // For production, use this
  firebaseConfig = {
    apiKey: "AIzaSyCUtmKntkbHBUi2jhtqW1mVQUekC177Lp4",
    authDomain: "selections-reliance-stone.firebaseapp.com",
    projectId: "selections-reliance-stone",
    storageBucket: "selections-reliance-stone.appspot.com",
    messagingSenderId: "175026085929",
    appId: "1:175026085929:web:ead703600ac9b57d477c38",
    measurementId: "G-NH5Y6MQEEK",
  };
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
