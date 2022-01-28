<template>
    <loader-component :text="loader.msg" :visibleBool="loader.pending"></loader-component>
    <table class="table table-striped">
        <caption>Ejemplares: {{ totalCatalogo }}</caption>
        <thead>
            <tr>
                <th scope="col">Código</th>
                <th scope="col">Género</th>
                <th scope="col">Especie</th>
                <th scope="col">Nombres comunes</th>
                <th scope="col">Opciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in species" :key="item.id">
                <th scope="row">{{ item.id }}</th>
                <td>
                    <router-link :to="`/specie/specie-${item.id}`">{{ item.genus }}</router-link>
                </td>
                <td>{{ item.specie }}</td>
                <td>{{ item.names.join() }}</td>
                <td>
                    <router-link
                        class="text-decoration-none"
                        :to="{
                            name: 'Edit',
                            params: {
                                id: item.id
                            }
                        }"
                    >
                       
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-vector-pen"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"
                            />
                            <path
                                fill-rule="evenodd"
                                d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"
                            />
                        </svg>                  
                    </router-link>
                    <a href="#" @click.prevent="deleteId(item.id)">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                            />
                            <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                        </svg>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import LoaderComponent from './LoaderComponent';
import { mapActions, mapState } from "vuex";
export default {
    components: {
        LoaderComponent
    },
    computed: {
        ...mapState(['species', 'loader']),
        totalCatalogo() {
            return this.species ? this.species.length : 0;
        },
    },
    methods: {
        ...mapActions(['deleteSpecie']),
        deleteId(id){
            if(confirm(`¿Desea eliminar el item ${id}`))
                this.deleteSpecie(id);
        }
    },
}
</script>

<style lang="scss" scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
ul {
    padding-left: 0;
    list-style-type: none;
}
</style>