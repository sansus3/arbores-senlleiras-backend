<template>
  <div>
    <the-header></the-header>
    <router-view />
  </div>
</template>

<script setup>
import TheHeader from './views/TheHeader.vue';
import { getSpecies } from './hooks/species.hook';
//obtenemos las especies del hook
const {species} = getSpecies();

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

li.nav-item {
  a {
    &.nav-link.router-link-exact-active {
      background-color: #2c3e50;
    }
  }
}
</style>
