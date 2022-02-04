<template>
     <section class="section section__catalogo p-2">
        <h2 class="display-6">Subida de imágenes de {{$route.params.id}}</h2>
        <template v-if="specie">
            <uploader-image :urlBase="getUrl" @customAction="guardarDatos"></uploader-image>
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
    data(){
        return {
            urls: []
        }
    },
    computed: {
        ...mapState(['specie']),
        getUrl(){
            return `${this.specie.id}/`;
        }
    },
    methods: {
        ...mapActions(['setSpecie']),
        guardarDatos(files){
            this.urls = [];
            for (let item in files) {
                //console.log(files[item])
                //console.log(files[item].name)                
                this.urls.push(`${this.specie.id}/${files[item].name}`);               
            }
            //Almacenar en la base de datos???
            console.log(this.urls)
        }
    },
    components:{
        UploaderImage
    }
   
}
</script>