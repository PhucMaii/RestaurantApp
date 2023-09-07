// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'restaurantapp-3ce71.firebaseapp.com',
  projectId: 'restaurantapp-3ce71',
  storageBucket: 'restaurantapp-3ce71.appspot.com',
  messagingSenderId: '1013220482988',
  appId: '1:1013220482988:web:d41ef64930706e14946409',
  measurementId: 'G-33KVY398E0',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const db = getFirestore();
const storage = getStorage();

export { auth, googleProvider, db, storage };
