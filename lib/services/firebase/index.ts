import admin from "firebase-admin";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
//import serviceAccount from "./serviceAccountKey.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      //credential: admin.credential.cert(serviceAccount),
    });
  } catch (err) {
    console.log("Firebase admin initialization error", err);
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "picpath-demo.firebaseapp.com",
  projectId: "picpath-demo",
  storageBucket: "picpath-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const firestore = getFirestore(app);

export {
  auth,
  firestore,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  collection,
  setDoc,
  doc,
};
