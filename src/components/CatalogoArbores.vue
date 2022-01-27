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
                    <router-link class="text-decoration-none" :to="`/specie/edit-${item.id}`">                    
                        Editar
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
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import LoaderComponent from './LoaderComponent';
import { mapActions, mapState } from "vuex";
export default {
    mounted() {
        this.getListadoEspecies();
    },
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
        ...mapActions(
            ['getListadoEspecies']
        )
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