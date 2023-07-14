<template>
  <div>
    <CarruselComp />
  </div>
</template>

<script>
import CarruselComp from "@/components/CarruselComp.vue";

export default {
  name: "HomeView",
  components: {
    CarruselComp
  },
  created() {
    this.$store.dispatch("fetchMejoresProductos");
  }
};
</script>

