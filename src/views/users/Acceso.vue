<template>
    <section class="section container">
        <h2 class="section__title display-3">Acceso</h2>
        <loader-component :visibleBool="loader.pending"></loader-component>
        <template v-if="loader.pending">
            {{loader.msg}}
        </template>
        <form-user></form-user>
    </section>
</template>

<script>
import {mapState} from "vuex"
import LoaderComponent from "@/components/LoaderComponent"
import FormUser from "@/components/users/FormUser"

export default {
   components: {
       FormUser,
       LoaderComponent
   },
   computed: {
       ...mapState(['loader'])
   }
}
</script>