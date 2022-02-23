const SENLLEIRAS = 'https://arbores-senlleiras-b52f1-default-rtdb.europe-west1.firebasedatabase.app/';
//Objeto con los campos de una senlleira nueva
const state = {
    senlleiras: []
}
const mutations = {
    listSenlleiras(state,payload){
        state.senlleiras = payload;
    },
    confirmToggle(state,payload){
        const index = state.senlleiras.findIndex(el=>el.id===payload.id);
        state.senlleiras[index].confirmado = payload.confirm;
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
        context.commit('listSenlleiras', Object.values(await response.json()));
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}