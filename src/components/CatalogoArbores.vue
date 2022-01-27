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
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in arbores" :key="item.id">
                    <th scope="row">{{ item.id }}</th>
                    <td>
                        <router-link :to="`/specie/specie-${item.id}`">{{ item.genus }}</router-link>
                    </td>
                    <td>{{ item.specie }}</td>
                    <td>{{ item.names.join() }}</td>
                </tr>
            </tbody>
        </table>
</template>

<script>
import LoaderComponent from './LoaderComponent';
import { mapActions, mapState } from "vuex";
export default {
    mounted() {
        this.getListadoArbores();
    },
    components: {
        LoaderComponent
    },
    computed: {
        ...mapState(['listadoArbores']),
        totalCatalogo() {
            return this.listadoArbores.arbores?this.listadoArbores.arbores.length:0;
        },
        arbores() {
            const { arbores } = this.listadoArbores;
            return arbores;
        },
        loader() {
            const { loader } = this.listadoArbores;
            return loader;
        }
    },
    methods: {
        ...mapActions(
            ['getListadoArbores']
        )
    },
}
</script>

<style lang="scss" scoped>
ul {
    padding-left: 0;
    list-style-type: none;
}
</style>