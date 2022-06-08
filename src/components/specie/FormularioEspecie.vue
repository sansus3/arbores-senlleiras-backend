<template>
    <form method="post" action="#" v-on:submit.prevent="accionPersonalizada">
        <ul class="fields p-2">
            <li class="field mb-3">
                <label
                    data-title="⚠ Campo obligatorio"
                    for="genus"
                    class="form-label control-label"
                >Xénero</label>
                <input
                    id="genus"
                    name="genus"
                    v-model.trim="arbore.genus"
                    type="text"
                    placeholder="Xénero aquí"
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
                    v-model.trim="arbore.specie"
                    type="text"
                    placeholder="Especie aquí"
                    class="field__control form-control"
                    pattern=".{3,}"
                    title="Mínimo 3 caracteres"
                />
            </li>

            <li class="field mb-3">
                <label for="names" class="form-label">Nomes en castelán</label>
                <input
                    id="names"
                    name="names"
                    v-model.trim="arbore.nombres"
                    type="text"
                    placeholder="Nomes separados con comas"
                    class="field__control form-control"
                />
            </li>

            <li class="field mb-3">
                <label for="nomes" class="form-label">Nomes en galego</label>
                <input
                    id="nomes"
                    name="nomes"
                    v-model.trim="arbore.nomes"
                    type="text"
                    placeholder="Nomes separados con comas"
                    class="field__control form-control"
                />
            </li>
            <!-- Altura / diametro /distribucion -->
            <li class="field mb-3 row">
                <div class="col-auto">
                    <label for="altura" class="form-label">Altura (metros)</label>
                    <input
                        id="altura"
                        name="altura"
                        v-model.number="arbore.altura"
                        type="number"
                        step="any"
                        placeholder="31"
                        class="field__control form-control"
                    />
                </div>
                <div class="col-auto">
                    <label for="diametroCopa" class="form-label">Diámetro da copa (metros)</label>
                    <input
                        id="diametroCopa"
                        name="diametroCopa"
                        v-model.number="arbore.diametroCopa"
                        type="number"
                        step="any"
                        placeholder="10,5"
                        class="field__control form-control"
                    />
                </div>
                <div class="col-auto">
                    <label for="diametro" class="form-label">Perímetro do tronco (metros)</label>
                    <input
                        id="perimetroTronco"
                        name="perimetroTronco"
                        v-model.number="arbore.perimetroTronco"
                        type="number"
                        step="any"
                        placeholder="10,5"
                        class="field__control form-control"
                    />
                </div>                
            </li>
            <!-- Datos adicionales -->
            <li class="field mb-3 row">
                <div class="col">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="hojaPerenne"
                            :value="false"
                            id="si"
                            v-model="arbore.hojaPerenne"
                        />
                        <label class="form-check-label" for="si">Folla caduca</label>
                    </div>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="hojaPerenne"
                            :value="true"
                            id="no"
                            v-model="arbore.hojaPerenne"
                        />
                        <label class="form-check-label" for="flexRadioDefault2">Folla perenne</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="ginnospermas"
                            :value="false"
                            id="si"
                            v-model="arbore.ginnospermas"
                        />
                        <label class="form-check-label" for="si">Angiospermas</label>
                    </div>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="ginnospermas"
                            :value="true"
                            id="no"
                            v-model="arbore.ginnospermas"
                        />
                        <label class="form-check-label" for="flexRadioDefault2">Ginnospermas</label>
                    </div>
                </div>
            </li>

            <li class="field mb-3">
                <label for="descHoja" class="form-label">Descrición da Folla</label>
                <textarea
                    v-model.trim="arbore.descHoja"
                    class="form-control"
                    id="descHoja"
                    rows="3"
                ></textarea>
            </li>

            <li class="field mb-3">
                <label for="descFlorFruto" class="form-label">Descrición da flor/froito</label>
                <textarea
                    v-model.trim="arbore.descFlorFruto"
                    class="form-control"
                    id="descFlorFruto"
                    rows="3"
                ></textarea>
            </li>

            <li class="field mb-3">
                <label for="descTronco" class="form-label">Descrición do Tronco</label>
                <textarea
                    v-model.trim="arbore.descTronco"
                    class="form-control"
                    id="descTronco"
                    rows="3"
                ></textarea>
            </li>

            <li class="field mb-3">
                    <label for="distribucion" class="form-label">Distribución xeográfica</label>
                    <textarea
                        id="distribucion"
                        name="distribucion"
                        v-model.trim="arbore.distribucion"
                        placeholder="Europa occidental"
                        class="form-control"
                    ></textarea>
                </li>

            <li class="field mb-3">
                <label for="usosAprovechamiento" class="form-label">Usos e aproveitamento</label>
                <textarea
                    v-model.trim="arbore.usosAprovechamiento"
                    class="form-control"
                    id="usosAprovechamiento"
                    rows="3"
                ></textarea>
            </li>

            <li class="field mb-3">
                <label for="etimoloxia" class="form-label">Etimoloxía</label>
                <textarea
                    v-model.trim="arbore.etimoloxia"
                    class="form-control"
                    id="etimoloxia"
                    rows="3"
                ></textarea>
            </li>

             <li class="field mb-3">
                <label for="curiosidades" class="form-label">Curiosidades</label>
                <textarea
                    v-model.trim="arbore.curiosidades"
                    class="form-control"
                    id="curiosidades"
                    rows="3"
                ></textarea>
            </li>

            <li class="field mb-3">
                <label for="descriptio" class="form-label">Orixe e descrición</label>
                <textarea
                    v-model.trim="arbore.descriptio"
                    class="form-control"
                    id="descriptio"
                    rows="3"
                ></textarea>
            </li>           

            <li class="mb-3">
                <button class="btn btn-dark" :disabled="btnDisabled">
                    <div v-if="spinner" class="spinner-border" style="width: 1rem; height: 1rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    {{ btntext }}
                </button>
            </li>
        </ul>
    </form>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    /**
     * @param {Object} arbore - Objeto con todos los datos de una especie
     * @description Ejemplo:
        {
        "descFlorFruto": "O carballo común presenta dous tipos de flores masculinas e as femininas",
        "descHoja": "Follas grandes.",
        "descTronco": "Tronco leñoso con gretas lonxitudinais",
        "descriptio": "Árbore de copa ampla.",
        "altura": 0, //numérico Ej: 31 metros
        "diametroCopa": 0, //numérico Ej: 10.5 metros
        "perimetroTronco": 0, // numérico Ej: 3.45 metros
        "edadEstimada": 0, // numérico Ej: 100 anos
        "distribucion": "Europa",
        "genus": "Quercus",
        "ginnospermas": false,
        "hojaPerenne": false,
        "id": "sp-1647167763925",
        "names": [
            "Carballo",
            "roble"
        ],
        "specie": "Robur",
        "usosAprovechamiento": "A madeira do carballo é de excelente calidade.",
        "nombres": "Carballo,roble"
        }
     * 
     */
    arbore: {
        type: Object,
        required: false,

    },
    /**
     * @param {Boolean} spinner - Spinner colocado el botón de actualización
     */
    spinner: {
        type: Boolean,
        default: false,
    },
    /**
     * {String} btntext - Texto que figura en el botón
     */
    btntext: {
        type: String,
        required: false,
        default: "Enviar"
    }
});
const emit = defineEmits(['customAction']);
//Si el campo specie o genus está vacío desactivamos el botón de envío de datos
const btnDisabled = computed(
    () => {
        return !props.arbore.specie.length || !props.arbore.genus.length
    }
);


//para almacenar en la bse de datos el string del formulario names lo convertimos en array
const joinNames = () => {
    props.arbore.nombres = props.arbore.nombres.replace(/ +,/g, ",");//limpiamos espacios en blanco adicionales a las comas
    //console.log(this.names)
    props.arbore.nombres = props.arbore.nombres.replace(/, +/g, ",");
    //console.log(this.names.split(','))
    props.arbore.names = props.arbore.nombres.split(',');
}

//Nuestro emit que nos sirve bien para edición como para inserción
const accionPersonalizada = () => {
    joinNames();
    emit('customAction', props.arbore)
}
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