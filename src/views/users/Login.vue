<template>
    
    <main v-if="isLogin" class="mt-5 text-center d-flex justify-content-center align-items-center">
        <form class="form-signin" @submit.prevent="signIn">
            
            <img class="mb-4" src="../../assets/logo.jpg" alt height="57" />
            <h1 class="h3 mb-3 fw-normal">Acceso</h1>

            <div class="form-floating mb-1">
                <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="nombre@ejemplo.com"
                    v-model.trim="userData.email"
                />
                <label for="floatingInput">Correo electrónico</label>
            </div>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Contraseña"
                    v-model.trim="userData.password"
                />
                <label for="floatingPassword">Contraseña</label>
            </div>

            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" v-model="userData.checkbox" /> Recordarme
                </label>
            </div>
            
            <button :disabled="disabled" class="w-100 btn btn-lg btn-primary" type="submit">Acceso</button>
            <p class="mt-5 mb-3 text-muted">© Santiago Sustentable III</p>

            <loader-component :visibleBool="isLoading"></loader-component>
        </form>       
    </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import LoaderComponent from '@/components/LoaderComponent.vue';
const store = useStore();
const router = useRouter();
const userData = reactive({
    email: 'arboresenlleira@gmail.com',
    password: 'apdtmMdp27042304()',
    checkbox: false,
});
const isLogin = computed(()=>{
    return store.state.users.user===null;
});
const isLoading = ref(false);
//computados
const disabled = computed(() => !userData.email.length || !userData.password);
//Métodos
const signIn = async () => {
    //console.log(user)
    isLoading.value = true;
    try {
        await store.dispatch('users/doLogin', userData);
        userData.password = userData.email = "";
        userData.checkbox = false;
        router.push({name:'Home'});
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Ohhhhh, ${errorCode}: ${errorMessage}`);
    }   finally{
        isLoading.value = false;
    }
}
</script>