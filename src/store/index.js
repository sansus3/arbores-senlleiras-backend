import { createStore } from 'vuex';

import router from '../router';//Esta línea no está en el original. Nos permite manipular las rutas

export default createStore({
  state: {
    loader: {
      pending: false,
      msg: 'Cargando datos...'  
    },
    specie:{id: null,specie: '',genus: '',names: '',descriptio: ''},
    species: [], //Listado de especies para el catálogo
  },
  mutations: {
    listadoEspecies(state,payment) {
      state.species = payment;
    },
    setEspecie(state,payment){
      //console.log(state.species,payment)
      state.specie = state.species.find(spe=>spe.id==payment);
    },
    actualizarEspecie(state,payment){
      state.specie = payment;
    },
    insertarEspecie(state, payment) {
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
    setSpecie(context,id){
      context.commit('setEspecie',id);
    },
    //Actualización de la especie
    async updateSpecie({commit},objSpecie){
      try {
        commit('updateLoader',{pending:true});
        const url = `https://arbores-senlleiras-default-rtdb.europe-west1.firebasedatabase.app/species/specie-${objSpecie.id}.json`;

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
        commit('updateLoader',{pending:false});
      } catch (error) {
        commit('updateLoader',{pending:true});
        console.log(error)
      }
    },
    async insertSpecie({ commit }, objTree) {
      try {
        commit('updateLoader',{pending:true});
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
        commit('insertarEspecie', objTree);
        commit('updateLoader',{pending:false});
      } catch (error) {
        commit('updateLoader',{pending:true});
        console.log(error)
      }

    }
    
  },
  modules: {
  }
})
