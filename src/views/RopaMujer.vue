<template>
  <v-container class="ropamujer__container">
    <v-row class="ropamujer__row">
      <v-col cols="12" sm="6" md="4" class="ropamujer__col" v-for="producto in ropaMujer" :key="producto.id">
        <v-card class="ropamujer__card">
          <v-img :src="producto.image" class="ropamujer__img" contain></v-img>
          <v-card-title class="ropamujer__title justify-center">{{ producto.title }}</v-card-title>
          <v-card-subtitle class="ropamujer__subtitle">{{ producto.description }}</v-card-subtitle>
          <v-card-text class="ropamujer__text">
            <div class="ropamujer__characteristic" v-for="caracteristica in producto.caracteristicas" :key="caracteristica">{{ caracteristica }}</div>
          </v-card-text>
          <v-card-actions class="ropamujer__actions">
            <div class="ropamujer__prices">
              <div class="ropamujer__promo-price">Promo: ${{ producto.price }}</div>
            </div>
            <v-btn color="primary" @click="addToCart(producto)" class="ropamujer__button">Agregar al Carrito</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RopaMujer",
  computed: {
    ropaMujer() {
      return this.$store.state.ropaMujer;
    },
  },
  methods: {
    addToCart(producto) {
      this.$store.dispatch('addToCart', producto);
    },
  },
  mounted() {
    this.$store.dispatch('fetchRopaMujer');
  },
}
</script>

<style scoped>
.ropamujer__container {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.ropamujer__card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ropamujer__img {
  height: 200px;
}
.ropamujer__price {
  text-decoration: line-through;
  color: grey;
  margin-bottom: 8px;
}
.ropamujer__promo-price {
  color: red;
  font-weight: bold;
  margin-bottom: 8px;
}
.ropamujer__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ropamujer__button {
  margin-top: auto;
}

.ropamujer__title{
  text-align: center;
}
</style>
