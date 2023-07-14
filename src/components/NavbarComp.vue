<template>
  <v-app-bar app>
    <v-toolbar-title>Vinos Edutecno</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="d-flex align-center">
      <v-btn text to="/">
        <v-icon v-if="isMobile">mdi-home</v-icon>
        <span v-else>Home</span>
      </v-btn>
      <v-btn text to="/ropa-hombre">
        <v-icon v-if="isMobile">mdi-bottle-wine</v-icon>
        <span v-else>Ropa Hombre</span>
      </v-btn>
      <v-btn text to="/ropa-mujer">
        <v-icon v-if="isMobile">mdi-glass-wine</v-icon>
        <span v-else>Ropa Mujer</span>
      </v-btn>
      <v-btn text to="/electronica">
        <v-icon v-if="isMobile">mdi-sale</v-icon>
        <span v-else>Electrónica</span>
      </v-btn>
      <div class="mt-5">
        <v-switch v-if="!isMobile" v-model="darkMode" label="Modo oscuro" class="mr-3 custom-switch"></v-switch>
        <v-switch v-else v-model="darkMode" class="mr-3 custom-switch"></v-switch>
      </div>
      <v-badge :content="cartCount" class="ma-3" :value="cartCount>0">
        <v-icon @click="goToCart">mdi-cart</v-icon>
      </v-badge>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Navbar-comp",
  data() {
    return {
      isMobile: false,
      darkMode: false,
    };
  },
  computed: {
    ...mapGetters(['cartCount']),
  },
  methods: {
    goToCart() {
      if (this.$route.path !== '/carrito') {
        this.$router.push('/carrito');
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 700;
    },
  },
  watch: {
      darkMode(value) {
        this.$vuetify.theme.dark = value;
      },
    },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>
