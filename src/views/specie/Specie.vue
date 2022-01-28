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
            const l1 = arbol.genus.charAt(0), l2 = arbol.specie.charAt(0);
            arbol.id = `${l1.toLowerCase()}${l2.toLowerCase()}${Math.trunc(Math.random() * 100) + 1}`;
            //console.log(arbol.names)
            this.insertSpecie(arbol);
        },
    },
}
</script>