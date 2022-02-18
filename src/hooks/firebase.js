//Si trabajamos con nodejs
//npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxM2ZiH_GbjcRFefEXhhX5B9d81a5on2g",
  authDomain: "senlleiras-especies.firebaseapp.com",
  databaseURL: "https://senlleiras-especies-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "senlleiras-especies",
  storageBucket: "senlleiras-especies.appspot.com",
  messagingSenderId: "466585523034",
  appId: "1:466585523034:web:1856eed106d0f1f10b1963"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);