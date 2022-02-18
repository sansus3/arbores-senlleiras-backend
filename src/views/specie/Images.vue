<template>
    <section class="section section__catalogo p-2">
        <header v-if="specie">
            <h2 class="display-6">
                <!-- Subida de imágenes de {{ $route.params.id }} -->
                {{ specie.genus }} {{ specie.specie }} {{ specie.names.join() }}
            </h2>
            <uploader-image :urlBase="getUrl" @customAction="guardarDatos"></uploader-image>
        </header>
        <div
            v-else
            class="alert alert-danger"
            role="alert"
        >Ha ocurrido un error en la edición de la especie vuelva al catálogo y vuelva a intentarlo</div>
    </section>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import UploaderImage from '@/components/UploaderImage';


const store = useStore();
const route = useRoute();


onMounted(() => {
    store.dispatch('setSpecie', route.params.id);
});



let urls = reactive([]);
const specie = computed(() => store.state.specie);
const getUrl = computed(() => {
    return `${route.params.id}/`;
});


/**
 * Función que añade ficheros a un array
 * @param {Object} files Object de objetos de ficheros de imagen
 */
const guardarDatos = files => {
    urls = reactive([]);
    for (let item in files) {
        //console.log(files[item])
        //console.log(files[item].name)                
        urls.push(`${specie.value.id}/${files[item].name}`);
    }
    //Almacenar en la base de datos???
    //console.log(urls)
}
</script>