<template>
  <v-container class="electronicaprod__container">
    <v-row>
      <v-col cols="12" md="5">
        <carrito-tabla :items="carrito" />
      </v-col>
      <v-col cols="12" md="7">
        <v-row class="electronicaprod__row">
          <v-col cols="12" sm="6" md="4" class="electronicaprod__col" v-for="producto in electronica" :key="producto.id">
            <v-card class="electronicaprod__card">
              <v-img :src="producto.image" class="electronicaprod__img" contain></v-img>
              <v-card-title class="electronicaprod__title justify-center">{{ producto.title }}</v-card-title>
              <v-card-subtitle class="electronicaprod__subtitle">
                <div class="electronicaprod__description">{{ producto.description }}</div>
              </v-card-subtitle>
              <v-card-actions class="electronicaprod__actions">
                <div class="electronicaprod__prices">
                  <div class="electronicaprod__promo-price">Promo: ${{ producto.price }}</div>
                </div>
                <v-btn color="primary" @click="addToCart(producto)">
                  Agregar al Carrito
                  <v-snackbar v-model="snackbarVisible" :timeout="snackbarTimeout" :color="snackbarColor">
                    {{ snackbarText }}
                  </v-snackbar>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CarritoTabla from '../components/CarritoTabla.vue';
import axios from 'axios';

export default {
  name: 'ElectronicaComp',
  components: {
    'carrito-tabla': CarritoTabla,
  },
  data() {
    return {
      snackbarVisible: false, // Estado para controlar la visibilidad del Snackbar
      snackbarText: '', // Texto del Snackbar
      snackbarColor: 'success', // Color del Snackbar
      snackbarTimeout: 3000, // Duración del Snackbar en milisegundos
      electronica: [],
    };
  },
  computed: {
    carrito() {
      return this.$store.state.carrito;
    },
  },
  methods: {
    addToCart(producto) {
      this.$store.dispatch('addToCart', producto).then(() => {
        let title = producto.title;
        if (title.length > 40) {
          title = title.slice(0, 40) + "...";
        }
        const mensaje = `Producto "${title}" agregado al carrito`;
        this.showSnackbar(mensaje, 'info'); // Mostrar el Snackbar con el mensaje deseado
      });
    },
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbarVisible = true;
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
  max-width: 90%;
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
  color: rgb(82, 79, 79);
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

.electronicaprod__description {
  max-height: 7em;
  overflow: auto;
}
</style>
