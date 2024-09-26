// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-qLxKcU37VQ9JrBw6dBZXs5jsCDtgI94",
  authDomain: "w7-loginandsignup.firebaseapp.com",
  projectId: "w7-loginandsignup",
  storageBucket: "w7-loginandsignup.appspot.com",
  messagingSenderId: "352620149116",
  appId: "1:352620149116:web:306ae3696ef35d40840cf9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);

export const createUserDoc = async (userCred, additionalInformation) => {
  if (!userCred.email) return;
  const userDocRef = doc(db, "users", userCred.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userCred;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error in creating document: ", error);
    }
  }
  return userDocRef;
};

export const signup = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const login = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  const auth = getAuth();
  await signOut(auth);
};
