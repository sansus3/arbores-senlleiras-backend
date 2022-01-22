<template>
    <form action="#" v-on:submit.prevent>
    <ul class="fields p-2">
        <li class="field mb-3">
        <!-- form-control viene de bootstrap -->
            <label 
            for="nombre"
            class="form-label">Nombre</label>
            <input
            id="nombre"
            name="nombre"
            v-model.trim="contacto.nombre" 
            type="text"
            placeholder="Su nombre aquí"
            class="field__control form-control">
        </li>

        <li class="field mb-3">
            <label 
            for="apellidos"
            class="form-label">Apellidos</label>
            <input
            id="apellidos"
            name="apellidos"
            v-model.trim="contacto.apellidos" 
            type="text"
            placeholder="Sus apellidos aquí"
            class="field__control form-control">
        </li>

        <li class="field mb-3">
            <label 
            for="edad"
            class="form-label">Edad</label>
            <input
            name="edad"
            v-model.number="contacto.edad" 
            type="range"
            min="0"
            max="100"
            step="1"
            id="edad"
            placeholder="Su edad aquí"
            class="field__control form-range">
        </li>
       
        <li class="mb-3">
            <button class="btn btn-dark" @click="actionEnviar" :disabled="btnDisabled">Enviar</button>
        </li>
    </ul>
    </form>
</template>

<script>
export default {
    data(){
        return {
            contacto: {
                nombre: '',
                apellidos: '',
                edad: 0
            },
        }
    },
    computed: {
        btnDisabled(){
            return this.contacto.nombre.length && this.contacto.apellidos.length?false:true;
        }
    },
    methods: {
        actionEnviar(){
            console.log(this.contacto)
        }
    },
}
</script>

<style scoped lang="scss">
$form-range-track-width: 50%;
ul{
    padding-left: 0;
    list-style-type: none;
}
</style>