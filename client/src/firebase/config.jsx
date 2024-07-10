// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3IqqkeQR8eQNF_8VAKnNmSQSSA5r0h1Y",
  authDomain: "note-app-9e65f.firebaseapp.com",
  projectId: "note-app-9e65f",
  storageBucket: "note-app-9e65f.appspot.com",
  messagingSenderId: "558989026496",
  appId: "1:558989026496:web:eb89d687456a76d35af925"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);