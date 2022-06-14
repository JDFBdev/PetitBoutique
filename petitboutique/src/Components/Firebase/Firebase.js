import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDhFOa30nYCGkmrX10VyTzH00vllzrDmtw",
    authDomain: "petit-boutique-d04d6.firebaseapp.com",
    projectId: "petit-boutique-d04d6",
    storageBucket: "petit-boutique-d04d6.appspot.com",
    messagingSenderId: "943303321996",
    appId: "1:943303321996:web:6992bdfa34fe1823cecea9",
    measurementId: "G-T4HH7VK102"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);