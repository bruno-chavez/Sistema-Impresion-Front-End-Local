<template>
    <div>
        <div style="height: 30px"></div>

        <div style="margin-left: 40px">
            <img src="./assets/img/logo.png" width="50%" alt="logo"/>
        </div>

        <div style="height: 30px"></div>

        <div>
            <mdb-navbar color="indigo" dark>
                <mdb-navbar-brand>Sistema de Impresiones</mdb-navbar-brand>
                <mdb-navbar-toggler>
                    <mdb-navbar-nav>
                        <template v-if="session === 'none'">
                            <router-link to="/" class="nav-bar-item">
                                <mdb-nav-item active>
                                    Entrar
                                </mdb-nav-item>
                            </router-link>
                        </template>

                        <template v-else>
                            <router-link to="/student/dashboard" class="nav-bar-item">
                                <mdb-nav-item>
                                    Inicio
                                </mdb-nav-item>
                            </router-link>

                            <router-link to="/logout" class="nav-bar-item">
                                <mdb-nav-item>
                                    Salir
                                </mdb-nav-item>
                            </router-link>
                        </template>
                    </mdb-navbar-nav>
                </mdb-navbar-toggler>
            </mdb-navbar>

            <router-view/>

            <mdb-footer color="indigo" class="font-small pt-4 mt-4">
                <mdb-container class="text-left">
                    <mdb-row>
                        <mdb-col sm="8">
                            <h5 class="title"></h5>
                            <p>Para dudas o consultas contactarse con administrador.</p>
                        </mdb-col>
                        <mdb-col sm="2">
                            <h5 class="title"></h5>
                            <ul>
                                <li class="list-unstyled"></li>
                            </ul>
                        </mdb-col>
                    </mdb-row>
                </mdb-container>
                <div class="footer-copyright text-center py-3">
                    <mdb-container fluid>
                        &copy; 2019 ISW: Rusty Nail
                    </mdb-container>
                </div>
            </mdb-footer>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import {eventBus} from "./eventBus";
  import {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbInput,
    mdbFooter,
    mdbContainer,
    mdbRow,
    mdbCol
  } from 'mdbvue';

  export default {
    components: {
      mdbInput,
      mdbNavbar,
      mdbNavbarBrand,
      mdbDropdownToggle,
      mdbNavbarToggler,
      mdbDropdownItem,
      mdbNavbarNav,
      mdbNavItem,
      mdbDropdown,
      mdbDropdownMenu,
      mdbFooter,
      mdbContainer,
      mdbRow,
      mdbCol
    },
    data() {
      return {
        session: '',
      }
    },
    methods: {
      async checkSession() {
        let res = await axios.get(`${process.env.VUE_APP_BACKEND}/auth/session`, {withCredentials: true});
        this.session = res.data.message
      }
    },
    async created() {
      this.checkSession();
      eventBus.$on('check', () => {
        this.checkSession()
      });
    }
  }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .nav-bar-item {
        color: white;
    }

    .nav-bar-item :hover {
        color: white;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: white;
    }

    #nav a.router-link-exact-active {
        color: white;
    }
</style>
