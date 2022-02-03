<template>
    {{ $data }}
    <form
        method="post"
        enctype="multipart/form-data"
        action="#"
        v-on:submit.prevent="accionPersonalizada"
    >
        <ul class="fields p-2">
            <li class="field mb-3">
                <label for="formFileMultiple" class="form-label">Multiple files input example</label>
                <input
                    @change="almacenarImagenes($event)"
                    class="form-control"
                    type="file"
                    id="formFileMultiple"
                    accept="image/gif, image/jpeg, image/png"
                    multiple
                />
            </li>
        </ul>
    </form>
</template>

<script>

//import { mapState } from "vuex";

//Firebase

// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import { storage } from '@/firebase';
import { reactive, ref } from "vue";


export default {
    props: {
        arbore: {
            type: Object,
            required: false,

        },
        btntext: {
            type: String,
            required: false,
            default: "Enviar"
        }
    },
    setup(props) {
        const arbol = reactive({});
        if(props.arbore)
        arbol = props.arbore;
        return {
            arbol
        }
    }
}

    // computed: {
    //     ...mapState(['loader', 'specie']),
    //     btnDisabled() {
    //         return !this.arbol.specie.length || !this.arbol.genus.length
    //     },

    // },
    // methods: {
    //     almacenarImagenes(event) {
    //         //this.arbol.files = null; //reseteamos los datos por si acaso
    //         this.arbol.url = `${this.arbol.id}/${event.target.files[0].name}`;
    //         this.files = event.target.files[0];
    //     },
    //     accionPersonalizada() {
    //         if (this.arbol.url.length) {

    //             try {
    //                 const storageRef = ref(storage, this.arbol.url); //creamos una referencia
    //                 // 'file' comes from the Blob or File API
    //                 const file = this.files;

    //                 uploadBytes(storageRef, file).then((snapshot) => {
    //                     console.log('Uploaded a blob or file!');
    //                 });
    //             }
    //             catch (error) {
    //                 console.log(`Error jeje: ${error}`);
    //             }
    //         }
    //         this.joinNames();
    //         this.$emit('customAction', this.arbol)
    //     },



</script>

<style lang="scss" scoped>
ul {
    padding-left: 0;
    list-style-type: none;
}
.field {
    position: relative;
    cursor: help;
    .control-label {
        &::after {
            content: "*";
            color: red;
            position: relative;
        }
        &:hover::before {
            content: attr(data-title);
            position: absolute;
            padding: 0.5rem;
            background-color: rgb(221, 218, 218);
            font-size: 0.8rem;
            color: red;
            font-weight: bold;
            top: -2rem;
            white-space: nowrap;
        }
    }
}
</style>