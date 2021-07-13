import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUlXqhb6LOJ0dSXOw9fmnCxvn8ki8XKUE",
  authDomain: "reactrtc-fc277.firebaseapp.com",
  projectId: "reactrtc-fc277",
  storageBucket: "reactrtc-fc277.appspot.com",
  messagingSenderId: "367371809142",
  appId: "1:367371809142:web:fa4710bdde0ba49358ca57",
  measurementId: "G-0LPSGEYDEK"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebaseConfig;