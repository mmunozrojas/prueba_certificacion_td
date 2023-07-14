<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="3" v-for="(tipo, index) in tiposProductos" :key="index">
        <v-hover v-slot="{ hover }">
          <v-card class="tipos-producto__card" @click="redirigirACategoria(tipo.name)">
            <v-img :src="tipo.image" class="tipos-producto__image"></v-img>
            <v-card-title>{{ tipo.name }}</v-card-title>
            <v-expand-transition>
              <div v-if="hover" class="tipos-producto__hover">{{ tipo.text }}</div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TiposProductoComp",
  computed: {
    tiposProductos() {
      return this.$store.state.home.tiposproductos;
    },
  },
  methods: {
    redirigirACategoria(categoria) {
      let rutaCategoria = categoria.toLowerCase().replace("'", "").replace(" ", "-");
      this.$router.push(`/${rutaCategoria}`);
    },
  },
};
</script>

<style scoped>
.tipos-producto__card {
  width: 70%;
  margin: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.tipos-producto__card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tipos-producto__image {
  height: 200px;
  object-fit: cover;
}

.tipos-producto__hover {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
  color: rgb(255, 255, 255);
  background-color: rgb(129, 125, 125);
}

.tipos-producto__card:hover .tipos-producto__hover {
  opacity: 1;
}


.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>
