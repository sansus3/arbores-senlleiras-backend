<template>
    <div
        class="modal modal-sheet position-static d-block bg-danger py-5"
        tabindex="-1"
        role="dialog"
        id="modalSheet"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-6 shadow">
                <div class="modal-header border-bottom-0">
                    <h5 class="modal-title">{{senlleira.nombreReferencia}}</h5>
                </div>
                <div class="modal-body py-0">
                    <p>Va a proceder a eliminar esta especie y todo su contenido. Incluídas las imágenes. Tómase su tiempo antes de realizar esta acción.</p>
                </div>
                <div class="modal-footer flex-column border-top-0">
                    <button
                        type="button"
                        class="btn btn-lg btn-danger w-100 mx-0 mb-2"
                        @click="onDelete"
                    >Eliminar especie</button>
                    <div
                        v-if="warning"
                        class="alert alert-warning"
                        role="alert"
                    >Debe marcar la casilla de verificación</div>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value
                            id="flexCheckChecked"
                            v-model="checked"
                        />
                        <label
                            class="form-check-label"
                            for="flexCheckChecked"
                        >Estoy seguro de eliminar esta especie y todo su contenido.</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//Dependencias
import { inject,ref } from 'vue';
//Variables
const senlleira = inject('senlleira'); //Cargamos el objeto senlleira
const checked = ref(false); //Checkbox de html para verificar que se quiere eliminar esta senlleira realmente.
const warning = ref(false); //Mensaje de error que se mostrará en caso de no marcarse la casilla de verificación.
</script>

