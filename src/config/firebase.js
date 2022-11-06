// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEXDuLu31uO_RDnIWF0vqdmtzoahOU1KI",
  authDomain: "react-mini-project-b4209.firebaseapp.com",
  projectId: "react-mini-project-b4209",
  storageBucket: "react-mini-project-b4209.appspot.com",
  messagingSenderId: "840927980418",
  appId: "1:840927980418:web:230103e97dc8c712013d9b",
  measurementId: "G-EDKDMZNDCY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    Cookies.set("id", auth._currentUser.uid);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (id, name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    Cookies.set("id", user.uid);

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      id: id,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  Cookies.remove("id");
  Cookies.remove("tokoId");
};

const storage = getStorage(app);

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  storage,
};
