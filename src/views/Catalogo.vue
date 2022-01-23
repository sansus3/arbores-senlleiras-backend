<template>
    <section class="section section__catalogo p-2">
        <h2 class="display-3">Catálogo de árboles</h2>
        <!-- Listado de árbole -->
        <catalogo-arbores></catalogo-arbores>
        <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <crud-arbore></crud-arbore>       
    </section>
</template>

<script>

import CatalogoArbores from "../components/CatalogoArbores"
import CrudArbore from "../components/CrudArbore";
export default {
    components: {
        CatalogoArbores,
        CrudArbore
    },    
}
</script>