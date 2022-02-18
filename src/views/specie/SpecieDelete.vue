<template>
    <article v-if="specie" class="bd-cheatsheet container-fluid bg-body">
        <header>
            <h2 class="fw-bold pt-3 pt-xl-5 pb-2 pb-xl-3">{{ specie.genus }} {{ specie.specie }}</h2>
        </header>
        <section class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
            <h3>{{ specie.names.join(', ') }}</h3>
            <p class="lead">{{ specie.descriptio }}</p>
            <loader-component :text="loader.msg" :visibleBool="loader.pending"></loader-component>
        </section>
        <div
            class="modal modal-sheet position-static d-block bg-danger py-5"
            tabindex="-1"
            role="dialog"
            id="modalSheet"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content rounded-6 shadow">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title">{{ specie.genus }} {{ specie.specie }}</h5>
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
                            >Estoy seguro de eliminar estas especie y todo su contenido.</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
import { getAllFiles, deleteFile } from '@/hooks/storage.firebase';
import LoaderComponent from '@/components/LoaderComponent';
const route = useRoute();
const store = useStore();


const checked = ref(false);
const warning = ref(false);
const specie = computed(() => store.state.specie);
const loader = computed(() => store.state.loader);

onMounted(() => {
    store.dispatch('setSpecie', route.params.id);
});

//Métodos
const onDelete = async () => {
    if (checked.value) {        
        const { response } = await getAllFiles(route.params.id);
        for (let i = 0, tam = response.items.length; i < tam; i++) {
            //console.log(`${route.params.id}/${response.items[i].name}`)
            await deleteFile(`${route.params.id}/${response.items[i].name}`);
        }
        store.dispatch('deleteSpecie', route.params.id);
    } else {
        warning.value = true;
        setTimeout(() => {
            warning.value = false;
        },
            3000);
    }
}
</script>