<template>
    <section class="section">
        <h2 class="section__title display-3">Especie</h2>
         <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <crud-arbore @custom-action="actionAlta"></crud-arbore> 
    </section>
</template>

<script>
import { mapActions } from "vuex";
import CrudArbore from "@/components/CrudArbore";
export default {
    components: {
        CrudArbore
    },
    methods: {
        ...mapActions(['insertSpecie']),
        actionAlta(arbol) {
            //console.log(arbol)
            arbol.id = Math.trunc(Math.random() * 100) + 1;
            arbol.names = arbol.names.split(',');
            this.insertSpecie(arbol);
        },
    },
}
</script>