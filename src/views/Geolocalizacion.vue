<template>
    <div>
        Geolocalización
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