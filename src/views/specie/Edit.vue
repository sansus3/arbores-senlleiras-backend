<template>
    <section class="section">
        <h2 class="section__title display-3">Edición de Especie</h2>
        <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <crud-arbore @custom-action="actionActualizacion" :arbore="specie" btntext="Actualizar"></crud-arbore>
    </section>
</template>

<script>
import {mapActions,mapState} from "vuex";
import CrudArbore from "@/components/CrudArbore";
export default {
    created(){
        this.setSpecie(this.$route.params.id);
    },   
    computed:{
        ...mapState(['specie'])
    },
    methods: {
        ...mapActions(['setSpecie','updateSpecie']),
        actionActualizacion(especie){
            //console.log(especie.names);
            this.updateSpecie(especie);
        }
    },
    components: {
        CrudArbore
    }
}
</script>