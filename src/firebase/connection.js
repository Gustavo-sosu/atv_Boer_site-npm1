// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export { db };