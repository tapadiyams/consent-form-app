import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUtmKntkbHBUi2jhtqW1mVQUekC177Lp4",
  authDomain: "selections-reliance-stone.firebaseapp.com",
  projectId: "selections-reliance-stone",
  storageBucket: "selections-reliance-stone.appspot.com",
  messagingSenderId: "175026085929",
  appId: "1:175026085929:web:ead703600ac9b57d477c38",
  measurementId: "G-NH5Y6MQEEK",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
