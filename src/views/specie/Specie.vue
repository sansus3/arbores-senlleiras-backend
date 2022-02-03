<template>
    <section class="section">
        <h2 class="section__title display-3">Nueva Especie</h2>
         <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <formulario-especie @custom-action="actionAlta" :arbore="specie"></formulario-especie> 
    </section>
</template>

<script>
import { mapActions,mapState } from "vuex";
import FormularioEspecie from "@/components/specie/FormularioEspecie";

export default {
    components: {
        FormularioEspecie
    },
    created(){
        this.resetSpecie();
        //console.log(this.specie)
    }, 
    computed:{
        ...mapState(['specie'])
    },
    methods: {
        ...mapActions(['resetSpecie','insertSpecie']),
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