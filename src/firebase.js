// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDdoumpWxZeQoa3ygcsSZl-_8WuOx483c0",
    authDomain: "polleria-poultry.firebaseapp.com",
    projectId: "polleria-poultry",
    storageBucket: "polleria-poultry.appspot.com",
    messagingSenderId: "373712488265",
    appId: "1:373712488265:web:e31f3ad93ab00c24a0bc98",
    measurementId: "G-QE8H4FL17M"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getStorage(app);
const provider = new GoogleAuthProvider();

export { app,auth, db, firestore, provider };