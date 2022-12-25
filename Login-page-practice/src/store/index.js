import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
  },
  getters: {
    isLogin(state) {
      return state.accessToken !== "";
    },
  },
  mutations: {
    setLogin(state, payload) {
      state.accessToken = payload;
    },
  },
  actions: {},
  modules: {},
});
