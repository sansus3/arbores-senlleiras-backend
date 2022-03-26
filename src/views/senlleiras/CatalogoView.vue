<template>
    <section class="section section__catalogo p-2">
        <h2 class="display-6">Catálogo de árboles Senlleiras</h2>
        <the-accordion></the-accordion>
        <!-- Listado de árboles -->
        <catalogo-component></catalogo-component>
        <div v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import CatalogoComponent from '@/components/senlleiras/CatalogoComponent.vue'
import TheAccordion from '@/components/senlleiras/TheAccordion.vue';
import { useStore } from 'vuex';
import { onMounted,ref } from 'vue';

const store = useStore();
const loading = ref(false);
onMounted(async () => {
    try {
        loading.value = true;
        store.dispatch('senlleiras/listSenlleiras');
    } catch (error) {
        console.log('Error CataloComponent.vue', error);
    } finally {
        loading.value = false;
    }
});


</script>