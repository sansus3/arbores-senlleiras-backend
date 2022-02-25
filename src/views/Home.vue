<template>
  <div class="container mt-3">
    <header>
      <h2 class="display-6">Opciones</h2>
    </header>
    <div class="row p-3">
      <div class="col">
        <div class="list-group">
          <span class="list-group-item list-group-item-action active" aria-current="true">Especies</span>
          <router-link
            class="list-group-item list-group-item-action"
            :to="{
              name : 'Catalogo'
            }"
          >
            Catálogo de especies
          </router-link>
          <template v-if="!isLogin">
            <router-link
              class="list-group-item list-group-item-action"
              :to="{
                name : 'Specie'
              }"
            >
              Nueva especie
            </router-link>
          </template>
        </div>
      </div>
      <div class="col">
        <span class="list-group-item list-group-item-action active" aria-current="true">Senlleiras</span>
        <router-link
            class="list-group-item list-group-item-action"
            :to="{
              name : 'Senlleiras'
            }"
          >
            Catálogo de senlleiras
          </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const isLogin = computed(()=>{
    return store.state.users.user===null;
});
</script>

<style scoped>
img {
  width: 200px;
  object-fit: cover;
}
</style>
