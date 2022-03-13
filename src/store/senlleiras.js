//Dependencia router/index.js
import router from '@/router';

//Objecto
const SENLLEIRA = {
    idSpecie: '',
    id: '',
    nombreComun: '',
    confirmado: false,
    nombreReferencia: '',
    genus: '',
    specie: '',
    altura: '', //String por si meten medidas como "20-30 cm"
    diametro: '', //String por si meten medidas
    edadEstimada: 0, //Edad estimada de la senlleira
    provincia: 'A Coruña',
    lugar: '',
    concello: '',
    location: { latitude: '', longitude: '' },
    nombrePila: '',
    apellidos: '',
    comentarios: '',
    email: '',
}


const state = {
    senlleiras: [],
    senlleira: { ...SENLLEIRA },
}

const mutations = {
    listSenlleiras(state, payload) {
        state.senlleiras = payload;
    },
    confirmToggle(state, payload) {
        const index = state.senlleiras.findIndex(el => el.id === payload.id);
        state.senlleiras[index].confirmado = payload.confirm;
    },
    setSenlleira(state, payload) {
        // state.senlleira = state.senlleiras.reduce((acumulador,actual)=>actual.id===payload?actual:acumulador,{});
        const senlleira = state.senlleiras.find(element => element.id === payload);
        const clone = { ...SENLLEIRA };
        //console.log(clone)
        for (let key in senlleira) {
            clone[key] = senlleira[key];
        }
        state.senlleira = clone;
    },
    updateSenlleira(state, payload) {
        state.senlleira = payload;
    },
    deleteSenlleira(state, payload) {
        state.senlleiras = state.senlleiras.filter(el => el.id !== payload);
        router.push('/Senlleiras');//router es importado
    }
}

const actions = {
    async listSenlleiras(context) {
        const response = await fetch(`${context.rootState.realtimeDatabase}senlleiras.json`,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            });
        const data = await response.json();
        if (data)
            context.commit('listSenlleiras', Object.values(data));
    },
    async confirmToggle({ commit,rootState }, { id, confirm }) {
        const response = await fetch(`${rootState.realtimeDatabase}senlleiras/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Cotent-Type': 'application/json'
                },
                body:
                    JSON.stringify({ 'confirmado': confirm })
            });
        commit('confirmToggle', { id, confirm });
    },
    async updateSenlleira({ commit,rootState }, obj) {
        await fetch(
            `${rootState.realtimeDatabase}senlleiras/${obj.id}.json`,
            {
                method: 'PATCH', // Editar datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
        );
        commit('updateSenlleira', obj);
    },
    async deleteSenlleira({ commit,rootState }, { id }) {
        if (id) {
            await fetch(
                `${rootState.realtimeDatabase}senlleiras/${id}.json`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            commit('deleteSenlleira', id);
        }
    },
    setSenlleira({ commit }, id) {
        commit('setSenlleira', id);
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions,
}