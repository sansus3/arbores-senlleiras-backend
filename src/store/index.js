import { createStore } from 'vuex';
import { auth } from '../hooks/firebase';
import { onAuthStateChanged } from "firebase/auth";
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
  },
  actions: {
    //Listado de especies
    async getListadoEspecies({ commit }) {
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
      const url = `https://senlleiras-especies-default-rtdb.europe-west1.firebasedatabase.app/species/specie-${id}.json`;
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      commit('eliminarEspecie', id);
    },
    //Actualización de la especie
    async updateSpecie({ commit }, objSpecie) {
      const url = `https://senlleiras-especies-default-rtdb.europe-west1.firebasedatabase.app/species/specie-${objSpecie.id}.json`;
      await fetch(
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
    },
    async insertSpecie({ commit }, objTree) {
      const url = `https://senlleiras-especies-default-rtdb.europe-west1.firebasedatabase.app/species/specie-${objTree.id}.json`;
      await fetch(
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
    },
    checkAuth({ commit }) {
      //https://firebase.google.com/docs/auth/web/manage-users?authuser=0
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            console.log(user)
            commit('users/setUser', user);
            // ...
          } else {
            // User is signed out
            commit('users/setUser', null);
          }
        });
      } catch (error) {
        console.log(error)
      }
    }

  },
  modules: {
    users
  }
})

export default store;

store.dispatch('checkAuth');