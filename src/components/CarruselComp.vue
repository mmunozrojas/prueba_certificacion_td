<template>
    <v-container class="carousel__container">
      <v-carousel cycle hide-delimiters height="400" class="carousel__carousel">
        <v-carousel-item v-for="(producto, index) in mejoresProductos" :key="index">
          <v-sheet height="100%" class="carousel__item d-flex align-center justify-center">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6">
                <v-img :src="producto.image" class="carousel__image" contain></v-img>
                <h3 class="carousel__title">{{ producto.title }}</h3>
              </v-col>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "CarruselComp",
    computed: {
      mejoresProductos() {
        return this.$store.state.home.mejoresproductos;
      },
    },
  };
  </script>
  
  <style scoped>
  .carousel__container {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .carousel__carousel {
    margin-top: 40px;
  }
  
  .carousel__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  
  .carousel__item.d-flex.align-center.justify-center {
    align-items: center;
    justify-content: center;
  }
  
  .carousel__image {
    height: 250px;
  }
  
  .carousel__title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
  }
  </style>
  