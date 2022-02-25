<template>
    <article class="bd-cheatsheet container bg-body">
        <header>
            <h2 class="fw-bold pt-3 pt-xl-3 pb-2 pb-xl-3">Eliminación de senlleira</h2>
        </header>
        <section class="bd-heading sticky-xl-top align-self-start mt-3 mb-3 mt-xl-0 mb-xl-2">
            <h3>{{senlleira.id}} - {{ senlleira.nombreReferencia }}</h3>
            <ul>
                <li>{{ senlleira.genus }} {{ senlleira.specie }}</li>
                <li>{{ senlleira.nombreComun }}</li>
                <li>
                    Datos del usuario
                    <ul>
                        <li>Nombre: {{ senlleira.nombrePila }} {{ senlleira.apellidos }}</li>
                        <li>Correo: {{ senlleira.email }}</li>
                    </ul>
                </li>
                <li>
                    Datos Ubicación
                    <ul>
                        <li>Latitud: {{ senlleira.location.latitude }}</li>
                        <li>Longitud: {{ senlleira.location.longitude }}</li>
                        <li>Lugar: {{ senlleira.lugar }}, {{ senlleira.provincia }} - {{ senlleira.concello }}</li>
                    </ul>
                </li>
            </ul>
            <p class="lead">{{ senlleira.comentarios }}</p>
        </section>
        <!-- Componente de ventana modal -->
        <delete-modal></delete-modal>
    </article>
</template>

<script setup>
//Dependencias
import DeleteModal from '@/components/senlleiras/DeleteModal.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { provide, onMounted, computed } from 'vue';
//Accedemos al Store de Vuex y al route
const store = useStore();
const route = useRoute();//Obtenemos el identificador de la url

//Ciclo de vida
onMounted(() => {
    store.dispatch('senlleiras/setSenlleira', route.params.id);
});

//Carga de varibles
const senlleira = computed(() => store.state.senlleiras.senlleira);

provide('senlleira', senlleira);//Lo almacenamos para la utilización en los componentes hijos
</script>