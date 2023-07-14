<template>
  <v-container class="carrito-container">
    <h2 class="carrito-title">Bolsa de Compras</h2>
    <div class="carrito-pagar">
      <v-btn color="black" dark @click="pagar">
        Pagar
      </v-btn>
    </div>
    <hr class="carrito-separator">
    <v-row>
      <v-col v-for="producto in carrito" :key="producto.id" cols="12" md="3">
        <v-card class="carrito-card v-card--flat">
          <v-img :src="producto.image" alt="Producto" aspect-ratio="1">
            <v-btn icon class="carrito-delete" @click="confirmRemoveFromCart(producto.id)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-img>
          <v-card-title>{{ producto.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <div class="mt-7">
      <p>Subtotal: <span class="total-carrito">${{ subtotal.toLocaleString("en-US") }}</span></p>
      <p>Descuentos: <span class="total-carrito">${{ descuentos.toLocaleString("en-US") }}</span></p>
      <p>Total: <span class="total-carrito">${{ totalCarrito.toLocaleString("en-US") }}</span></p>
    </div>

    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirmación</v-card-title>
        <v-card-text>
          ¿Estás seguro de que quieres eliminar este producto del carrito?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="removeFromCart(confirmedItem)">Sí</v-btn>
          <v-btn color="error" @click="dialogVisible = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
  
<script>
export default {
  name: 'CarritoView',
  data() {
    return {
      dialogVisible: false,
      confirmedItem: null,
    };
  },
  computed: {
    carrito() {
      return this.$store.state.carrito.map((producto) => ({
        ...producto,
        image: producto.image, // Ruta de la imagen del producto en el archivo JSON
      }));
    },
    subtotal() {
      return this.carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
    },
    descuentos() {
      if (this.subtotal < 500) {
        return Math.round(this.subtotal * 0.05);
      } else {
        return Math.round(this.subtotal * 0.11);
      }
    },
    totalCarrito() {
      return this.subtotal - this.descuentos;
    },
  },
  methods: {
    confirmRemoveFromCart(productId) {
      this.confirmedItem = productId;
      this.dialogVisible = true;
    },
    removeFromCart(productId) {
      this.$store.commit('REMOVE_FROM_CART', productId);
      this.dialogVisible = false;
    },
    redirectToCarrito() {
      this.$router.push('/carrito');
    },
    pagar() {
      // Lógica para realizar el pago
      this.$router.push({ name: 'Carrito' });
    },
  },
};
</script>
  
<style scoped>
.total-carrito {
  font-weight: bold;
  color: blue;
}

.carrito-title {
  text-align: center;
  margin-top: 20px;
}

.carrito-pagar {
  text-align: center;
  margin: 10px auto;
  /* Centra el botón horizontalmente y añade un espacio vertical de 10px */
}

.carrito-container {
  border: 1px solid #ccc;
  /* Añade un borde negro de 1px de ancho al contenedor */
  padding: 10px;
  /* Añade un espacio interno de 10px */
}

.carrito-card {
  margin-bottom: 20px;
}

.carrito-delete {
  position: absolute;
  top: 10px;
  right: 10px;
}

.carrito-separator {
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-top: 1px solid #ccc;
  /* Añade una línea gris en la parte superior */
}</style>
  