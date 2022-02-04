<template>
    <form method="post" enctype="multipart/form-data" action="#" v-on:submit.prevent="subirFicheros">
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
                {{filesName.join(', ')}}
            </li>
             <li class="mb-3">
                <button class="btn btn-dark" :disabled="btnDisabled">{{ btnText }}</button>
            </li>
        </ul>
    </form>
</template>

<script>
import { reactive,computed } from "vue";
import { ref,uploadBytes  } from "firebase/storage";
import { storage } from "@/firebase";
export default {
    props: {
        data: {
            type: Object,
            required: false
        },
        btnText: {
            type: String,
            require: false,
            default: 'Subir'
        },
    },
    setup(props) {
        console.log(props.data)
        
        let files = reactive({});
        let filesName = reactive([]);

        
        //Métodos 
        const almacenarImagenes = event => {
            console.clear();            //this.arbol.url = `${this.arbol.id}/${event.target.files[0].name}`;
            //files = event.target.files; //Objeto de tipo FileList. Ver https://developer.mozilla.org/en-US/docs/Web/API/FileList
            Object.assign(files,event.target.files);//Para no perder la reactividad del objeto
            console.log(files)
            filesName.splice(0,filesName.length);//reseteamos array sin peder reactividad
            for (let item in files) {
                console.log(files[item])
                console.log(files[item].name)                
                filesName.push(files[item].name);               
            }
            // files = event.target.files;
            // //console.log(files)
            // for(let element in files){
            //     console.log(element.item)
            // }
            //console.log(filesName)
        }
        const subirFicheros = () => {
            //Subida de ficheros físicos            
            for (let item in files) {
                const storageRef = ref(storage, `${props.data.id}/${files[item].name}`); //creamos una referencia
                uploadBytes(storageRef, files[item]).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                });
                console.log(files[item])               
            }
        }
        //Propiedades computadas       
        const btnDisabled = computed(() => !files[0]);
        return {
            btnDisabled,
            almacenarImagenes,
            filesName,
            subirFicheros
        }
        // accionPersonalizada() {
        //     if (this.arbol.url.length) {

        //         try {
        //             const storageRef = ref(storage, this.arbol.url); //creamos una referencia
        //             // 'file' comes from the Blob or File API
        //             const file = this.files;

        //             uploadBytes(storageRef, file).then((snapshot) => {
        //                 console.log('Uploaded a blob or file!');
        //             });
        //         }
        //         catch (error) {
        //             console.log(`Error jeje: ${error}`);
        //         }
        //     }
        //     this.joinNames();
        //     this.$emit('customAction', this.arbol)
        // },
    }
}
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