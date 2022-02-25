<template>
    <!-- {{form}} -->
    <div class="container">
       <form-senlleiras></form-senlleiras>
       <storage-senlleiras></storage-senlleiras>       
    </div>
</template>

<script setup>
//Dependencias
import FormSenlleiras from '@/components/senlleiras/FormSenlleiras.vue';
import StorageSenlleiras from '@/components/senlleiras/StorageSenlleiras.vue';
import { useRoute } from 'vue-router';
import { provide } from 'vue';

//Carga de varibles
const route = useRoute();//Obtenemos el identificador de la url
provide('idSenlleira', route.params.id);//Lo almacenamos para la utilización en los componentes hijos
</script>

