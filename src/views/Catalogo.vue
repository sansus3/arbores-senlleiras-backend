<template>
    <section class="section section__catalogo p-2">
        <h2 class="display-3">Catálogo de árboles</h2>
        <catalogo-arbores></catalogo-arbores>
        <form action="#" v-on:submit.prevent>
            <ul class="fields p-2">
                <li class="field mb-3">
                    <label for="specie" class="form-label">Especie</label>
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
                    <label for="genus" class="form-label">Género</label>
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
                    <label for="names" class="form-label">Nombres</label>
                    <input
                        id="names"
                        name="names"
                        v-model.trim="arbol.names"
                        type="text"
                        placeholder="Nombres separados con comas"
                        class="field__control form-control"
                    />
                </li>

                <li class="mb-3">
                    <button
                        class="btn btn-dark"
                        @click="actionAlta"
                        :disabled="btnDisabled"
                    >Añadir</button>
                </li>
            </ul>
        </form>
    </section>
</template>

<script>
import {mapActions} from "vuex";
import CatalogoArbores from "../components/CatalogoArbores"
export default {
    components: {
        CatalogoArbores
    },
    data(){
        return {
            arbol: {
                id: null,
                specie: '',
                genus: '',
                names: '',
            },
            
        }
    },
    computed:{
        btnDisabled(){
            return !this.arbol.specie.length || !this.arbol.genus.length
        }
    },
    methods: {
        ...mapActions(['setArbol']),
        actionAlta(){
            this.arbol.id = Math.trunc(Math.random()*100)+1;
            this.arbol.names = this.arbol.names.split(',');
            this.setArbol(this.arbol);
            //reseteamos arbol
            this.arbol = {
                id: null,
                specie: '',
                genus: '',
                names: '',
            }

        }
    },
}
</script>

<style scoped>
ul{
    padding-left: 0;
    list-style-type: none;
}
</style>