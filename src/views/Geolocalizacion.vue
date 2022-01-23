<template>
    <div class="p-2">
        <h2 class="display-3">Geolocalización</h2>
       <geo-location></geo-location>
    </div>
</template>

<script>
   import GeoLocation from "../components/GeoLocation.vue"
   export default {
       components: {
           GeoLocation
       }
   }
</script>