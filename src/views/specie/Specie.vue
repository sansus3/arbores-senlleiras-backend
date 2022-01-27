<template>
    <section class="section">
        <h2 class="section__title display-3">Especie</h2>
         <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <crud-arbore></crud-arbore> 
    </section>
</template>

<script>
import CrudArbore from "@/components/CrudArbore";
export default {
    components: {
        CrudArbore
    }
}
</script>