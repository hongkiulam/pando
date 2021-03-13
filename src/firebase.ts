// Import the Firebase Services you want bundled and call initializeApp
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { writable, readable } from "svelte/store";
import type { Record } from "./types/db";

const MY_UID = "aPn5vIFup3gPNn5wdIyRfvY4HT73";
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

const firestore = firebase.firestore;

const _docRef = writable(
  firebase.firestore().collection("records").doc("guest")
);
const docRef = readable(
  firebase.firestore().collection("records").doc("guest"),
  (set) => {
    _docRef.subscribe(set);
  }
);

const _db = writable<Record>(null);
const db = readable<Record>(null, (set) => {
  _db.subscribe(set);
});

let unsubscribeFromDB = () => {};
const setDB = (docName: "me" | "guest") => {
  unsubscribeFromDB();
  const doc = firebase.firestore().collection("records").doc(docName);
  _docRef.set(doc);
  unsubscribeFromDB = doc.onSnapshot((doc) => {
    _db.set(doc.data() as Record);
  });
};

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export { db, docRef, firestore, auth, googleProvider, setDB, MY_UID };
