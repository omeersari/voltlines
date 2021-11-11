import Vue from "vue";
import Vuex from "vuex";
import api from "../api/mockapi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    passengers: [],
  },
  mutations: {
    GET_PASSENGERS(state, payload) {
      state.passengers = payload;
    },
  },
  actions: {
    async getPassengers({ commit }) {
      const response = await api.getAllPassengers();
      commit("GET_PASSENGERS", response);
    },
    async createPassenger(data) {
      const response = await api.createPassenger(data);
      console.log(response);
    },
  },
  modules: {},
});
