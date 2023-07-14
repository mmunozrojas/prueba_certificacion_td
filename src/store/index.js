// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ropaHombre: [],
    ropaMujer: [],
    electronica: [],
    carrito: [],
    home: {
      mejoresproductos: [],
      tiposproductos: []
    }
  },
  getters: {
    cartCount(state){
      return state.carrito.reduce((total, prod) => {
        return total + prod.cantidad
      }, 0)
    }
  },
  mutations: {
    SET_ROPA_HOMBRE(state, productos) {
      state.ropaHombre = productos;
    },
    SET_ROPA_MUJER(state, productos) {
      state.ropaMujer = productos;
    },
    SET_MEJORES_PRODUCTOS(state, productos) {
      state.home.mejoresproductos = productos;
    },
    SET_TIPOS_PRODUCTOS(state, productos) {
      state.home.tiposproductos = productos;
    },
    ADD_TO_CART(state, producto) {
      let existeProducto = state.carrito.find(item => item.id === producto.id);
      if (existeProducto) {
        existeProducto.cantidad++;
      } else {
        state.carrito.push({
          ...producto,
          cantidad: 1
        });
      }
    },
    REMOVE_FROM_CART(state, productoId) {
      const index = state.carrito.findIndex(p => p.id === productoId);
      if (index !== -1) {
        state.carrito.splice(index, 1);
      }
    }
  },
  actions: {
    fetchRopaHombre({ commit }) {
      axios.get('/ropaHombre.json')
        .then(response => {
          commit('SET_ROPA_HOMBRE', response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchRopaMujer({ commit }) {
      axios.get('/ropaMujer.json')
        .then(response => {
          commit('SET_ROPA_MUJER', response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchMejoresProductos({ commit }) {
      axios.get('/home.json')
        .then(response => {
          commit('SET_MEJORES_PRODUCTOS', response.data.mejoresproductos);
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchTiposProductos({ commit }) {
      axios.get('/home.json')
        .then(response => {
          commit('SET_TIPOS_PRODUCTOS', response.data.tiposproductos);
        })
        .catch(error => {
          console.error(error);
        });
    },
    addToCart({ commit }, producto) {
      commit('ADD_TO_CART', producto);
    },
    removeFromCart({ commit }, productoId) {
      commit('REMOVE_FROM_CART', productoId);
    }
  }
});
