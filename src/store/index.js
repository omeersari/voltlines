import Vue from "vue";
import Vuex from "vuex";
import api from "../api/mockapi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    passengers: [],
    createdPass: "",
  },
  mutations: {
    GET_PASSENGERS(state, payload) {
      state.passengers = payload;
    },
    CREATE_PASSENGER(state, payload) {
      state.createdPass = payload;
    },
  },
  actions: {
    async getPassengers({ commit }) {
      const response = await api.getAllPassengers();
      commit("GET_PASSENGERS", response);
    },
    async createPassenger({ commit }, data) {
      console.log(data);
      const response = await api.createPassenger(data);
      commit("CREATE_PASSENGER", response);
    },
  },
  modules: {},
});
