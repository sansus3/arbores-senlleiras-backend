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
                <storage-firebase :files_uid="$route.params.id"></storage-firebase>
            </div>
        </section>
    </article>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import StorageFirebase from "@/components/specie/StorageFirebase.vue"

const route = useRoute();
const store = useStore();



const specie = computed(() => store.state.specie);

onMounted(() => {
    store.dispatch('setSpecie', route.params.id);
});
</script>