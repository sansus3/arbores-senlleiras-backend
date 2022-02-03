<template>
    <section class="section">
        <h2 class="section__title display-3">Edición de Especie</h2>
        <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <template v-if="specie">
            <formulario-especie
                @custom-action="actionActualizacion"
                :arbore="specie"
                btntext="Actualizar"
            ></formulario-especie>
        </template>
        <div
            v-else
            class="alert alert-danger"
            role="alert"
        >Ha ocurrido un error en la edición de la especie vuelva al catálogo y vuelva a intentarlo</div>
    </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FormularioEspecie from "@/components/specie/FormularioEspecie";
export default {
    created() {
        this.setSpecie(this.$route.params.id);
    },
    computed: {
        ...mapState(['specie'])
    },
    methods: {
        ...mapActions(['setSpecie', 'updateSpecie']),
        actionActualizacion(especie) {
            //console.log(especie);
            this.updateSpecie(especie);
        }
    },
    components: {
        FormularioEspecie
    }
}
</script>