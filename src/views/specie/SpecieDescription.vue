<template>
    <section class="section.section__tree">
        <h2 class="section__title">Árbol {{ $route.params.id }}</h2>
        <template v-if="specie">{{ getListImages() }}</template>
        <div
            v-else
            class="alert alert-danger"
            role="alert"
        >Ha ocurrido un error en la edición de la especie vuelva al catálogo y vuelva a intentarlo</div>
    </section>
</template>

<script>
import { ref, listAll } from "firebase/storage";

import { storage } from "../../firebase.js"
import { mapActions, mapState } from "vuex";
export default {
    created() {
        this.setSpecie(this.$route.params.id);
    },
    computed: {
        ...mapState(['specie']),
    },
    methods: {
        ...mapActions(['setSpecie']),
        getListImages() {
            
            // Create a reference under which you want to list
            const listRef = ref(storage, this.$route.params.id);

            // Find all the prefixes and items.
            listAll(listRef)
                .then((res) => {
                    res.prefixes.forEach((folderRef) => {
                        console.log(folderRef)
                        // All the prefixes under listRef.
                        // You may call listAll() recursively on them.
                    });
                    res.items.forEach((itemRef) => {
                        // All the items under listRef.
                        console.log(itemRef.fullPath)
                    });
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
        }
    },
}
</script>