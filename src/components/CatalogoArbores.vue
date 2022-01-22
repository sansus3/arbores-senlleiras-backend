<template>
    <div role="alert" v-if="loader.pending">{{ loader.msg }}</div>
    <section v-else class="section section__catalogo">
        <h3 class="section__title">Ejemplares ({{ totalCatalogo }})</h3>
        <ul>
            <li v-for="item in arbores" :key="item.id">
                <router-link
                    :to="`/arbore/${item.id}`"
                >{{ item.genus }} {{ item.specie }} ({{ item.names.join() }})</router-link>
            </li>
        </ul>
    </section>
</template>

<script>
import { mapActions, mapState } from "vuex"
export default {
    mounted() {
        this.getListadoArbores();
    },
    computed: {
        ...mapState(['listadoArbores']),
        totalCatalogo() {
            return this.listadoArbores.arbores.length;
        },
        arbores(){
            const {arbores} = this.listadoArbores;
            return arbores;
        },
        loader(){
            const {loader} = this.listadoArbores;
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