import { createStore } from 'vuex';

import router from '../router';//Esta línea no está en el original. Nos permite manipular las rutas

export default createStore({
  state: {
    loader: {
      pending: false,
      msg: 'Cargando datos...'  
    },
    species: [], //Listado de especies para el catálogo
  },
  mutations: {
    listadoEspecies(state,payment) {
      state.species = payment;
    },
    setArbol(state, payment) {
      state.species.push(payment);
      router.push('/catalogo');//router es importado
    },
    updateLoader(state,payment){
      state.loader.pending = payment.pending;
    }
  },
  actions: {
    async getListadoEspecies({ commit }) {
      try {
        commit('updateLoader',{pending:true});
        const url = 'https://arbores-senlleiras-default-rtdb.europe-west1.firebasedatabase.app/species.json';
        const response = await fetch(
          url,
          {
            method: 'GET', // Lectura de datos
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        //console.log(response)
        const dataBD = await response.json();
        const arbores = [];
        //console.log(dataBD)
        for (let id in dataBD) {
          arbores.push(dataBD[id]);
        }
        commit('listadoEspecies',arbores);
        commit('updateLoader',{pending:false});
      } catch (error) {
        commit('updateLoader',{pending:true});
        console.error(`getListadoEspecies() index.js en mutaciones [${error}]`);  
      }
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
