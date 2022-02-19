<template>
    <main class="mt-5 text-center d-md-flex justify-content-center align-items-center">
        <form class="form-signin" @submit.prevent="signIn">
            <img
                class="mb-4"
                src="../../assets/logo.jpg"
                alt
                
                height="57"
            />
            <h1 class="h3 mb-3 fw-normal">Acceso</h1>

            <div class="form-floating mb-1">
                <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="nombre@ejemplo.com"
                    v-model.trim="user.email"
                />
                <label for="floatingInput">Correo electrónico</label>
            </div>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Contraseña"
                    v-model.trim="user.password"
                />
                <label for="floatingPassword">Contraseña</label>
            </div>

            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" v-model="user.checkbox" /> Recordarme
                </label>
            </div>
            <button :disabled="disabled" class="w-100 btn btn-lg btn-primary" type="submit">Acceso</button>
            <p class="mt-5 mb-3 text-muted">© Santiago Sustentable III</p>
        </form>
    </main>
</template>

<script setup>
    import { reactive,computed } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const user = reactive({
        email: '',
        password: '',
        checkbox: false,
    });
    //computados
    const disabled = computed(()=>!user.email.length||!user.password);
    //Métodos
    const signIn = () => {
        console.log(user)
    }
</script>