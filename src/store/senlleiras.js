const SENLLEIRAS = 'https://arbores-senlleiras-b52f1-default-rtdb.europe-west1.firebasedatabase.app/';
//Objeto con los campos de una senlleira nueva
const state = {
    senlleiras: []
}
const mutations = {
    listSenlleiras(state,payload){
        state.senlleiras = payload;
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

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}