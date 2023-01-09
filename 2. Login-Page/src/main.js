import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
import VueCompositionAPI from "@vue/composition-api";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebaseKey from "./firebaseKey";

// Initialize Firebase
const firesbaseApp = initializeApp(firebaseKey);
getDatabase(firesbaseApp);

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
