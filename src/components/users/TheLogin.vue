<template>
    <div class="text-end">
        <template v-if="isLogin">
            <button @click="doLogin" type="button" class="btn btn-outline-light me-2">Login</button>
        </template>
        <template v-else>       
            <button @click="doLogout" type="button" class="btn btn-warning">LogOut</button>
        </template>
    </div>
</template>

<script setup>

import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const isLogin = computed(()=>{
    return store.state.users.user===null;
});


const doLogin = () => {
   router.push({name:'Login'});
}

const doLogout = async () => {
    try {
        await store.dispatch('users/doLogout');
        router.push({name:'Home'});
    } catch (error) {
        console.log(error);
    }   
}
</script>