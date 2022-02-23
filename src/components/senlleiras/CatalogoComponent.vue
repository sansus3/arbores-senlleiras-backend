<template>
    <div class="table-responsive">
        <table class="table table-success table-striped">
            <caption>Ejemplares: {{ totalCatalogo }}</caption>
            <thead>
                <tr>
                    <th scope="col">
                        <a @click.prevent href="#">Nombre Científico</a>
                        <i class="bi"></i>
                    </th>
                    <th scope="col">
                        <a @click.prevent href="#">Referencia</a>
                        <i class="bi"></i>
                    </th>
                    <th scope="col">Localización</th>
                    <th scope="col" v-if="!isLogin">Opciones</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="!isLogin">
                    <tr v-for="item in senlleirasFilter" :key="item.id">
                        <td>{{ item.genus }} {{ item.specie }}</td>
                        <td>{{ item.nombreArbol }}</td>
                        <td>
                            Latitud: {{ item.location.latitude }}
                            <br />
                            Longitud: {{ item.location.longitude }}
                        </td>
                        <td>
                            <a
                                @click.prevent="confirmToggle({ id: item.id, confirm: !item.confirmado })"
                                href="#"
                            >
                                <i
                                    class="bi"
                                    :class="{ 'bi-eye': item.confirmado, 'bi-eye-slash': !item.confirmado }"
                                ></i>
                                {{item.confirmado}}
                            </a>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="item in senlleirasFilter" :key="item.id">
                        <td>{{ item.genus }} {{ item.specie }}</td>
                        <td>{{ item.nombreArbol }}</td>
                        <td>
                            Latitud: {{ item.location.latitude }}
                            <br />
                            Longitud: {{ item.location.longitude }}
                        </td>                        
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const isLogin = computed(() => {
    return store.state.users.user === null;
});

onMounted(async () => {
    try {
        store.dispatch('senlleiras/listSenlleiras');
    } catch (error) {
        console.log(error);
    } finally {

    }
});

//Elementos computados
const senlleirasFilter = computed(() => store.state.senlleiras.senlleiras);

const totalCatalogo = computed(() => senlleirasFilter.value ? senlleirasFilter.value.length : 0);
//Métodos
const confirmToggle = async (obj) => {
    try {
        await store.dispatch('senlleiras/confirmToggle', obj)
    } catch (error) {
        console.log(error);
    }

}
</script>