// Import the Firebase Services you want bundled and call initializeApp
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { writable } from "svelte/store";
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
const docRef = writable(
  firebase.firestore().collection("records").doc("guest")
);
const db = writable<Record>(null);

const setDB = (docName: "me" | "guest") => {
  docRef.set(firebase.firestore().collection("records").doc(docName));
  let doc;
  docRef.subscribe((x) => (doc = x));
  doc.onSnapshot((doc) => {
    db.set(doc.data() as Record);
  });
};

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export { db, docRef, firestore, auth, googleProvider, setDB, MY_UID };
