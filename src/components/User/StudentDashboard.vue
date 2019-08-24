<template>
    <div class="container" style="align-content: center; margin:0 auto;">
        <h4>Actualmente te quedan {{pages}} páginas</h4>
        <div class="row">
            <div class="col-md-6">
                <table class="table">
                    <thead>
                    <tr>
                        <th style="width: 600%">Nombre</th>
                        <th>Páginas</th>
                        <th>Imprimir</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="doc in documents">
                        <td>{{doc.title}}</td>
                        <td>{{doc.pages}}</td>
                        <td>
                            <mdb-btn v-on:click="showFile(doc.title)" type="button">Imprimir</mdb-btn>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import {mdbTbl, mdbTblHead, mdbTblBody, mdbBtn} from 'mdbvue';

  export default {
    name: "userDashboard",
    components: {
      mdbTbl,
      mdbTblHead,
      mdbTblBody,
      mdbBtn
    },
    data() {
      return {
        documents: {},
        pages: 0
      }
    },
    methods: {
      async updatePages() {
        let pages = await axios.get(`${process.env.VUE_APP_BACKEND}/student/pages`, {withCredentials: true});
        this.pages = pages.data.pages;
      },
      async showFile(title) {
        this.updatePages();
        window.open(`${process.env.VUE_APP_BACKEND}/file/fetch/print/${title}`)
      }
    },
    async created() {
      this.updatePages();
      let documents = await axios.get(`${process.env.VUE_APP_BACKEND}/file/titles`, {withCredentials: true});
      this.documents = documents.data.documents;
    }
  }
</script>

<style scoped>
</style>
