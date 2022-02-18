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
             <div>                
                <storage-firebase :optionsBool="true" :files_uid="$route.params.id"></storage-firebase>
            </div>
        </template>
        <div
            v-else
            class="alert alert-danger"
            role="alert"
        >Ha ocurrido un error en la edición de la especie vuelva al catálogo y vuelva a intentarlo</div>
    </section>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed,onMounted } from "vue";
import StorageFirebase from "@/components/specie/StorageFirebase.vue"
import FormularioEspecie from "@/components/specie/FormularioEspecie";

const store = useStore();
const route = useRoute();

//Cargamos información de la especie
onMounted(()=>{
    store.dispatch('setSpecie', route.params.id);
});     
       
//Obtenemos la data
const specie = computed(() => {
    return store.state.specie;
});
            

//Actualización de la data
const actionActualizacion = especie => {
    store.dispatch('updateSpecie', especie)
}

</script>