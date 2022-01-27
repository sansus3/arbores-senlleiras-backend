<template>
    <section class="section section__catalogo p-2">
        <h2 class="display-3">Catálogo de árboles</h2>
        <!-- Listado de árbole -->
        <catalogo-arbores></catalogo-arbores>
             
    </section>
</template>

<script>

import CatalogoArbores from "../components/CatalogoArbores"

export default {
    components: {
        CatalogoArbores,
    },    
}
</script>