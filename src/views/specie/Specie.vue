<template>
    <section class="section">
        <h2 class="section__title display-3">Especie</h2>
         <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <formulario-especie @custom-action="actionAlta"></formulario-especie> 
    </section>
</template>

<script>
import { mapActions } from "vuex";
import FormularioEspecie from "@/components/specie/FormularioEspecie";
export default {
    components: {
        FormularioEspecie
    },
    methods: {
        ...mapActions(['insertSpecie']),
        actionAlta(arbol) {
            //console.log(arbol)
            const l1 = arbol.genus.substr(0,2), l2 = arbol.specie.substr(0,2);
            arbol.id = `${l1.toLowerCase()}${l2.toLowerCase()}${Math.trunc(Math.random() * 100) + 1}`;
            //console.log(arbol.names)
            this.insertSpecie(arbol);
        },
    },
}
</script>