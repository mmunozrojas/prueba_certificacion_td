<template>
  <v-card class="mx-auto mt-5" max-width="344">
    <v-card-text>
      <div>Confirmación de Pago</div>
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