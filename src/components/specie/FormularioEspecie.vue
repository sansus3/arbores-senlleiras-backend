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
                <label for="names" class="form-label">Nomes</label>
                <input
                    id="names"
                    name="names"
                    v-model.trim="arbore.nombres"
                    type="text"
                    placeholder="Nomes separados con comas"
                    class="field__control form-control"
                />
            </li>
            <!-- Altura / diametro /distribucion -->
            <li class="field mb-3 row">
                <div class="col-auto">
                    <label for="altura" class="form-label">Altura</label>
                    <input
                        id="altura"
                        name="altura"
                        v-model.trim="arbore.altura"
                        type="text"
                        placeholder="Entre 10 y 20 metros"
                        class="field__control form-control"
                    />
                </div>
                <div class="col-auto">
                    <label for="diametro" class="form-label">Diámetro</label>
                    <input
                        id="diametro"
                        name="diametro"
                        v-model.trim="arbore.diametro"
                        type="text"
                        placeholder="Sobre 1.5 metros"
                        class="field__control form-control"
                    />
                </div>
                <div class="col">
                    <label for="distribucion" class="form-label">Distribución xeográfica</label>
                    <input
                        id="distribucion"
                        name="distribucion"
                        v-model.trim="arbore.distribucion"
                        type="text"
                        placeholder="Europa occidental"
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
                <label for="descHoja" class="form-label">Descripción da Folla</label>
                <textarea
                    v-model.trim="arbore.descHoja"
                    class="form-control"
                    id="descHoja"
                    rows="3"
                ></textarea>
            </li>

             <li class="field mb-3">
                <label for="descFlorFruto" class="form-label">Descripción da flor/froito</label>
                <textarea
                    v-model.trim="arbore.descFlorFruto"
                    class="form-control"
                    id="descFlorFruto"
                    rows="3"
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
                <label for="descriptio" class="form-label">Outros datos</label>
                <textarea
                    v-model.trim="arbore.descriptio"
                    class="form-control"
                    id="descriptio"
                    rows="3"
                ></textarea>
            </li>

            <li class="mb-3">
                <button class="btn btn-dark" :disabled="btnDisabled">{{ btntext }}</button>
            </li>
        </ul>
    </form>
</template>

<script setup>

import { computed, defineEmits, defineProps } from 'vue';
const props = defineProps({
    arbore: {
        type: Object,
        required: false,

    },
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