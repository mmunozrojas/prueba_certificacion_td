<template>
  <v-container class="ropamujer__container">
    <v-row>
      <v-col cols="12" md="5">
        <carrito-tabla :items="carrito" />
      </v-col>
      <v-col cols="12" md="7">
        <v-row class="ropamujer__row">
          <v-col cols="12" sm="6" md="4" class="ropamujer__col" v-for="producto in ropaMujer" :key="producto.id">
            <v-card class="ropamujer__card">
              <v-img :src="producto.image" class="ropamujer__img" contain></v-img>
              <v-card-title class="ropamujer__title justify-center">{{ producto.title }}</v-card-title>
              <v-card-subtitle class="ropamujer__subtitle">
                <div class="ropamujer__description">{{ producto.description }}</div>
              </v-card-subtitle>
              <v-card-text class="ropamujer__text">
                <div class="ropamujer__characteristic" v-for="caracteristica in producto.caracteristicas" :key="caracteristica">{{ caracteristica }}</div>
              </v-card-text>
              <v-card-actions class="ropamujer__actions">
                <div class="ropamujer__prices">
                  <div class="ropamujer__promo-price">Promo: ${{ producto.price }}</div>
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

export default {
  name: "RopaMujer",
  components: {
    'carrito-tabla': CarritoTabla,
  },
  data() {
    return {
      snackbarVisible: false, // Estado para controlar la visibilidad del Snackbar
      snackbarText: '', // Texto del Snackbar
      snackbarColor: 'sucess', // Color del Snackbar
      snackbarTimeout: 3000, // Duración del Snackbar en milisegundos
    };
  },
  computed: {
    ropaMujer() {
      return this.$store.state.ropaMujer;
    },
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
  mounted() {
    this.$store.dispatch('fetchRopaMujer');
  },
}
</script>


<style scoped>
.ropamujer__container {
  max-width: 90%;
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
  color: rgb(82, 79, 79);
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

.ropamujer__title {
  text-align: center;
}

.ropamujer__description {
  max-height: 7em;
  overflow: auto;
}

.v-snack__wrapper {
        max-width: none;
    }
</style>
