import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Notifications from "vue-notification";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

Vue.use(Notifications);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_KEY,
    libraries: "places",
    installComponents: true,
    region: "TR",
    language: "en",
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
