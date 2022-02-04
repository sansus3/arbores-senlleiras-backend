<template>
     <section class="section section__catalogo p-2">
        <h2 class="display-6">Subida de imágenes de {{$route.params.id}}</h2>
        <template v-if="specie">
            <uploader-image :data="specie"></uploader-image>
        </template>           
    </section>
</template>

<script>


import { mapActions,mapState } from "vuex";
import UploaderImage from '@/components/UploaderImage';


export default {
    created(){
        this.setSpecie(this.$route.params.id); //obtenemos información de la imagen
    },
    computed: {
        ...mapState(['specie'])
    },
    methods: {
        ...mapActions(['setSpecie'])
    },
    components:{
        UploaderImage
    }
   
}
</script>