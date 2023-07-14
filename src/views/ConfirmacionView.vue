<template>
  <v-card class="mx-auto mt-5" max-width="400">
    <v-img
      src="http://sistemas.opb.gob.mx/epredialopb/img/gracias-pago.jpg"
      alt="Payment Confirmation"
    ></v-img>
    <v-card-text class="text-center">
      <p class="text-h4 text--primary">
        Tu Orden con Nº {{ numOrden() }} Ya fue confirmada y estamos trabajando para enviarla lo antes posible!
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" to="/" router-link class="mx-auto">
        Ir a la página de inicio
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ConfirmationView',
  methods: {
    numOrden() {
      // Lógica para obtener el número de orden
      return '12345';
    },
  },
};
</script>


<script>

export default {
  name: "Comprobante-view",
  methods: {
    redirectTo(nameRoute) {
      this.$router.push({ name: nameRoute })
    },
    numOrden() {
      return Math.floor(Math.random() * 1000)
    }
  },
}
</script>

<style scoped></style>