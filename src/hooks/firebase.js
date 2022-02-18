//Si trabajamos con nodejs
//npm install firebase

//Imports
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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


// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);