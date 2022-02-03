<template>
    <section>
        <!-- Componente de carga -->
        <loader-component text="Cargando..." :visibleBool="geolocationBool"></loader-component>

        <div v-if="errorStr" class="alert alert-danger" role="alert">{{ errorStr }}</div>

        <div
            class="alert alert-secondary"
            role="alert"
            v-if="location.latitude"
        >Latitud {{ location.latitude }}, Longitud: {{ location.longitude }}</div>

        <button class="btn btn-dark" @click="getGeolocation" type="submit">Geolocalizar</button>

        <form action="#" v-on:submit.prevent>
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
                        v-model.trim="form.genus"
                        type="text"
                        placeholder="Género aquí"
                        class="field__control form-control"
                        pattern=".{3,}"
                        title="Mínimo 3 caracteres"
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
                        v-model.trim="form.specie"
                        type="text"
                        placeholder="Especie aquí"
                        class="field__control form-control"
                        pattern=".{3,}"
                        title="Mínimo 3 caracteres"
                    />
                </li>

                <li class="field mb-3">
                    <label for="latitud" class="form-label">Latitud</label>
                    <input
                        id="latitud"
                        name="latitud"
                        v-model.trim="location.latitude"
                        type="text"
                        placeholder="43.5060736"
                        class="field__control form-control"
                    />
                </li>

                <li class="field mb-3">
                    <label for="longitude" class="form-label">Longitud</label>
                    <input
                        id="longitude"
                        name="longitude"
                        v-model.trim="location.longitude"
                        type="text"
                        placeholder="-8.2051072"
                        class="field__control form-control"
                    />
                </li>

                <li class="field mb-3">
                    <label for="descriptio" class="form-label">Descripción</label>
                    <textarea
                        v-model.trim="form.descriptio"
                        class="form-control"
                        id="descriptio"
                        rows="3"
                    ></textarea>
                </li>

                <li class="mb-3">
                    <button class="btn btn-dark" :disabled="btnDisabled">{{ btntext }}</button>
                </li>
            </ul>
        </form>
    </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';//ref:Válido para datos primitivos (números, strings o booleanos); reactive par objetos y arrays
import LoaderComponent from './LoaderComponent'
//Variables
const location = reactive(
    {
        latitude: null,
        longitude: null
    });

let btntext = ref('Enviar');
let geolocationBool = ref(false);
let errorStr = ref('');
const form = reactive({
    genus: '',
    specie: '',
    descriptio: ''
});

//Métodos
const getGeolocation = () => {
    if (!window.navigator.geolocation) {
        errorStr.value = "La Geolocalización no está disponible";
        return;
    }
    geolocationBool.value = true;
    window.navigator.geolocation.getCurrentPosition(
        posicion => {
            location.latitude = posicion.coords.latitude;
            location.longitude = posicion.coords.longitude;
            geolocationBool.value = false;
        },
        error => {
            errorStr.value = error.message;
            geolocationBool.value = false;
        }
    );
}
//Propiedad computada
const btnDisabled = computed(
    () => {
        return form.genus.length < 3 || form.specie.length < 3;
    }
);
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