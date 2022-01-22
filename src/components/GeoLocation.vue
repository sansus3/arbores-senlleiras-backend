<template>
    <section>
        <!-- Componente de carga -->
        <loader-component text="Cargando..." :visibleBool="geolocationBool"></loader-component>

        <div v-if="errorStr" class="alert alert-danger" role="alert">{{ errorStr }}</div>

        <div
            v-if="location"
            class="alert alert-secondary"
            role="alert"
        >Latitud {{ location.latitude }}, Longitud: {{ location.longitude }}</div>

        <button class="btn btn-dark" @click="getGeolocation" type="submit">Enviar</button>
    </section>
</template>

<script>
import LoaderComponent from './LoaderComponent'
export default {
    name: 'GeoLocation',
    components: {
        LoaderComponent
    },
    data() {
        return {
            location: null,
            geolocationBool: false,
            errorStr: ''
        }
    },
    methods: {
        getGeolocation() {
            if (!window.navigator.geolocation) {
                this.errorStr = "La Geolocalización no está disponible";
                return;
            }
            this.geolocationBool = true;
            window.navigator.geolocation.getCurrentPosition(
                posicion => {
                    this.location = {
                        latitude: posicion.coords.latitude,
                        longitude: posicion.coords.longitude,
                    }
                    this.geolocationBool = false;
                },
                error => {
                    this.errorStr = error.message;
                    this.geolocationBool = false;
                }
            );
        }
    },
}
</script>