<template>
  <v-app>
    <navbar-comp></navbar-comp>
    <v-main>
      <router-view></router-view>
    </v-main>
    <footer-comp></footer-comp>
  </v-app>
</template>

<script>
import NavbarComp from './components/NavbarComp.vue'
import FooterComp from './components/FooterComp.vue'

export default {
  name: "App",
  components: {
    'navbar-comp':NavbarComp,
    'footer-comp':FooterComp,
  }
}
</script>
