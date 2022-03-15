<template>
    <form
        method="post"
        enctype="multipart/form-data"
        class="senlleiras container mt-3"
        @submit.prevent="submit"
    >
        <header>
            <h2 class="display-6">{{ form.nombreReferencia }}</h2>
        </header>
        <fieldset class="card p-3 mb-3">
            <legend>Datos da planta</legend>
            <ul class="fields row g-2">
                <li class="field col-auto">
                    <label class="form-label" for="especie">
                        <span
                            v-if="loaderSpecies"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span> Nome científico
                    </label>
                    <select
                        @change="obtenerNombreComun"
                        v-model="form.idSpecie"
                        name="especie"
                        id="especie"
                        class="form-select"
                        required
                    >
                        <optgroup label="Sin confirmar">
                            <option value="null">Descoñecida</option>
                        </optgroup>
                        <optgroup label="Especies">
                            <option
                                v-for="item in species"
                                :key="item.id"
                                :value="item.id"
                            >{{ item.genus }} {{ item.specie }}</option>
                        </optgroup>
                    </select>
                </li>
                <li class="field col-auto">
                    <label class="form-label" for="nombrecomun">Nome común</label>
                    <input
                        placeholder="Su nombre aquí"
                        class="form-control"
                        type="text"
                        aria-label="Disabled input"
                        disabled
                        v-model.trim="form.nombreComun"
                        name="nombrecomun"
                        id="nombrecomun"
                    />
                </li>
                <li class="field col">
                    <label class="form-label" for="nombrearbol">
                        Nome de referencia
                        <span class="text-danger">(Obrigatorio)</span>
                    </label>
                    <input
                        class="form-control"
                        placeholder="Su nombre aquí"
                        required
                        type="text"
                        v-model.trim="form.nombreReferencia"
                        name="nombrearbol"
                        id="nombrearbol"
                    />
                </li>
            </ul>
            <!-- Altura / diametro / Edad -->
            <ul class="field row g-2">
                <li class="field col-auto">
                    <label for="altura" class="form-label">Altura</label>
                    <input
                        id="altura"
                        name="altura"
                        v-model.trim="form.altura"
                        type="text"
                        placeholder="Entre 10 y 20 metros"
                        class="field__control form-control"
                    />
                </li>
                <li class="field col-auto">
                    <label for="diametro" class="form-label">Diámetro</label>
                    <input
                        id="diametro"
                        name="diametro"
                        v-model.trim="form.diametro"
                        type="text"
                        placeholder="Sobre 1.5 metros"
                        class="field__control form-control"
                    />
                </li>
                <li class="field col-auto">
                    <label for="edadEstimada" class="form-label">Idade estimada en anos</label>
                    <input
                        id="edadEstimada"
                        name="edadEstimada"
                        v-model.number="form.edadEstimada"
                        type="number"
                        placeholder="20"
                        class="field__control form-control"
                    />
                </li>
            </ul>
        </fieldset>
        <fieldset class="card p-3 mb-3">
            <legend>Ubicación</legend>
            <ul class="fields g-2 row">
                <li class="field col">
                    <label class="form-label" for="lugar">Lugar, rúa, avenida</label>
                    <input
                        placeholder="Su nombre aquí"
                        class="form-control"
                        type="text"
                        v-model.trim="form.lugar"
                        name="lugar"
                        id="lugar"
                    />
                </li>
                <li class="field col">
                    <label class="form-label" for="concello">Concello</label>
                    <input
                        placeholder="Su nombre aquí"
                        class="form-control"
                        type="text"
                        v-model.trim="form.concello"
                        name="concello"
                        id="concello"
                    />
                </li>
                <li class="field col-auto">
                    <label class="form-label" for="Provincia">Provincia</label>
                    <select
                        disabled
                        class="form-select"
                        v-model="form.provincia"
                        name="Provincia"
                        id="Provincia"
                    >
                        <option selected value="A Coruña">A Coruña</option>
                        <option value="Lugo">Lugo</option>
                        <option value="Ourense">Ourense</option>
                        <option value="Pontevedra">Pontevedra</option>
                    </select>
                </li>
            </ul>
            <ul class="fields g-2 row">
                <li>
                    <fieldset class="card p-3 mb-3">
                        <legend>Motivo pola eleción da árbore</legend>
                        <ul class="fields g-2 row">
                            <li class="field col">
                                <input
                                    type="checkbox"
                                    v-model="form.destacaAntiguedad"
                                    name="destacaAntiguedad"
                                    id="destacaAntiguedad"
                                />&nbsp;
                                <label class="form-label" for="destacaAntiguedad">Antigüedade</label>
                            </li>
                            <li class="field col">
                                <input
                                    type="checkbox"
                                    v-model="form.destacaTamano"
                                    name="destacaTamano"
                                    id="destacaTamano"
                                />&nbsp;
                                <label class="form-label" for="destacaTamano">Tamano da árbore</label>
                            </li>
                            <li class="field col">
                                <input
                                    type="checkbox"
                                    v-model="form.destacaSituacion"
                                    name="destacaSituacion"
                                    id="destacaSituacion"
                                />&nbsp;
                                <label
                                    class="form-label"
                                    for="destacaSituacion"
                                >Situación da arbore</label>
                            </li>
                            <li class="field col">
                                <input
                                    type="checkbox"
                                    v-model="form.destacaContexto"
                                    name="destacaContexto"
                                    id="destacaContexto"
                                />&nbsp;
                                <label
                                    class="form-label"
                                    for="destacaContexto"
                                >Contexto histórico</label>
                            </li>
                        </ul>
                    </fieldset>
                </li>
            </ul>
            <ul class="fields g-2 row">
                <li class="field">
                    <the-geolocation :location="form.location"></the-geolocation>
                </li>
            </ul>
        </fieldset>
        <fieldset class="card p-3 mb-3">
            <legend>Datos personales</legend>
            <div class="input-group mb-3">
                <span class="input-group-text">Nome e apelidos</span>
                <input
                    v-model.trim="form.nombrePila"
                    type="text"
                    aria-label="First name"
                    class="form-control"
                />
                <input
                    v-model.trim="form.apellidos"
                    type="text"
                    aria-label="Last name"
                    class="form-control"
                />
            </div>
            <div class="input-group mb-3">
                <input
                    type="email"
                    required
                    class="form-control"
                    placeholder="Su correo"
                    aria-label="Su correo"
                    aria-describedby="correo"
                    v-model.trim="form.email"
                />
                <span class="input-group-text" id="correo">
                    Correo electrónico&nbsp;
                    <span class="text-danger">(Obrigatorio)</span>
                </span>
            </div>
        </fieldset>
         <fieldset class="card p-3 mb-3">
            <legend>Historias, lendas e curiosidades</legend>
            <div class="input-group mb-2">
                <span class="input-group-text">A súa historia</span>
                <textarea
                    v-model.trim="form.usosCuriosidades"
                    class="form-control"
                    aria-label="With textarea"
                ></textarea>
            </div>
        </fieldset>
        <fieldset class="card p-3 mb-3">
            <legend>Otros datos</legend>
            <div class="input-group mb-2">
                <span class="input-group-text">Os teus comentarios</span>
                <textarea
                    v-model.trim="form.comentarios"
                    class="form-control"
                    aria-label="With textarea"
                ></textarea>
            </div>
            <div class="form-check">
                <input
                    v-model="form.confirmado"
                    class="form-check-input"
                    type="checkbox"
                    value
                    id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">Confirmado</label>
            </div>
        </fieldset>

        <div class="d-grid mb-5 gap-2 col-6 mx-auto">
            <input type="hidden" v-model="form.specie" />
            <input type="hidden" v-model="form.genus" />
            <button :disabled="btnDisabled" class="btn btn-primary">
                <span
                    v-if="loaderSave"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                ></span>
                Gardar
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import { useStore } from 'vuex';
import TheGeolocation from '@/components/TheGeolocation.vue';

//Accedemos al Store de Vuex
const store = useStore();
//Variables
const loaderSpecies = ref(false);//Loader que espera a que se cargue el selector de especies
const loaderSave = ref(false);//En espera a guardar el formulario
const form = computed(() => store.state.senlleiras.senlleira);//Generamos campos del formulario a partir de lo cargado del objeto senlleria del store
const species = computed(() => store.state.species.speciesFilter);//Obtenemos las especies para el selector html y ordenados por género
const idSenlleira = inject('idSenlleira'); //Obtenemos el Id del componente padre. La vista EditView.vue

//Ciclo de vida
onMounted(async () => {
    try {
        loaderSpecies.value = true;
        //Cargamos el listado de especies (nombre científico y común) de las especies
        await store.dispatch('species/getListadoEspecies');
        //Los ordenamos alfabéticamente por el género
        store.dispatch('species/setSpeciesGenusSort')
        //Optenemos los datos de la senlleira
        store.dispatch('senlleiras/setSenlleira', idSenlleira);
    } catch (error) {
        console.log(error);
    } finally {
        loaderSpecies.value = false;
    }
});


//Métodos
/**
 * Select del html par buscar en el array de Especies el nombre común y no científico del mismo
 * @param {Object} e Evento
 */
const obtenerNombreComun = e => {
    form.value.nombreComun = '';
    const specie = species.value.find(element => element.id === e.target.value);
    //console.log(specie)
    if (specie) {
        form.value.nombreComun = specie.names.join();
        form.value.genus = specie.genus;
        form.value.specie = specie.specie;
    } else {
        form.value.nombreComun = '';
        form.value.genus = '';
        form.value.specie = '';
    }
}

/**
 * Para desactivar el botón varias consideraciones
 * Campos latitud, longitud y nombre del árbol cubiertos
 * Cargado todas las especies del selector
 */
const btnDisabled = computed(() => {
    const expRegEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //console.log(expReg.test(form.value.location.latitude))
    return !expRegEmail.test(form.value.email) || !form.value.nombreReferencia.length || !form.value.email.length || loaderSpecies.value;// || !images.length
});
/**
 * Validaremos el tamaño de imágenes por si alguno se pasa y si todo ok subimos
 */
const submit = async () => {
    // if (subirImages()) {
    // store.dispatch('senlleiras/updateSenlleira', form.value)
    // }
    try {
        loaderSave.value = true;
        await store.dispatch('senlleiras/updateSenlleira', form.value);
    } catch (error) {
        console.log("EditView.vue --> Submit()", error);
    } finally {
        loaderSave.value = false;
    }
}

</script>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0;
}
</style>