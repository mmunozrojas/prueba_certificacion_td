<template>
  <div>
    <CarruselComp />
    <TiposProductoComp />

  </div>
</template>

<script>
import TiposProductoComp from "@/components/TiposProductoComp.vue";
import CarruselComp from "@/components/CarruselComp.vue";

export default {
  name: "HomeView",
  components: {
    CarruselComp,
    TiposProductoComp,
  },
  created() {
    this.$store.dispatch('fetchMejoresProductos');
    this.$store.dispatch('fetchTiposProductos');
  },
};
</script>

