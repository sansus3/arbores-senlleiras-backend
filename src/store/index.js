import { createStore } from 'vuex';

import router from '../router';

export default createStore({
  state: {
    listadoArbores: {
      loader: { //Como la carga del árbol es json este objeto no describe el estado en que no encontramos
        pending: false,
        msg: 'Cargando datos...'
      },
      arbores: [],
    }, //Listado de árboles para el catálogo
  },
  mutations: {
    async listadoArbores(state) {
      state.listadoArbores.arbores = [];
      try {
        const url = 'https://arbores-senlleiras-default-rtdb.europe-west1.firebasedatabase.app/species.json';
        state.listadoArbores.loader.pending = true;
        const response = await fetch(
          url,
          {
            method: 'GET', // Lectura de datos
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(response)
        const dataBD = await response.json();
        console.log(dataBD)
        for (let id in dataBD) {
          state.listadoArbores.arbores.push(dataBD[id]);
        }
        state.listadoArbores.loader.pending = false;
      } catch (error) {
        state.listadoArbores.loader.pending = true;
        state.listadoArbores.loader.msg = error.message;
        console.error(`Error index.js en mutaciones [${error}]`);
      }

    },
    setArbol(state, payment) {
      state.listadoArbores.arbores.push(payment);
      router.push('/catalogo');
    }
  },
  actions: {
    getListadoArbores({ commit }) {
      commit('listadoArbores');
    },

    async setArbol({ commit }, objTree) {
      try {
        const url = `https://arbores-senlleiras-default-rtdb.europe-west1.firebasedatabase.app/species/specie-${objTree.id}.json`;

        const response = await fetch(
          url,
          {
            method: 'PUT', // Editar datos
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(objTree)
          }
        );
        commit('setArbol', objTree);
      } catch (error) {
        console.log(error)
      }
      
    }
  },
  modules: {
  }
})
