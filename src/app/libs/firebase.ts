// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz3jVcCyTnpCxXu6F_trzPMADuCXv5BGM",
  authDomain: "nextjs14-ecom.firebaseapp.com",
  projectId: "nextjs14-ecom",
  storageBucket: "nextjs14-ecom.appspot.com",
  messagingSenderId: "444678439763",
  appId: "1:444678439763:web:78a1574725ad13bff257a6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;