export default {
    state : {
        user : null
    },
    mutations : {
        setUser(state,payload){
            //console.log(payload)
            state.user = payload;
        },
        doLogout(state){
            state.user = null;
        }
    },
    actions : {
        setUser({commit},user){
            console.log(user)
            // console.log(user);
            commit('setUser',user);
        },
        doLogout({commit}){
            //console.log('dologout')
            commit('doLogout');
        }
    },
    getters : {

    },
}