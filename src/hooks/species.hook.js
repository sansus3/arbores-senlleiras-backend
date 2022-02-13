import { onMounted,computed } from 'vue';
import { useStore } from 'vuex';
export const getSpecies = () => {
    const store = useStore();
    onMounted(()=>{
      store.dispatch('getListadoEspecies');
    });

    const species = computed(()=>{
        return store.state.species;
    });

    return {
        species
    }
}