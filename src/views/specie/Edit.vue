<template>
    <section class="section container mt-3">
        <h2 class="section__title display-6">Edición de Especie</h2>
        <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <template v-if="specie">
            <formulario-especie
                @custom-action="actionActualizacion"
                :arbore="specie"
                btntext="Actualizar"
                :spinner="visibleBool"
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
import { computed,onMounted,ref } from "vue";
import StorageFirebase from "@/components/specie/StorageFirebase.vue"
import FormularioEspecie from "@/components/specie/FormularioEspecie";

const store = useStore();
const route = useRoute();
const visibleBool = ref(false);

//Cargamos información de la especie
onMounted(()=>{
    store.dispatch('species/setSpecie', route.params.id);
    //console.log(store.state.species.specie)

});     
       
//Obtenemos la data
const specie = computed(() => {
    store.state.species.specie.nombres = store.state.species.specie.names.join();
    return store.state.species.specie;
});

            

//Actualización de la data
const actionActualizacion = async(especie) => {
    try {
        visibleBool.value = true;
        delete especie.nombres;
        //console.log(especie)
        await store.dispatch('species/updateSpecie', especie);
    } catch (error) {
        console.log(error);
    } finally {
          visibleBool.value = false;
    }
    
}
</script>