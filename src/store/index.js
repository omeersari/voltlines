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
    DELETE_PASSENGER(state, payload) {
      const index = state.passengers.indexOf(payload);
      if (index > -1) {
        state.passengers.splice(index, 1);
      }
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
    async deletePassenger({ commit }, passenger) {
      await api.deletePassenger(passenger);
      commit("DELETE_PASSENGER", passenger);
    },
  },
  modules: {},
});
