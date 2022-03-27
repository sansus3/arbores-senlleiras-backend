<template>
    <div class="accordion m-3" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                >Filtrar</button>
            </h2>
            <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body">
                    <!-- Todo el código va aquí -->
                    <div class="row">
                        <div class="col-lg-6 col-md-12 mb-4">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="confirmado"
                                    id="todo"
                                    @change="confirmar(-1)"
                            
                                />
                                <label class="form-check-label" for="confirmado">Confirmado/sin confirmar</label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="confirmado"
                                    id="confirmado"
                                    @change="confirmar(true)"
                                />
                                <label class="form-check-label" for="confirmado">Confirmado</label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="confirmado"
                                    id="sinConfirmar"
                                     @change="confirmar(false)"
                                />
                                <label
                                    class="form-check-label"
                                    for="sinConfirmar"
                                >Sin confirmar</label>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 mb-4">
                            <!-- Search -->
                            <input 
                                class="form-control" 
                                type="text" placeholder="Género, especie, nombre de referencia, lugar, concello" 
                                aria-label="Search"
                                @keyup="filtrar"
                                v-model.trim="search">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useStore } from 'vuex';
    import { ref } from 'vue';
    const store = useStore();
    const search = ref('');
    const confirmar = value => {
        store.dispatch('senlleiras/listarConfirmados',value);
    }
    const filtrar = () => {
        store.dispatch('senlleiras/filtrar',search.value);
    }
</script>