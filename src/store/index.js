import { createStore } from 'vuex'

export default createStore({
  state: {
    listadoArbores: {
      loader: {
        pending: false,
        msg: 'Cargando datos...'
      },
      arbores: []
    }, //Listado de árboles para el catálogo
  },
  mutations: {
    listadoArbores(state) {
      (
        async () => {
          try {
            state.listadoArbores.loader.pending = true;
            const respuesta = await fetch('https://raw.githubusercontent.com/sansus3/COLABORATIVO_GITHUB/main/species.json');
            if (!respuesta.ok) {//estado en un rango de 200 a 299
              console.error(`Error index.js en mutaciones [${respuesta.status}]`);
              throw Error(respuesta.status);
            } else
              state.listadoArbores.arbores = await respuesta.json();
            state.listadoArbores.loader.pending = false;
          } catch (error) {
            state.listadoArbores.loader.pending = true;
            state.listadoArbores.loader.msg = error;
            console.error(`Error index.js en mutaciones [${error}]`);
          }
        }
      )()
    }
  },
  actions: {
    getListadoArbores({ commit }) {
      commit('listadoArbores');
    }
  },
  modules: {
  }
})
