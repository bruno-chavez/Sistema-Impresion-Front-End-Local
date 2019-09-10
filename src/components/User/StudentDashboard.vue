<template>
    <div class="container" style="align-content: center; margin:0 auto;">
        <h4>Actualmente te quedan {{info.pages}} páginas</h4>
        <h4>Actualmente tienes {{info.docs}} documentos</h4>
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
                            <mdb-btn v-on:click="printFile(doc.title, doc.pages)" type="button">Imprimir</mdb-btn>
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
        info: {
          pages: 0,
          docs: 0
        }
      }
    },
    methods: {
      async updatePages() {
        let res = await axios.get(`${process.env.VUE_APP_BACKEND}/student/info`, {withCredentials: true});
        this.info.pages = res.data.pages;
        this.info.docs = res.data.docs;
      },
      async printFile(title, pages) {

        if (this.pages < pages) {
          alert('No tienes suficientes pagines para imprimir este documento');
          return
        }

        if (!window.confirm('Seguro que desea imprimir este documente')) {
          return
        }

        await this.updatePages();
        window.open(`${process.env.VUE_APP_BACKEND}/file/fetch/print/${title}`)
      }
    },
    async created() {
      this.updatePages();
      let documents = await axios.get(`${process.env.VUE_APP_BACKEND}/file/info`, {withCredentials: true});
      this.documents = documents.data.documents;
    }
  }
</script>

<style scoped>
</style>
