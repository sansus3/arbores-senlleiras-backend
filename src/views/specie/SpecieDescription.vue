<template>
    <article class="section.section__tree">
        
        <template v-if="specie">
        <header class="main__header">
            <h2 class="section__title header__title">{{specie.genus}} {{specie.specie}}</h2>
            <p class="header__description">
            {{specie.names.join()}}
            </p>
        </header>
        <p class="description">
        {{specie.descriptio}}
        </p>
        <img v-for="(ruta,index) in rutas" :key="index" :src="ruta" width="200" alt="">
        </template>
        <div
            v-else
            class="alert alert-danger"
            role="alert"
        >Ha ocurrido un error en la edición de la especie vuelva al catálogo y vuelva a intentarlo</div>
    </article>
</template>

<script>
import { ref, listAll,getDownloadURL  } from "firebase/storage";

import { storage } from "../../firebase.js"
import { mapActions, mapState } from "vuex";
export default {
    created() {
        this.setSpecie(this.$route.params.id);
        this.images();
    },
    data(){
       return {
           rutas: [],
           src: "#"
       }
    },
    computed: {
        ...mapState(['specie']),
    },
    methods: {
        ...mapActions(['setSpecie']),
        cargar(){
            getDownloadURL(ref(storage, this.rutas[0]))
            .then((url) => {
                this.src =url;
                console.log(this.src)
            });
        },
        async images(){
            // Create a reference under which you want to list
            const listRef = ref(storage, this.$route.params.id);
            // Find all the prefixes and items.
            const res = await listAll(listRef)
            //console.log(res)
            res.items.forEach((itemRef) => {
                // All the items under listRef.
                //console.log(itemRef.fullPath)
                (async ()=>{
                    const url = await getDownloadURL(ref(storage, itemRef.fullPath));
                    this.rutas.push(url);
                })()
                
             });
        },
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
                        //console.log(itemRef.fullPath)
                        this.rutas.push(itemRef.fullPath);
                    });
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
        }
    },
}
</script>