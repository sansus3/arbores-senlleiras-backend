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
                <tr v-for="item in species" :key="item.id">
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
        this.getListadoEspecies();
    },
    components: {
        LoaderComponent
    },
    computed: {
        ...mapState(['species','loader']),
        totalCatalogo() {
            return this.species?this.species.length:0;
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
ul {
    padding-left: 0;
    list-style-type: none;
}
</style>