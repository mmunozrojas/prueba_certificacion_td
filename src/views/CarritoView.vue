<template>
  <v-container>
    <v-row class="d-flex justify-lg-space-around">
      <v-col cols="12" sm="12" lg="6" md="6">
        <v-card elevation="2" class="my-5 py-5 pa-10">
          <div class="font-weight-bold ml-8 mb-2 text-center text-h5">
            Datos del comprador
          </div>
          <v-form v-model="valid" ref="form">
            <v-text-field v-model="name" :counter="50" label="Nombre" :rules="nameRules" required></v-text-field>
            <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
            <v-text-field v-model="repeatEmail" label="Repetir E-mail" :rules="repeatEmailRules" required></v-text-field>
            <v-text-field v-model="fono" :counter="10" label="Telefono" :rules="fonoRules" required></v-text-field>
            <v-divider class="my-4"></v-divider>
            <div class="font-weight-bold ml-8 mb-2 text-center text-h5">
              Datos de Despacho
            </div>
            <v-text-field v-model="address" :rules="addressRules" :counter="150" label="Dirección"
              required></v-text-field>
            <v-text-field v-model="comuna" :counter="50" label="Comuna" :rules="comunaRules" required></v-text-field>
            <v-divider class="my-4"></v-divider>
            Formas de Pagos
            <template>
              <v-container class="px-0" fluid>
                <v-radio-group v-model="selectedPaymentMethod" :rules="paymentMethodRules">
                  <v-radio v-for="item in items" :key="item" :label="item" :value="item"></v-radio>
                </v-radio-group>
                <v-img
                  src="https://cdn.shopify.com/s/files/1/0013/9935/7503/files/webpay-logo1_faf9fd07-8683-4715-a39b-e990828e3703_large.png?v=1522242608"
                  class="mt-4 payment-image"></v-img>
              </v-container>
            </template>
            <v-btn class="mr-4 primary" @click="submit" :disabled="!valid || !selectedPaymentMethod">
              Confirmar
            </v-btn>
            <v-btn @click="clear">
              Limpiar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" lg="6" md="6">
        <v-container class="mt-2">
          <v-data-table :headers="headers" :items="carrito" :items-per-page="5" class="elevation-1"
            :no-data-text="'No hay productos en el carrito'">
            <template v-slot:[`item.precio`]="{ item }">
              ${{ item.price }}
            </template>
            <template v-slot:[`item.total`]="{ item }">
              ${{ item.price * item.cantidad }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="increaseQuantity(item)">mdi-plus</v-icon>
              <v-icon @click="decreaseQuantity(item)">mdi-minus</v-icon>
              <v-icon @click="confirmRemoveFromCart(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:[`item.image`]="{ item }">
              <v-img :src="item.image" aspect-ratio="1" contain></v-img>
            </template>
          </v-data-table>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CarritoView',
  data() {
    return {
      dialogVisible: false,
      confirmedItem: null,
      valid: false,
      name: '',
      email: '',
      repeatEmail: '',
      fono: '',
      address: '',
      comuna: '',
      selectedPaymentMethod: '',
      items: ['Tarjeta de crédito', 'Transferencia bancaria', 'Webpay', 'Contra Entrega'],
      nameRules: [
        (v) => !!v || 'El nombre es requerido',
        (v) => (v && v.length <= 50) || 'El nombre debe tener menos de 50 caracteres',
        (v) => (/^[A-Za-z\s]+$/).test(v) || 'El nombre sólo puede contener letras',
      ],
      emailRules: [
        (v) => !!v || 'El e-mail es requerido',
        (v) => /.+@.+/.test(v) || 'El e-mail debe ser válido',
      ],
      repeatEmailRules: [
        (v) => !!v || 'Debe repetir el e-mail',
        (v) => v === this.email || 'Los e-mails deben coincidir',
      ],
      fonoRules: [
        (v) => !!v || 'El teléfono es requerido',
        (v) => /^\d+$/.test(v) || 'El teléfono debe contener solo números',
      ],
      addressRules: [
        (v) => !!v || 'La dirección es requerida',
        (v) => (v && v.length <= 150) || 'La dirección debe tener menos de 150 caracteres',
      ],
      comunaRules: [
        (v) => !!v || 'La comuna es requerida',
        (v) => (v && v.length <= 50) || 'La comuna debe tener menos de 50 caracteres',
      ],
      paymentMethodRules: [
        (v) => !!v || 'Debe seleccionar un método de pago',
      ],
    };
  },
  computed: {
    carrito() {
      return this.$store.state.carrito;
    },
    headers() {
      return [
        { text: 'Imagen', value: 'image' },
        { text: 'Nombre del Producto', value: 'title' },
        { text: 'Precio', value: 'price' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Total', value: 'total' },
        { text: 'Acciones', value: 'actions' },
      ];
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
    increaseQuantity(producto) {
      const index = this.carrito.findIndex((item) => item.id === producto.id);
      if (index !== -1) {
        this.carrito[index].cantidad++;
      }
    },
    decreaseQuantity(producto) {
      const index = this.carrito.findIndex((item) => item.id === producto.id);
      if (index !== -1) {
        if (this.carrito[index].cantidad > 1) {
          this.carrito[index].cantidad--;
        }
      }
    },
    confirmRemoveFromCart(producto) {
      this.confirmedItem = producto;
      this.dialogVisible = true;
    },
    removeFromCart(producto) {
      const index = this.carrito.findIndex((item) => item.id === producto.id);
      if (index !== -1) {
        this.carrito.splice(index, 1);
      }
      this.dialogVisible = false;
    },
    submit() {
      if (this.$refs.form.validate()) {
        // Realizar alguna acción con los datos del formulario
        this.$router.push({ name: 'Confirmacion' });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.total-carrito {
  font-weight: bold;
  color: blue;
}

.payment-image {
  width: 50%;
  max-height: 50vh;
  margin: auto;
}
</style>
