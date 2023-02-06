import Vue from "vue";
import Vuex from "vuex";

import cashReceipt from "./modules/cashReceipt";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cashReceipt
  }
});
