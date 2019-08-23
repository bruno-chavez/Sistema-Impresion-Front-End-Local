<template>
    <div id="logout">
        <div style="height: 30px"></div>
        <h1 style="text-align: center">¿Desea cerrar sesión?</h1>

        <div class="text-center">
            <mdb-btn type="button" color="red" v-on:click="logout()">Logout</mdb-btn>
        </div>
    </div>
</template>

<script>
  import axios from 'axios/index';
  import {mdbInput, mdbBtn} from 'mdbvue';

  export default {
    name: 'logout',
      components: {
          mdbInput,
          mdbBtn
      },
    methods: {
      async logout() {
        await axios.delete(`${process.env.VUE_APP_BACKEND}/auth/logout`, {withCredentials: true});
        this.$router.push({name: 'studentLogin'})
      }
    }
  }
</script>
