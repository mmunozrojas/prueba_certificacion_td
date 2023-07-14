<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="4" v-for="(tipo, index) in tiposProductos" :key="index">
          <v-card class="tipos-producto__card" @click="redirigirACategoria(tipo.name)">
            <v-img :src="tipo.image" class="tipos-producto__image"></v-img>
            <v-card-title>{{ tipo.name }}</v-card-title>
            <v-card-text>{{ tipo.text }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "TiposProductoComp",
    computed: {
      tiposProductos() {
        return this.$store.state.home.tiposproductos;
      },
    },
    methods: {
      redirigirACategoria(categoria) {
        let rutaCategoria = categoria.toLowerCase().replace("'", "").replace(" ", "-");
        this.$router.push(`/${rutaCategoria}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .tipos-producto__card {
    width: 70%;
    margin: 20px;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }
  
  .tipos-producto__card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .tipos-producto__image {
    height: 200px;
    object-fit: cover;
  }
  </style>
  