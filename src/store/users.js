import { auth } from "../hooks/firebase";
import { signInWithEmailAndPassword,signOut  } from "firebase/auth";
export default {
    namespaced: true,
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            //console.log(payload)
            state.user = payload;
        },
        doLogout(state) {
            state.user = null;
        }
    },
    actions: {
        async doLogin({ commit }, { email, password }) {
            //console.log(email, password);
            const response = await signInWithEmailAndPassword(auth, email, password);
            commit('setUser', response.user);
            //console.log('ok')
        },
        async doLogout({ commit }) {
            await signOut(auth);
            //console.log('dologout')
            commit('doLogout');
        }
    },
    getters: {},
}