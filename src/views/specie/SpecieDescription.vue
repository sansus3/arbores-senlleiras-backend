<template>
    <article v-if="specie" class="bd-cheatsheet container-fluid bg-body">
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            :class="tabs.item1"
                            :aria-current="tabs.item1.active"
                            href="#"
                            @click.prevent="activar('item1')"
                        >Xeral</a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            :class="tabs.item2"
                            :aria-current="tabs.item2.active"
                            href="#"
                            @click.prevent="activar('item2')"
                        >Descrición</a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            :class="tabs.item3"
                            :aria-current="tabs.item3.active"
                            href="#"
                            @click.prevent="activar('item3')"
                        >Follas</a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            :class="tabs.item4"
                            :aria-current="tabs.item4.active"
                            href="#"
                            @click.prevent="activar('item4')"
                        >Flores</a>
                    </li>
                </ul>
            </div>
            <!-- Información xeral -->
            <div v-if="tabs.item1.active" class="card-body">
                <h5 class="card-title">{{ specie.genus }} {{ specie.specie }}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <strong>Nomes en castelán:</strong>
                        {{ specie.names.join(', ') }}
                    </li>
                    <li class="list-group-item">
                        <strong>Nomes en galego:</strong>
                        {{ specie.nomes }}
                    </li>
                    <li v-if="specie.altura" class="list-group-item">
                        <strong>Altura (máx)</strong>
                        {{ specie.altura }} metros
                    </li>
                    <li v-if="specie.diametroCopa" class="list-group-item">
                        <strong>Diámetro de copa (máx)</strong>
                        {{ specie.diametroCopa }} metros
                    </li>
                    <li v-if="specie.perimetroTronco" class="list-group-item">
                        <strong>Perímetro do tronco (máx)</strong>
                        {{ specie.perimetroTronco }} metros
                    </li>
                    <li class="list-group-item">
                        <strong>Distribución</strong>
                        {{ specie.distribucion }}
                    </li>
                </ul>
                <storage-firebase :files_uid="$route.params.id"></storage-firebase>
            </div>
            <!-- Descricion -->
            <div v-if="tabs.item2.active" class="card-body">
                <h5 class="card-title">Descrición tronco</h5>
                <p class="card-text">{{ specie.descTronco }}</p>
                <h5>Etimoloxía</h5>
                <p class="card-text">{{ specie.etimoloxia }}</p>
                <h5>Usos e aproveitamento</h5>
                <p class="card-text">{{ specie.usosAprovechamiento }}</p>
                <h5 class="card-title">Curiosidades</h5>
                <p class="card-text">{{ specie.curiosidades }}</p>
                <h5 class="card-title">Orixe e descrición</h5>
                <p class="card-text">{{ specie.descriptio }}</p>
            </div>
            <!-- Follas -->
            <div v-if="tabs.item3.active" class="card-body">
                <h5 class="card-title">Follas</h5>
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        value
                        id="perenne"
                        :checked="specie.hojaPerenne"
                        disabled
                    />
                    <label class="form-check-label" for="perenne">Folla Perenne</label>
                </div>
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        value
                        id="caduca"
                        :checked="!specie.hojaPerenne"
                        disabled
                    />
                    <label class="form-check-label" for="caduca">Folla caduca</label>
                </div>
                <p class="card-text">{{ specie.descHoja }}</p>
            </div>
            <!-- Flores -->
            <div v-if="tabs.item4.active" class="card-body">
                <h5 class="card-title">Flores</h5>
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        value
                        id="ginnospermas"
                        :checked="specie.ginnospermas"
                        disabled
                    />
                    <label class="form-check-label" for="ginnospermas">Ginnospermas</label>
                </div>
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        value
                        id="angiospermas"
                        :checked="!specie.ginnospermas"
                        disabled
                    />
                    <label class="form-check-label" for="angiospermas">Angiospermas</label>
                </div>
                <p class="card-text">{{ specie.descFlorFruto }}</p>
            </div>
        </div>
        <div v-if="!isLogin" class="btn-group m-3" role="group">
            <router-link
                :to="{
                    name: 'Edit',
                    params: {
                        id: $route.params.id
                    }
                }"
                class="btn btn-primary"
            >Editar</router-link>
            <router-link
                :to="{
                    name: 'DeleteSpecie',
                    params: {
                        id: $route.params.id
                    }
                }"
                class="btn btn-danger"
            >Eliminar</router-link>
        </div>
    </article>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted, computed, reactive } from "vue";
import StorageFirebase from "@/components/specie/StorageFirebase.vue"

const route = useRoute();
const store = useStore();

const isLogin = computed(() => {
    return store.state.users.user === null;
});

const tabs = reactive({
    item1: {
        'active': true,
    },
    item2: {
        'active': false,
    },
    item3: {
        'active': false,
    },
    item4: {
        'active': false,
    }
});

const activar = (item) => {
    for (let item in tabs) {
        tabs[item].active = false;
    }
    tabs[item].active = true;
}

const specie = computed(() => store.state.species.specie);

onMounted(() => {
    store.dispatch('species/setSpecie', route.params.id);
});
</script>