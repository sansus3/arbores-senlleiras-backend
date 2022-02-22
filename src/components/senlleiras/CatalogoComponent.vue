<template>
    <div class="table-responsive">
        <table class="table table-striped">
            <caption>Ejemplares: {{ totalCatalogo }}</caption>
            <thead>
                <tr>
                    <th scope="col">
                        <a @click.prevent href="#">Nombre Científico</a>
                        <i class="bi"></i>
                    </th>
                    <th scope="col">
                        <a @click.prevent href="#">Especie</a>
                        <i class="bi"></i>
                    </th>
                    <th scope="col">Nombres comunes</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                 <tr v-for="item in senlleirasFilter" :key="item.id">
                    <td>
                        {{item.genus}} {{item.specie}}
                    </td>
                    <td>dos</td>
                    <td>tres</td>
                    <td>cuatro</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
onMounted(async () => {
    try {
        store.dispatch('senlleiras/listSenlleiras');
    } catch (error) {
        console.log(error);
    } finally {

    }
});
//Datos filtrados
// const senlleirasFilter = computed(() => {
//     return species.value.filter(item => {
//         return item.genus.toLowerCase().includes(search.value.toLowerCase())
//             || item.specie.toLowerCase().includes(search.value.toLowerCase())
//             || item.names.join().toLowerCase().includes(search.value.toLowerCase())
//     })
// });
//Elementos computados
const senlleirasFilter = computed(() => store.state.senlleiras.senlleiras);
console.log(senlleirasFilter.value)
const totalCatalogo = computed(() => senlleirasFilter.value ? senlleirasFilter.value.length : 0);

</script>