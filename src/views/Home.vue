<template>
  <header>
    <h2 class="display-3">Opciones</h2>
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

        <router-link 
          class="list-group-item list-group-item-action"
          :to="{
            name : 'Specie'
          }"
        >
          Nueva especie
        </router-link>
      </div>
    </div>
    <div class="col">
      <ul class="list-group">
        <li class="list-group-item active" aria-current="true">Senlleiras</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>
img {
  width: 200px;
  object-fit: cover;
}
</style>
