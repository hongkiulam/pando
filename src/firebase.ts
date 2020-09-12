// Import the Firebase Services you want bundled and call initializeApp
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWj5tK3twgNatmr6uAWmjBfR-3Dz68YLA",
  authDomain: "pando-f7e5f.firebaseapp.com",
  databaseURL: "https://pando-f7e5f.firebaseio.com",
  projectId: "pando-f7e5f",
  storageBucket: "pando-f7e5f.appspot.com",
  messagingSenderId: "282384445647",
  appId: "1:282384445647:web:d95ba7e912bda07ed507ba",
  measurementId: "G-KJJPJP7NB9",
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
import { readable } from "svelte/store";
import type { Record } from "./types/db";
const db = readable<Record>(null, (set) => {
  firestore
    .collection("records")
    .doc("me")
    .onSnapshot((doc) => {
      set(doc.data() as Record);
    });
});
export { db, firestore };
