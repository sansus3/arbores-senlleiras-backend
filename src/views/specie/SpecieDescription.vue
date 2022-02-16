<template>
    <article v-if="specie" class="bd-cheatsheet container-fluid bg-body">
        <header>
            <h2 class="fw-bold pt-3 pt-xl-5 pb-2 pb-xl-3">{{ specie.genus }} {{ specie.specie }}</h2>
        </header>
        <section class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
            <h3>{{ specie.names.join(', ') }}</h3>
            <a
                class="d-flex align-items-center"
                :href="`https://www.google.com/search?q=${specie.genus}+${specie.specie}`"
            >Más información</a>
            <p class="lead">{{ specie.descriptio }}</p>
            <div>
                <img
                    class="rounded mx-auto img-fluid"
                    v-for="(ruta, index) in rutas"
                    :key="index"
                    :src="ruta"
                    width="200"
                />
            </div>
        </section>
    </article>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted, reactive, computed } from "vue";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/hooks/firebase.js";

const route = useRoute();
const store = useStore();

let rutas = reactive([]);
let src = "#";

const specie = computed(() => store.state.specie);

onMounted(() => {
    store.dispatch('setSpecie', route.params.id);
    loadImages();
});


const loadImages = async () => {
    // Create a reference under which you want to list
    const listRef = ref(storage, route.params.id);
    // Find all the prefixes and items.
    const res = await listAll(listRef)
    //console.log(res)
    res.items.forEach((itemRef) => {
        // All the items under listRef.
        //console.log(itemRef.fullPath)
        (async () => {
            const url = await getDownloadURL(ref(storage, itemRef.fullPath));
            rutas.push(url);
        })()

    });
}

</script>