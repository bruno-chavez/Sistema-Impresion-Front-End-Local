<template>
    <div id="login" style="width:50%; margin:0 auto;">
        <form>
            <div style="height: 20px"></div>
            <p class="h4 text-center mb-4">Identificación</p>
            <div class="grey-text">
                <mdb-input label="Correo Electronico"
                           icon="envelope"
                           type="email"
                           name="email"
                           v-model="input.email"
                           required/>
                <mdb-input label="Contraseña"
                           icon="lock"
                           type="password"
                           name="password"
                           v-model="input.password"
                           required/>
            </div>
            <div class="text-center">
                <mdb-btn type="button" v-on:click="login()">Login</mdb-btn>
            </div>

        </form>
    </div>
</template>

<script>
  import axios from 'axios';
  import {mdbInput, mdbBtn} from 'mdbvue';

  export default {
    name: 'studentLogin',
    components: {
      mdbInput,
      mdbBtn
    },
    data() {
      return {
        input: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async login() {
        let res = await axios.post(`${process.env.VUE_APP_BACKEND}/student/login`, this.input, {withCredentials: true});
        if (res.data.message === 'Authenticated') {
          this.$router.push({name: 'userDashboard'})
        } else {
          console.log(res.data)
        }
      }
    }
  }
</script>
