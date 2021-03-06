import { createStore } from 'vuex';
import { auth } from '../hooks/firebase';
import { onAuthStateChanged } from "firebase/auth";
//Modulos del Store de Vuex
import users from './users';
import species from './species';
import senlleiras from './senlleiras';



const store = createStore({
  state: {
    //realtimeDatabase : 'https://senlleiras-especies-default-rtdb.europe-west1.firebasedatabase.app/',
    realtimeDatabase : 'https://altas-senlleiras-default-rtdb.europe-west1.firebasedatabase.app/',//demo
  },
  mutations: {},
  actions: {  
    //Chequeamos si hay un usuario en firebase
    checkAuth({ commit }) {
      //https://firebase.google.com/docs/auth/web/manage-users?authuser=0
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            //console.log(user)
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
    users,
    species,
    senlleiras
  }
})

export default store;

store.dispatch('checkAuth');