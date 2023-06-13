import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASBORQbGRChT6VvQW0fJePj_bk_xcijps",
  authDomain: "reliance-stone.firebaseapp.com",
  projectId: "reliance-stone",
  storageBucket: "reliance-stone.appspot.com",
  messagingSenderId: "111347042760",
  appId: "1:111347042760:web:93702e418b66be6e04d8fd",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
