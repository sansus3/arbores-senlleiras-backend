<template>
    <section>
    <div v-if="gettingLocation">
        Consiguiendo la geolocalización
    </div>
    <div v-if="location">
    Latitud {{location.latitude}}, Longitud: {{location.longitude}}
    </div>
    {{ errorStr }}
    </section>
</template>

<script>
export default {
    name: 'GeoLocation',
    created() {
        if (!window.navigator.geolocation) {
            this.errorStr = "La Geolocalización no está disponible";
            return;
        }
        this.gettingLocation = true;
        window.navigator.geolocation.getCurrentPosition(
            posicion => {
                this.location = {
                    latitude: posicion.coords.latitude,
                    longitude: posicion.coords.longitude,
                }
                this.gettingLocation = false;
            },
            error => {
                this.errorStr = error
                this.gettingLocation = false;
            }
        );
    },
    data() {
        return {
            location: null,
            gettingLocation: false,
            errorStr: null
        }
    }
}
</script>