<template>
    <section class="section">
        <h2 class="section__title display-3">Edición de Especie</h2>
        <!-- Create Read Update Delete (Crud) Árboles. Formulario -->
        <crud-arbore :arbore="lala" btntext="Actualizar"></crud-arbore>
    </section>
</template>

<script>
import CrudArbore from "@/components/CrudArbore";
export default {
    data() {
        return {
            lala: {
                id: null,
                specie: 'lala',
                genus: 'jeje',
                names: 'papa',
                descriptio: ''
            }
        }
    },
    components: {
        CrudArbore
    }
}
</script>