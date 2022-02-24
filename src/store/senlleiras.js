//Ruta en firebase del proyecto
const SENLLEIRAS = 'https://arbores-senlleiras-b52f1-default-rtdb.europe-west1.firebasedatabase.app/';

//Objecto
const SENLLEIRA = {
    idSpecie: '',
    nombreComun:'',
    nombreReferencia:'',
    genus: '',
    specie: '',
    provincia: 'A Coruña',
    lugar: '',
    concello: '',
    location: { latitude: '', longitude: ''},
    nombrePila: '',
    apellidos: '',
    comentarios: '',
    email: '',
}


const state = {
    senlleiras: [],
    senlleira: {...SENLLEIRA},
}

const mutations = {
    listSenlleiras(state,payload){
        state.senlleiras = payload;
    },
    confirmToggle(state,payload){
        const index = state.senlleiras.findIndex(el=>el.id===payload.id);
        state.senlleiras[index].confirmado = payload.confirm;
    },
    setSenlleira(state,payload){
        // state.senlleira = state.senlleiras.reduce((acumulador,actual)=>actual.id===payload?actual:acumulador,{});
        const senlleira = state.senlleiras.find(element=>element.id===payload);
        const clone = {...SENLLEIRA};
        //console.log(clone)
        for(let key in senlleira){
            clone[key]=senlleira[key];
        }
        state.senlleira = clone;
    },
    updateSenlleira(state,payload){
        state.specie = payload;
    }
}

const actions = {
    async listSenlleiras(context) {
        const response = await fetch(`${SENLLEIRAS}senlleiras.json`,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            });
        const data = await response.json();
        if(data)
            context.commit('listSenlleiras', Object.values(data));
    },
    async confirmToggle({commit},{id,confirm}){
        const response = await fetch(`${SENLLEIRAS}senlleiras/${id}.json`,
        {
            method: 'PATCH',
            headers: {
                'Cotent-Type' : 'application/json'
            },
            body :
                JSON.stringify({'confirmado':confirm})
        });
        commit('confirmToggle',{id,confirm});
    },
    async updateSenlleira({commit},obj){
        await fetch(
            `${SENLLEIRAS}senlleiras/${obj.id}.json`,
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
    setSenlleira({commit},id){
        commit('setSenlleira',id);
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions,
}