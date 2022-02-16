<template>
    <section class="section">
        <h2 class="section__title display-3">Nueva Especie</h2>
        <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <formulario-especie @custom-action="actionAlta" :arbore="specie"></formulario-especie>
    </section>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import FormularioEspecie from "@/components/specie/FormularioEspecie";

onMounted(() => {
    store.dispatch('resetSpecie');
});

const store = useStore();

const specie = computed(() => {
    return store.state.specie;
});

const actionAlta = (arbol) => {
    arbol.id = `sp-${Date.now()}`;
    //console.log(arbol)
    store.dispatch('insertSpecie', arbol);
}
</script>