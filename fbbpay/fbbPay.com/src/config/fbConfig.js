import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCN-VaG_EXfk6KDpKF_K5EUbJB_zGGs764",
  authDomain: "fbonline-46e79.firebaseapp.com",
  databaseURL: "https://fbonline-46e79.firebaseio.com",
  projectId: "fbonline-46e79",
  storageBucket: "fbonline-46e79.appspot.com",
  messagingSenderId: "1065220695795",
  appId: "1:1065220695795:web:dddaeddc7779b0e85b3986",
  measurementId: "G-NQB8TZ24KQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
