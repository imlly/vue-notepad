import Vue from "vue";
import VueRouter from "vue-router";
import "normalize.css";
import "@assets/common.less";
import App from "./App.vue";
import routes from "./routes.js";

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes
});
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
