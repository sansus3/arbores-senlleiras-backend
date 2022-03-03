<template>
    <div class="table-responsive">
        <!-- {{senlleirasFilter}} -->
        <table class="table table-success table-striped">
            <caption>Ejemplares: {{ totalCatalogo }}</caption>
            <thead>
                <tr>
                    <th scope="col">
                        Nombre
                    </th>
                    <th scope="col">
                       Correo
                    </th>
                    <th scope="col">Localización</th>
                    <th scope="col" v-if="!isLogin">Opciones</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="!isLogin">
                    <tr v-for="item in senlleirasFilter" :key="item.id">
                        <td>{{ item.nombreReferencia }}, {{item.nombreComun}} ({{item.genus}} {{ item.specie }})</td>
                        <td>{{item.email}}</td>
                        <td>
                            Latitud: {{ item.location.latitude }}
                            <br />
                            Longitud: {{ item.location.longitude }}
                        </td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button
                                    @click="confirmToggle({ id: item.id, confirm: !item.confirmado })"
                                    type="button"
                                    style="width: 8em !important;"
                                    class="btn btn-sm"
                                    :class="{
                                        'btn-primary': item.confirmado,
                                        'btn-secondary': !item.confirmado,
                                        'text-decoration-line-through': !item.confirmado
                                    }"
                                >
                                <span v-if="confirmadoBool && idTmp===item.id" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                {{ confirmado(item.confirmado) }}</button>
                                <router-link
                                    :to="{
                                        name: 'EditSenlleira',
                                        params: {
                                            id: item.id
                                        }
                                    }"
                                    class="btn btn-sm btn-info ms-2"
                                >Editar</router-link>
                                <router-link
                                    :to="{
                                        name: 'DeleteSenlleira',
                                        params: {
                                            id: item.id
                                        }
                                    }"
                                    class="btn btn-sm btn-danger ms-2"
                                >Eliminar</router-link>
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="item in senlleirasFilter" :key="item.id">
                        <td>{{ item.nombreReferencia }}, {{item.nombreComun}} ({{item.genus}} {{ item.specie }})</td>
                        <td>{{item.email}}</td>
                        <td>
                            Latitud: {{ item.location.latitude }}
                            <br />
                            Longitud: {{ item.location.longitude }}
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const loading = ref(false);
const idTmp = ref('');
const confirmadoBool = ref(false);
const isLogin = computed(() => {
    return store.state.users.user === null;
});

onMounted(async () => {
    try {
        loading.value = true;
        store.dispatch('senlleiras/listSenlleiras');
    } catch (error) {
        console.log('Error CataloComponent.vue',error);
    } finally {
        loading.value = false;
    }
});

//Elementos computados
const senlleirasFilter = computed(() => store.state.senlleiras.senlleiras);

const totalCatalogo = computed(() => senlleirasFilter.value ? senlleirasFilter.value.length : 0);
//Métodos
const confirmado = bool => !bool ? 'Sin confirmar' : 'Confirmado';
const confirmToggle = async (obj) => {
    try {
        confirmadoBool.value=true;
        idTmp.value = obj.id;
        await store.dispatch('senlleiras/confirmToggle', obj)
    } catch (error) {
        console.log(error);
    } finally {
        confirmadoBool.value=false;
    }

}
</script>