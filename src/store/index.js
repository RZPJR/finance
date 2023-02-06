import Vue from "vue";
import Vuex from "vuex";

import salesPayment from "./modules/salesPayment";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    salesPayment
  }
});
