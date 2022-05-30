import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const clientCredential = {
  apiKey: "AIzaSyD_gpitqjrLdjEhb2f7evtM54C-l4HZMAI",
  authDomain: "scan-et.firebaseapp.com",
  projectId: "scan-et",
  storageBucket: "scan-et.appspot.com",
  messagingSenderId: "117508754903",
  appId: "1:117508754903:web:4c2dd4f81e2126f081cf92",
  measurementId: "G-J51J73NH4P",
};

console.log("i'm initialized");

firebase.initializeApp(clientCredential);

export default firebase;
