<template>
  <v-container class="electronicaprod__container">
    <v-row class="electronicaprod__row">
      <v-col cols="12" sm="6" md="4" class="electronicaprod__col" v-for="producto in electronica" :key="producto.id">
        <v-card class="electronicaprod__card">
          <v-img :src="producto.image" class="electronicaprod__img" contain></v-img>
          <v-card-title class="electronicaprod__title justify-center">{{ producto.title }}</v-card-title>
          <v-card-subtitle class="electronicaprod__subtitle">{{ producto.description }}</v-card-subtitle>
          <v-card-actions class="electronicaprod__actions">
            <div class="electronicaprod__prices">
               <div class="electronicaprod__promo-price">Promo: ${{ producto.price }}</div>
            </div>
            <v-btn color="primary" @click="addToCart(producto)" class="electronicaprod__button">Agregar al Carrito</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ElectronicaComp',
  data() {
    return {
      electronica: [],
    };
  },
  methods: {
    addToCart(producto) {
      this.$store.dispatch('addToCart', producto);
    },
  },
  async created() {
    try {
      const response = await axios.get('/electronica.json');
      this.electronica = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.electronicaprod__container {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.electronicaprod__card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.electronicaprod__img {
  height: 200px;
}
.electronicaprod__title {
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}
.electronicaprod__price {
  text-decoration: line-through;
  color: grey;
  margin-bottom: 8px;
}
.electronicaprod__promo-price {
  color: red;
  font-weight: bold;
  margin-bottom: 8px;
}
.electronicaprod__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.electronicaprod__button {
  margin-top: auto;
}
</style>
