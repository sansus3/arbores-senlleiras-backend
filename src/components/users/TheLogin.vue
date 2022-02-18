<template>
    <div class="text-end">
        <template v-if="login">
            <button @click="doLogin" type="button" class="btn btn-outline-light me-2">Login</button>
        </template>
        <template v-else>
            <span class="text-white p-1">Hola {{ user.displayName }} </span>        
            <button @click="doLogout" type="button" class="btn btn-warning">LogOut</button>
        </template>
    </div>
</template>

<script setup>
import { firebaseApp } from "@/hooks/firebase";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { useStore } from "vuex";
import { ref,reactive,onMounted,computed } from "vue";
const provider = new GoogleAuthProvider();
const auth = getAuth();
const store = useStore();


const user = computed(()=>{
    console.log(store.state.users.user)
    return store.state.users.user;
});

const login = computed(()=>user.value===null);

const doLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        store.dispatch('setUser',result.user)
        //console.log(user.email)

    } catch (error) {
        console.error(error);
    }
}

const doLogout = async () => {
    try {
        const result = await signOut(auth);
        store.dispatch('doLogout');
    } catch (error) {
        console.error(`doLogout: ${error.message}`);
    }
}
</script>