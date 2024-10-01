// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
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

  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredentials.user;
  // send the verification email
  await sendEmailVerification(user);
  return userCredentials;
};

export const login = async (email, password) => {
  if (!email || !password) return;

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredentials.user;

    if (user && user.emailVerified) {
      return userCredentials; // proceed with login
    } else {
      throw new Error("Please verify your email before logging in.");
    }
  } catch (error) {
    throw error;
  }
};

// 2FA - using email verfication link
export const resendVerificationEmail = async (user) => {
  if (user && !user.emailVerified) {
    await sendEmailVerification(user);
    alert("Verification email resent. Please check your inbox.");
  }
};

export const logoutUser = async () => {
  const auth = getAuth();
  await signOut(auth);
};
