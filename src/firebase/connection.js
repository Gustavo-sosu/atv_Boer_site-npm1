import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACo75cRDEW4ufwohMti4Y5L4-90P3cwIw",
  authDomain: "buyture-bd.firebaseapp.com",
  projectId: "buyture-bd",
  storageBucket: "buyture-bd.firebasestorage.app",
  messagingSenderId: "578829051403",
  appId: "1:578829051403:web:7e12131fc182bbe9f5490e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, app };