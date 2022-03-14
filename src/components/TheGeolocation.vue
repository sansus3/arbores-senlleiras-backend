<template>
    <section class="geolocation row">
        <div class="geolocation__field col">
            <label for="latitud" class="form-label">Latitud <span class="text-danger">(Obligatorio)</span></label>
            <input
                required
                id="latitud"
                name="latitud"
                v-model.number="location.latitude"
                type="number"
                placeholder="43.5060736"
                class="field__control form-control"
                step="0.0000001"
            />
        </div>

        <div class="geolocation__field col">
            <label for="longitude" class="form-label">Longitud <span class="text-danger">(Obligatorio)</span></label>
            <input
                required
                id="longitude"
                name="longitude"
                v-model.number="location.longitude"
                type="number"
                placeholder="-8.2051072"
                class="field__control form-control"
                step="0.0000001"
            />
        </div>
        <div class="col-auto">
            <div class="form-label">&nbsp</div>
            <input
                type="button"
                @click="getGeolocation"
                class="btn btn-success d-block"
                value="Geolocalizar"
            />
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
//let geolocationBool = ref(false);
let errorStr = ref("");

const props = defineProps({
    location: {
        type: Object,
        default: () => ({ latitude: null, longitude: null }),
        required: true
    }
});

const getGeolocation = () => {
    if (!window.navigator.geolocation) {
        errorStr.value = "La Geolocalización no está disponible";
        return;
    }
    //geolocationBool.value = true;
    window.navigator.geolocation.getCurrentPosition(
        posicion => {
            props.location.latitude = posicion.coords.latitude;
            props.location.longitude = posicion.coords.longitude;
            //geolocationBool.value = false;
        },
        error => {
            errorStr.value = error.message;
            //geolocationBool.value = false;
        }
    );
}
</script>