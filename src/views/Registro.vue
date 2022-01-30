<template>
    <section class="section container">
        <h2 class="section__title display-3">Registro</h2>
        <form role="form" @submit.prevent="procesar">
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
                >
            </div>
            <div class="form-group">
                <label for="pwd-repeat">Repita el password:</label>
                <input
                    v-model="registro.pwdRepeat"
                    type="password"
                    class="form-control"
                    id="pwd-repeat"
                />
            </div>
            <div
                id="msgpwd"
                class="alert alert-primary mt-3"
                role="alert"
            >Mínimo ocho caracteres, al menos una letra, un número y un carácter especial.</div>
           
            <button :disabled="btnActivate" type="submit" class="btn btn-dark">Submit</button>
        </form>
    </section>
</template>

<script>
import {mapActions} from "vuex";
export default {
    data() {
        return {
            registro: {
                email: 'gonzaleztenreiro@gmail.com',
                pwd: 'Tq0xuxvBMs?',
                pwdRepeat: 'Tq0xuxvBMs?',
            },
            //RegEx email según w3.org
            expReg: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        }
    },
    computed: {
        btnActivate() {
            if (this.expReg.test(this.registro.email) && this.registro.pwd.length!==0 && this.registro.pwd===this.registro.pwdRepeat)
                return false;
            return true;
        }
    },
    methods: {
        ...mapActions(['userRegister']),
        procesar(){
            this.userRegister(this.registro);
            this.registro = {
                email: '',
                pwd: '',
                pwdRepeat: '',
            }
        }
    },

}
</script>