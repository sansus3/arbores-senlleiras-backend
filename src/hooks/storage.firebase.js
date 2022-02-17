import { ref, listAll, deleteObject, getStorage } from "firebase/storage";
import { storage } from "@/hooks/firebase.js";
import { reactive } from "vue";



let response = reactive([]);

export const deleteFile = async (uid) => {
    //const uid = `${props.files_uid}/${response.items[index].name}`;
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(storage, uid);
    try {
        await deleteObject(desertRef);
    } catch (error) {
        // Uh-oh, an error occurred!
        console.error(error);
    }
}





/**
 * 
 * @param {String} files_uid Identificador/carpeta donde se encuentran los ficheros
 */
export const getAllFiles = async files_uid => {
    //console.log(files_uid)
    // Create a reference under which you want to list
    const listRef = ref(storage, files_uid);
    // Find all the prefixes and items.
    response = await listAll(listRef);
    //console.log(response)
    return {
        response
    }
}