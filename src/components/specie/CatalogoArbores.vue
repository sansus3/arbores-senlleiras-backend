<template>
    <form @submit.prevent="buscar" class="d-flex justify-content-end p-2 bd-highlight">
        <input
            v-model="search"
            class="form-control me-2"
            type="search"
            placeholder="Género, especie, nombre común"
            aria-label="Search"
        />
    </form>
    <div class="table-responsive">
        <table class="table table-striped">
            <caption>Ejemplares: {{ totalCatalogo }}</caption>
            <thead>
                <tr>
                    <th scope="col">
                        <a @click.prevent="sortSpecie('genus')" href="#">Género</a>
                        <i class="bi" :class="genusSort"></i>
                    </th>
                    <th scope="col">
                        <a @click.prevent="sortSpecie('specie')" href="#">Especie</a>
                        <i class="bi" :class="specieSort"></i>
                    </th>
                    <th scope="col">Nombres comunes</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in speciesFilter" :key="item.id">
                    <td>
                        <router-link
                            :to="{
                                name: 'Arbore',
                                params: {
                                    id: item.id
                                }
                            }"
                        >{{ item.genus }}</router-link>
                    </td>
                    <td>{{ item.specie }}</td>
                    <td>{{ item.names.join() }}</td>
                    <td>
                        <router-link
                            title="Subida de imágenes"
                            class="text-decoration-none"
                            :to="{
                                name: 'SpecieImages',
                                params: {
                                    id: item.id
                                }
                            }"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-cloud-upload"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
                                />
                            </svg>
                        </router-link>
                        <router-link
                            class="text-decoration-none"
                            title="Edición de especie"
                            :to="{
                                name: 'Edit',
                                params: {
                                    id: item.id
                                }
                            }"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-vector-pen"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"
                                />
                            </svg>
                        </router-link>
                        <router-link 
                            title="Eliminación de Especie"
                            :to="{name:'DeleteSpecie',params: {id:item.id}}"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                            </svg>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <loader-component :text="loader.msg" :visibleBool="loader.pending"></loader-component>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, reactive, ref } from 'vue';

import LoaderComponent from '@/components/LoaderComponent';

//Inicializamos el store
const store = useStore();
//Cargamos propiedades del store (vuex)
let species = computed(() => store.state.species);
const loader = computed(() => store.state.loader);
const search = ref("");

const genusSort = reactive({ 'bi-sort-alpha-down': true, 'bi-sort-alpha-down-alt': false });
const specieSort = reactive({ 'bi-sort-alpha-down': true, 'bi-sort-alpha-down-alt': false });

const speciesFilter = computed(() => {
    return species.value.filter(item => {
        return item.genus.toLowerCase().includes(search.value.toLowerCase())
        || item.specie.toLowerCase().includes(search.value.toLowerCase())
        || item.names.join().toLowerCase().includes(search.value.toLowerCase())
    })
});

//Elementos computados
const totalCatalogo = computed(() => speciesFilter.value ? speciesFilter.value.length : 0);

//Métodos
const sortSpecie = sort => {
    switch (sort) {
        case 'genus':
            if (genusSort['bi-sort-alpha-down'] == true) {
                genusSort['bi-sort-alpha-down'] = false;
                genusSort['bi-sort-alpha-down-alt'] = true;
                speciesFilter.value.sort((x, y) => x.genus.localeCompare(y.genus))
            } else {
                genusSort['bi-sort-alpha-down'] = true;
                genusSort['bi-sort-alpha-down-alt'] = false;
                speciesFilter.value.sort((x, y) => y.genus.localeCompare(x.genus))
            }
            break;
        case 'specie':
            if (specieSort['bi-sort-alpha-down'] == true) {
                specieSort['bi-sort-alpha-down'] = false;
                specieSort['bi-sort-alpha-down-alt'] = true;
                speciesFilter.value.sort((x, y) => x.specie.localeCompare(y.specie))
            } else {
                specieSort['bi-sort-alpha-down'] = true;
                specieSort['bi-sort-alpha-down-alt'] = false;
                speciesFilter.value.sort((x, y) => y.specie.localeCompare(x.specie))
            }
            break;
    }
}
</script>

<style lang="scss" scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
ul {
    padding-left: 0;
    list-style-type: none;
}
</style>