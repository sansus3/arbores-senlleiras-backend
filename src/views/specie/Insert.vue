<template>
    <section class="section container mt-3">
        <h2 class="section__title display-6">Nueva Especie</h2>
        <loader-component :visibleBool="visibleBool"></loader-component>
        <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <formulario-especie @custom-action="actionAlta" :arbore="specie"></formulario-especie>
    </section>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
import FormularioEspecie from "@/components/specie/FormularioEspecie";
import LoaderComponent from "@/components/LoaderComponent.vue";

onMounted(() => {
    store.dispatch('species/resetSpecie');
});

const store = useStore();
const visibleBool = ref(false);
const specie = computed(() => {
    store.state.species.specie.nombres = '';
    return store.state.species.specie
});

const actionAlta = async (arbol) => {
    arbol.id = `sp-${Date.now()}`;
    try {
        //console.log(arbol)
        visibleBool.value = true;
        await store.dispatch('species/insertSpecie', arbol);
    } catch (error) {
        console.log(error);
    } finally {
        visibleBool.value = false;
    }
    
}
</script>