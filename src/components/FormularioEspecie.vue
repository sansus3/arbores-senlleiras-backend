<template>
     <loader-component text="loader.msg" :visibleBool="loader.pending"></loader-component>
    <form action="#" v-on:submit.prevent="accionPersonalizada">
        <ul class="fields p-2">
            <li class="field mb-3">
                <label
                    data-title="⚠ Campo obligatorio"
                    for="genus"
                    class="form-label control-label"
                >Género</label>
                <input
                    id="genus"
                    name="genus"
                    v-model.trim="arbol.genus"
                    type="text"
                    placeholder="Género aquí"
                    class="field__control form-control"
                />
            </li>

            <li class="field mb-3">
                <label
                    data-title="⚠ Campo obligatorio"
                    for="specie"
                    class="form-label control-label"
                >Especie</label>
                <input
                    id="specie"
                    name="specie"
                    v-model.trim="arbol.specie"
                    type="text"
                    placeholder="Especie aquí"
                    class="field__control form-control"
                />
            </li>

            <li class="field mb-3">
                <label for="names" class="form-label">Nombres</label>
                <input
                    id="names"
                    name="names"
                    v-model.trim="names"
                    type="text"
                    placeholder="Nombres separados con comas"
                    class="field__control form-control"
                />
            </li>

            <li class="field mb-3">
                <label for="descriptio" class="form-label">Descripción</label>
                <textarea
                    v-model.trim="arbol.descriptio"
                    class="form-control"
                    id="descriptio"
                    rows="3"
                ></textarea>
            </li>

            <li class="mb-3">
                <button class="btn btn-dark" :disabled="btnDisabled">{{btntext}}</button>
            </li>
        </ul>
    </form>
</template>

<script>
import LoaderComponent from '@/components/LoaderComponent';
import { mapState } from "vuex";
//objeto literal árbol para el v-model del formulario
const Arbol = {
    id: null,
    specie: '',
    genus: '',
    names: [],
    descriptio: ''
}
export default {
    components: {
        LoaderComponent
    },
    data(){
        return {
            arbol: this.arbore,
            names: ''
        }
    },
    props: {
        arbore: {
            type: Object,
            required: false,
            default(){
                return Arbol;
            }
        },
        btntext: {
            type: String,
            required: false,
            default: "Enviar"
        }
    },
    computed: {
        ...mapState(['loader']),
        btnDisabled() {
            return !this.arbol.specie.length || !this.arbol.genus.length
        },
        
    },
    emits: ['customAction'],
    methods: {
        accionPersonalizada(){
            this.joinNames();
            this.$emit('customAction',this.arbol)
        },
        joinNames(){
            this.arbol.names = this.names.split(',');
        }
        
    },
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