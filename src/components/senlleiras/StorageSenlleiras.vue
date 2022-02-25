<template>
    <uploader-image :urlBase="idSenlleira"></uploader-image>
    <div class="d-flex justify-content-center align-items-center">        
        <figure class="figure" v-for="(ruta, index) in rutas" :key="index">
            <img :src="ruta" width="200" class="figure-img img-fluid rounded" :alt="index + 1" /> 
            <figcaption class="figure-caption">
                Imagen {{ index + 1 }}               
                    <a href="#" @click.prevent="deleteImg(index)">Eliminar</a>                
            </figcaption>
        </figure>
    </div>
</template>

<script setup>
//Importaciones
import UploaderImage from '@/components/UploaderImage';
import { storage } from "@/hooks/firebase";
import { ref, listAll, getDownloadURL, deleteObject, getStorage } from "firebase/storage";
import { inject, onMounted, reactive } from 'vue';
//Variables
const idSenlleira = inject('idSenlleira'); //Obtenemos el Id del componente padre. La vista EditView.vue
const rutas = reactive([]);//Almacenaremos las rutas de las imágenes aquí
let response = reactive([]);

//Ciclo de vida
onMounted(async()=>{
    try {
        await loadImages();
    } catch (error) {
        console.log(error);
    }
})

//Métodos
const loadImages = async () => {
    // Create a reference under which you want to list
    const listRef = ref(storage, idSenlleira);
    // Find all the prefixes and items.
    response = await listAll(listRef);
    response.items.forEach((itemRef) => {
        // All the items under listRef.
        //console.log(itemRef.fullPath)
        (async () => {
            const url = await getDownloadURL(ref(storage, itemRef.fullPath));
            rutas.push(url);
        })()

    });
}


const deleteImg = async (index) => {
    const uid = `${idSenlleira}/${response.items[index].name}`;
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


</script>

<style lang="scss" scoped>
</style>