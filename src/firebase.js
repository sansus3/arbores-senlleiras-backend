//npm install --save firebase //https://learnvue.co/2021/06/a-vue-firebase-authentication-tutorial-vue-3-and-firebase/#user-registration
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: 'AIzaSyD-a66QbdKHK7XGcquXhLz40SzSf3s0uX8',//your-api-key
    authDomain: 'arbores-senlleiras',//<your-auth-domain>
    databaseURL: 'https://arbores-senlleiras-default-rtdb.europe-west1.firebasedatabase.app/',//<your-database-url>
    storageBucket: 'gs://arbores-senlleiras.appspot.com',//<your-storage-bucket-url>'
}

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket

export const storage = getStorage(firebaseApp);