<template>
  <v-container class="ropahombre__container">
    <v-row class="ropahombre__row">
      <v-col cols="12" sm="6" md="4" class="ropahombre__col" v-for="producto in ropaHombre" :key="producto.id">
        <v-card class="ropahombre__card">
          <v-img :src="producto.image" class="ropahombre__img" contain></v-img>
          <v-card-title class="ropahombre__title justify-center">{{ producto.title }}</v-card-title>
          <v-card-subtitle class="ropahombre__subtitle">{{ producto.description }}</v-card-subtitle>
          <v-card-actions class="ropahombre__actions">
            <div class="ropahombre__prices">
              <div class="ropahombre__promo-price">Promo: ${{ producto.price }}</div>
            </div>
            <v-btn color="primary" @click="addToCart(producto)" class="ropahombre__button">Agregar al Carrito</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RopaHombre",
  computed: {
    ropaHombre() {
      return this.$store.state.ropaHombre;
    },
  },
  methods: {
    addToCart(producto) {
      this.$store.dispatch('addToCart', producto);
    },
  },
  mounted() {
    this.$store.dispatch('fetchRopaHombre');
  },
}
</script>

<style scoped>
.ropahombre__container {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.ropahombre__card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ropahombre__img {
  height: 200px;
}
.ropahombre__price {
  text-decoration: line-through;
  color: grey;
  margin-bottom: 8px;
}
.ropahombre__promo-price {
  color: red;
  font-weight: bold;
  margin-bottom: 8px;
}
.ropahombre__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ropahombre__button {
  margin-top: auto;
}
</style>
