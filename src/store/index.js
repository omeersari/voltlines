import Vue from "vue";
import Vuex from "vuex";
import api from "../api/mockapi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    passengers: [],
    createdPass: "",
    averageTripDuration: 0,
  },
  mutations: {
    GET_PASSENGERS(state, payload) {
      state.passengers = payload;
    },
    CREATE_PASSENGER(state, payload) {
      state.passengers.push(payload);
    },
    DELETE_PASSENGER(state, payload) {
      const index = state.passengers.indexOf(payload);
      if (index > -1) {
        state.passengers.splice(index, 1);
      }
    },
    AVERAGE_TIME(state) {
      const arrAvg = (arr) =>
        arr.reduce((total, b) => total + b.tripDuration.value, 0) / arr.length;
      state.averageTripDuration = arrAvg(state.passengers);
    },
    EDIT_PASSENGER(state, payload) {
      const itemIndex = state.passengers.findIndex(
        (item) => item.id == payload.id
      );
      state.passengers[itemIndex] = payload;
    },
  },
  actions: {
    async getPassengers({ commit }) {
      const response = await api.getAllPassengers();
      commit("GET_PASSENGERS", response);
    },
    async createPassenger({ commit }, data) {
      const response = await api.createPassenger(data);
      commit("CREATE_PASSENGER", response);
      commit("AVERAGE_TIME");
    },
    async deletePassenger({ commit }, passenger) {
      await api.deletePassenger(passenger);
      commit("DELETE_PASSENGER", passenger);
    },
    async updatePassenger({ commit }, data) {
      await api.editPassenger(data);
      commit("EDIT_PASSENGER", data);
      commit("AVERAGE_TIME");
    },
    averageTime({ commit }) {
      commit("AVERAGE_TIME");
    },
  },
  modules: {},
});
