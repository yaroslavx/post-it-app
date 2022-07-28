  // Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClG5M-cZH8FpI_I6oIlXy39xtih1R_JAw",
    authDomain: "post-it-app-9ba39.firebaseapp.com",
    projectId: "post-it-app-9ba39",
    storageBucket: "post-it-app-9ba39.appspot.com",
    messagingSenderId: "158013356619",
    appId: "1:158013356619:web:f727545fdc262cf3472bce"
  }; 

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };