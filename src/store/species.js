import router from '@/router';//Esta línea no está en el original. Nos permite manipular las rutas
const SPECIE = {
    id: null,
    specie: '',
    genus: '',
    names: [],
    hojaPerenne: false, //false hoja caduca
    ginnospermas: false,//false angiospermas
    altura: '', //String por si meten medidas como "20-30 cm"
    diametro: '', //String por si meten medidas,
    distribucion:'',//distribución geográfica
    descriptio: ''
}
const state = {
    species: [], //Listado de especies para el catálogo
    speciesFilter: [],
    specie: { ...SPECIE },
}

const mutations = {
    listadoEspecies(state, payload) {
        state.species = Object.values(payload);
    },
    setEspecie(state, payload) {
        
        state.specie = state.species.find(spe => spe.id == payload);
        //console.log(state.specie)
    },
    actualizarEspecie(state, payload) {
        state.specie = payload;
    },
    eliminarEspecie(state, payload) {
        state.species = state.species.filter(el => el.id !== payload);
        router.push('/catalogo');//router es importado
    },
    resetSpecie(state) {
        state.specie = { ...SPECIE };
    },
    insertarEspecie(state, payload) {
        state.species.push(payload);
        state.specie = { ...SPECIE };
        router.push('/catalogo');//router es importado
    },
}

const actions = {
    //Listado de especies
    async getListadoEspecies({ commit,rootState }) {        
        const response = await fetch(
            `${rootState.realtimeDatabase}species.json`,
            {
                method: 'GET', // Lectura de datos
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        if(data)
            commit('listadoEspecies', data);
    },
    //rellenar el objeto specie a partir de un código dado
    setSpecie(context, id) {
        context.commit('setEspecie', id);
    },
    //Actualización de la especie
    async updateSpecie({ commit,rootState }, objSpecie) {
        await fetch(
            `${rootState.realtimeDatabase}species/specie-${objSpecie.id}.json`,
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
    //Eleminación de especie
    async deleteSpecie({ commit,rootState }, id) {
        await fetch( 
            `${rootState.realtimeDatabase}species/specie-${id}.json`,
            {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        commit('eliminarEspecie', id);
    },
    //reseteamos specie
    resetSpecie({ commit }) {
        commit('resetSpecie');
    },
    //Insertar una nueva especie
    async insertSpecie({ commit,rootState }, objTree) {
        await fetch(
            `${rootState.realtimeDatabase}species/specie-${objTree.id}.json`,
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
    setSpeciesGenusSort({commit,state}){
        state.speciesFilter = state.species;
        state.speciesFilter.sort((x, y) => x.genus.localeCompare(y.genus))
    }
}

const getters = {
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}