<template>
    <div class="d-flex justify-content-center align-items-center">
        <figure class="figure" v-for="(ruta, index) in rutas" :key="index">
            <img :src="ruta" width="200" class="figure-img img-fluid rounded" :alt="index+1" />
            <figcaption class="figure-caption">
                Imagen {{index+1}}
                <template v-if="optionsBool">
                    <a href="#" @click.prevent="deleteImg(index)">Eliminar</a>
                </template>
            </figcaption>
        </figure>
    </div>
</template>

<script setup>
import { storage } from "@/hooks/firebase";
import { ref, listAll, getDownloadURL, deleteObject, getStorage } from "firebase/storage";
import { reactive } from "vue";

const props = defineProps({
    files_uid: {
        type: String,
        required: true
    },
    optionsBool: {
        type: Boolean,
        default: false,
    }
});

const rutas = reactive([]);
let response = reactive([]);

const deleteImg = async (index) => {
    const uid = `${props.files_uid}/${response.items[index].name}`;
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(storage, uid);
    try {
        await deleteObject(desertRef);
        rutas.splice(index, 1);
    } catch (error) {
        // Uh-oh, an error occurred!
        console.error(error);
    }
}

const loadImages = async () => {

    // Create a reference under which you want to list
    const listRef = ref(storage, props.files_uid);
    // Find all the prefixes and items.
    response = await listAll(listRef)
    //console.log(response.items[0].name)
    response.items.forEach((itemRef) => {
        // All the items under listRef.
        //console.log(itemRef.fullPath)
        (async () => {
            const url = await getDownloadURL(ref(storage, itemRef.fullPath));
            rutas.push(url);
        })()

    });
}

loadImages();

</script>