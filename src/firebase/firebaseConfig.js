import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgmKbRbvWmS8yTGJhnb8PNVWljCITPZRk",
  authDomain: "todo-snack.firebaseapp.com",
  projectId: "todo-snack",
  storageBucket: "todo-snack.appspot.com",
  messagingSenderId: "545326853242",
  appId: "1:545326853242:web:b5d48b370f658bf89b5fc3",
  measurementId: "G-KGGB7T60HC",
};

export const FIREBASE = initializeApp(firebaseConfig);
export const FirestoreDB = getFirestore(FIREBASE);
