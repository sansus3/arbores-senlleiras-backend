import { createStore } from 'vuex';

import router from '../router';//Esta línea no está en el original. Nos permite manipular las rutas

export default createStore({
  state: {
    loader: {
      pending: false,
      msg: 'Cargando datos...'
    },
    specie: { id: null, specie: '', genus: '', names: [], descriptio: '' },
    species: [], //Listado de especies para el catálogo
    user: null
  },
  mutations: {
    usuarioRegistro(state,payment){
      state.user = payment;
    },
    listadoEspecies(state, payment) {
      state.species = payment;
    },
    setEspecie(state, payment) {
      //console.log(state.species,payment)
      state.specie = state.species.find(spe => spe.id == payment);
    },
    actualizarEspecie(state, payment) {
      state.specie = payment;
    },
    eliminarEspecie(state, payment) {
      state.species = state.species.filter(el => el.id !== payment);
    },
    insertarEspecie(state, payment) {
      state.species.push(payment);
      router.push('/catalogo');//router es importado
    },
    updateLoader(state, payment) {
      state.loader.pending = payment.pending;
    }
  },
  actions: {
    //Registro de usuario
    async userRegister({commit},user){
      console.log(user)
    },
    //Login de usuario
    //Documentación API REST
    //https://cloud.google.com/identity-platform/docs/reference/rest/v1/accounts/signInWithPassword
    async userLogin({commit},user){
      console.log(user)
      const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-a66QbdKHK7XGcquXhLz40SzSf3s0uX8";
      try{
        const respuesta = await fetch(url,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureteToken: true
          })
        });
        const userDB = await respuesta.json();
        console.log(userDB)
      }catch(error){
        console.log(`Error en userLogin : ${error}`);
      }
      
    },
    //Listado de especies
    async getListadoEspecies({ commit }) {
      try {
        commit('updateLoader', { pending: true });
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
    //Eleminación de especie
    async deleteSpecie({ commit }, id) {
      try {
        commit('updateLoader', { pending: true });
        const url = `https://arbores-senlleiras-default-rtdb.europe-west1.firebasedatabase.app/species/specie-${id}.json`;
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
        commit('updateLoader', { pending: false });
      } catch (error) {
        commit('updateLoader', { pending: true });
        console.log(error)
      }
    },
    async insertSpecie({ commit }, objTree) {
      try {
        commit('updateLoader', { pending: true });
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
        commit('updateLoader', { pending: false });
      } catch (error) {
        commit('updateLoader', { pending: true });
        console.log(error)
      }

    }

  },
  modules: {
  }
})
