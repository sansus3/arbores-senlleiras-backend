<template>
    <div class="table-responsive">
        <!-- {{senlleirasFilter}} -->
        <table class="table table-success table-striped">
            <caption>Exemplares: {{ totalCatalogo }}</caption>
            <thead>
                <tr>
                    <th scope="col">
                        <a 
                            href="#"
                            @click.prevent="ordenar({'campo':'nombreReferencia','a-z':sw})">
                            Nome
                        </a>
                    </th>
                    <th scope="col">
                       <a 
                            href="#"
                            @click.prevent="ordenar({'campo':'email','a-z':sw})">
                            Correo
                        </a>
                    </th>
                    <th scope="col">Localización</th>
                    <th scope="col" v-if="!isLogin">Opcións</th>
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
    </div>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const idTmp = ref('');
const sw = ref(false);
const confirmadoBool = ref(false);
const isLogin = computed(() => {
    return store.state.users.user === null;
});



//Elementos computados
const senlleirasFilter = computed(() => store.getters['senlleiras/getSenlleirasFiltradas']);
const totalCatalogo = computed(() => senlleirasFilter.value ? senlleirasFilter.value.length : 0);
const confirmado = bool => !bool ? 'Sin confirmar' : 'Confirmado';
//Métodos

const ordenar = order => {
    sw.value=!sw.value;
    order['a-z']=!sw.value;
    store.dispatch('senlleiras/ordenarSenlleiras',order);
}

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