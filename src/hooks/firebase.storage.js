import { firebaseApp } from "./firebase";
//firebase/storage
import { getStorage } from "firebase/storage";
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);