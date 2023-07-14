<template>
  <v-container class="ropahombre__container">
    <v-row>
      <v-col cols="12" md="5">
        <carrito-tabla :items="carrito" />
      </v-col>
      <v-col cols="12" md="7">
        <v-row class="ropahombre__row">
          <v-col cols="12" sm="6" md="4" class="ropahombre__col" v-for="producto in ropaHombre" :key="producto.id">
            <v-card class="ropahombre__card">
              <v-img :src="producto.image" class="ropahombre__img" contain></v-img>
              <v-card-title class="ropahombre__title justify-center">
                {{ producto.title }}
              </v-card-title>
              <v-card-subtitle class="ropahombre__subtitle">
                <div class="ropahombre__description">{{ producto.description }}</div>
              </v-card-subtitle>
              <v-card-actions class="ropahombre__actions">
                <div class="ropahombre__prices">
                  <div class="ropahombre__promo-price">Promo: ${{ producto.price }}</div>
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
  name: "RopaHombre",
  components: {
    'carrito-tabla': CarritoTabla,
  },
  data() {
    return {
      snackbarVisible: false, // Estado para controlar la visibilidad del Snackbar
      snackbarText: '', // Texto del Snackbar
      snackbarColor: 'success', // Color del Snackbar
      snackbarTimeout: 3000, // Duración del Snackbar en milisegundos
    };
  },
  computed: {
    ropaHombre() {
      return this.$store.state.ropaHombre;
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
    this.$store.dispatch('fetchRopaHombre');
  },
}
</script>


<style scoped>
.ropahombre__container {
  max-width: 90%;
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

.ropahombre__title {
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}

.ropahombre__price {
  text-decoration: line-through;
  color: grey;
  margin-bottom: 8px;
}

.ropahombre__promo-price {
  color: rgb(82, 79, 79);
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

.ropahombre__description {
  max-height: 7em;
  overflow: auto;
}
</style>
