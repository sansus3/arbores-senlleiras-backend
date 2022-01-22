<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Senlleiras</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/catalogo" navbar-brand>Catálogo</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/geolocalizacion" navbar-brand>Geolocalización</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" navbar-brand>Sobre nosotros</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contacto" navbar-brand>Contacto</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


li.nav-item{
  a {
    &.nav-link.router-link-exact-active {
      background-color:#2c3e50
    }
  }
}

</style>
