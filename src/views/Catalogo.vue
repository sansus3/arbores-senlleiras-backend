<template>
    <section class="section section__catalogo">
        <h2 class="section__title">Catálogo ({{ totalCatalogo }} ejemplares)</h2>
        <div role="alert" v-if="loader.pending">
            {{loader.msg}}
        </div>
        <ul v-else>
            <li v-for="item in arbores" :key="item.id">
                <router-link
                    :to="`/catalogo/${item.id}`"
                >{{ item.genus }} {{ item.specie }} ({{ item.names.join() }})</router-link>
            </li>
        </ul>
    </section>
</template>

<script>
export default {

    mounted() {
        (
            async () => {
                try{
                    this.loader.pending = true;
                    const respuesta = await fetch('https://raw.githubusercontent.com/sansus3/COLABORATIVO_GITHUB/main/species.json');
                    this.arbores = await respuesta.json();
                    this.loader.pending = false;
                }catch(error){
                    this.loader.pending = true;
                    this.loader.msg = error;
                }
            }
        )()
    },
    data() {
        return {
            arbores: {},
            loader: {
                pending: false,
                msg: 'Cargando datos...'
            }
        }
    },
    computed: {

        totalCatalogo() {
            return this.arbores.length
        }
    }
}
</script>