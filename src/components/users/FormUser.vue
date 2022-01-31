<template>
    <form role="form" @submit.prevent="procesar({ email: registro.email, password: registro.pwd })">
        <div class="form-group">
            <label for="email">Correo electrónico:</label>
            <input
                v-model="registro.email"
                type="email"
                class="form-control"
                id="email"
                aria-describedby="err_1"
                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
            />
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input
                v-model="registro.pwd"
                type="password"
                class="form-control"
                id="pwd"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                title="Mínimo ocho caracteres, al menos una letra, un número y un carácter especial"
                aria-describedby="msgpwd"
            />
        </div>

        <div
            id="msgpwd"
            class="alert alert-primary mt-3"
            role="alert"
        >Mínimo ocho caracteres, al menos una letra, un número y un carácter especial.</div>

        <template v-if="user && user.error && user.error.errors.length">
            <div
            id="msgpwd"
            class="alert alert-danger mt-3"
            role="alert"
            >   {{errorMsg[user.error.message]}}
            </div>
        </template>

        <button :disabled="btnActivate" type="submit" class="btn btn-dark">Submit</button>
    </form>
</template>

<script>
import { mapActions,mapState } from "vuex";
export default {
    name: 'FormUser',
    data() {
        return {
            registro: {
                email: 'gonzaleztenreiro@gmail.es',
                pwd: 'Tq0xuxvBMs?',
            },
            errorMsg: {
                'INVALID_PASSWORD': 'Contraseña incorrecta',
                'EMAIL_NOT_FOUND': 'Contraseña no encontrada'
            },
            //RegEx email según w3.org
            expReg: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        }
    },
    computed: {
        ...mapState(['user']),
        btnActivate() {
            if (this.expReg.test(this.registro.email) && this.registro.pwd.length !== 0)
                return false;
            return true;
        }
    },
    methods: {
        ...mapActions(['userLogin']),
        procesar(user) {
            this.userLogin(user);
            this.registro = {  //Limpiamos
                email: '',
                pwd: '',
            }
        }
    },

}
</script>