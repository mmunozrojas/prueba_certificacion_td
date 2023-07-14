<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="carrito"
      :items-per-page="5"
      class="elevation-1"
      :no-data-text="'No hay productos en el carrito'"
    >
    <template v-slot:[`item.precio`]="{ item }">
        ${{ item.price }}
      </template>
      <template v-slot:[`item.total`]="{ item }">
        ${{ item.price * item.cantidad }}
      </template>
    </v-data-table>
    <div>
    <p>Total: <span class="total-carrito">${{ totalCarrito.toLocaleString("en-US") }}</span></p>
  </div>
  </v-container>
</template>

<script>
export default {
  name: 'CarritoView',
  computed: {
    carrito() {
      return this.$store.state.carrito;
    },
    headers() {
      return [
        { text: 'Nombre del Producto', value: 'title' },
        { text: 'Precio', value: 'price' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Total', value: 'total' },
      ];
    },
    totalCarrito() {
      return this.carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
    },
  },
};
</script>

<style scoped>
.total-carrito {
  font-weight: bold;
  color: blue;
}
</style>