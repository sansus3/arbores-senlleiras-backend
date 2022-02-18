import { createStore } from 'vuex';

import users from './users';

import router from '@/router';//Esta línea no está en el original. Nos permite manipular las rutas
const Specie = {
  id: null,
  specie: '',
  genus: '',
  names: [],
  url: '',
  descriptio: ''
}
const store = createStore({
  state: {
    loader: {
      pending: false,
      msg: 'Cargando datos...'
    },
    specie: { ...Specie },
    species: [], //Listado de especies para el catálogo
  },
  mutations: {
    listadoEspecies(state, payload) {
      state.species = payload;
    },
    setEspecie(state, payload) {
      state.specie = state.species.find(spe => spe.id == payload);
    },
    resetSpecie(state) {
      state.specie = { ...Specie };
    },
    actualizarEspecie(state, payload) {
      state.specie = payload;
    },
    eliminarEspecie(state, payload) {
      state.species = state.species.filter(el => el.id !== payload);
      router.push('/catalogo');//router es importado
    },
    insertarEspecie(state, payload) {
      state.species.push(payload);
      state.specie = { ...Specie }; //resetamos
      router.push('/catalogo');//router es importado
    },
    updateLoader(state, payload) {
      state.loader.pending = payload.pending;
      if (payload.msg)
        state.loader.msg = payload.msg;
    }
  },
  actions: {
    //Listado de especies
    async getListadoEspecies({ commit }) {
      try {
        commit('updateLoader', { pending: true });
        const url = 'https://senlleiras-especies-default-rtdb.europe-west1.firebasedatabase.app/species.json';
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
        commit('listadoEspecies', arbores);
        commit('updateLoader', { pending: false });
      } catch (error) {
        commit('updateLoader', { pending: true });
        console.error(`getListadoEspecies() index.js en mutaciones [${error}]`);
      }
    },
    //rellenar el objeto specie a partir de un código dado
    setSpecie(context, id) {
      context.commit('setEspecie', id);
    },
    //reseteamos specie
    resetSpecie({ commit }) {
      commit('resetSpecie');
    },
    //Eleminación de especie
    async deleteSpecie({ commit }, id) {
      try {
        commit('updateLoader', { pending: true });
        const url = `https://senlleiras-especies-default-rtdb.europe-west1.firebasedatabase.app/species/specie-${id}.json`;
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        commit('eliminarEspecie', id);
        commit('updateLoader', { pending: false });
      } catch (error) {
        commit('updateLoader', { pending: true });
        console.log(error);
      }
    },
    //Actualización de la especie
    async updateSpecie({ commit }, objSpecie) {
      try {
        commit('updateLoader', { pending: true });
        const url = `https://senlleiras-especies-default-rtdb.europe-west1.firebasedatabase.app/species/specie-${objSpecie.id}.json`;


        const response = await fetch(
          url,
          {
            method: 'PATCH', // Editar datos
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(objSpecie)
          }
        );
        commit('actualizarEspecie', objSpecie);
        commit('updateLoader', { pending: false });
      } catch (error) {
        commit('updateLoader', { pending: true });
        console.log(error)
      }
    },
    async insertSpecie({ commit }, objTree) {
      try {
        commit('updateLoader', { pending: true });
        const url = `https://senlleiras-especies-default-rtdb.europe-west1.firebasedatabase.app/species/specie-${objTree.id}.json`;

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
        commit('insertarEspecie', objTree);
        commit('updateLoader', { pending: false });
      } catch (error) {
        commit('updateLoader', { pending: true });
        console.log(error)
      }

    }

  },
  modules: {
    users
  }
})

export default store;