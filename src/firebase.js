// import firebase from 'firebase/app'
// import 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import "firebase/firestore";
import "firebase/compat/storage"
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

// console.log(process.env.REACT_APP_FIREBASE_API_KEY);
const app = firebase.initializeApp( {
  apiKey: "AIzaSyBuNCgdv1kFVTnUXj7BDjj1CF2hp6InBys",
  authDomain: "web-dev-c8394.firebaseapp.com",
  projectId: "web-dev-c8394",
  storageBucket: "web-dev-c8394.appspot.com",
  messagingSenderId: "612725036399",
  appId: "1:612725036399:web:3931f6bb370884a07b049a",
  measurementId: "G-E45Q7WLGCQ"
});

const analytics = getAnalytics(app);
const firestore = firebase.firestore();
export const storage = firebase.storage();

export const database  ={
    Doctors: firestore.collection('Doctors'),
    Users: firestore.collection('Users'),
    
}

console.log(database.Doctors);

export const auth = app.auth()
export default app
