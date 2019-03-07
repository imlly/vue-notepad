import Vue from "vue";
import VueRouter from "vue-router";
import "normalize.css";
import "@assets/common.less";
import eventBus from "@plugins/event-bus.js";
import dataSource from "@plugins/ds.js";
import App from "./App.vue";
import routes from "./routes.js";

Vue.config.productionTip = false;

Vue.use(eventBus); // 增加事件总线
Vue.use(dataSource); // 初始化数据源
Vue.use(VueRouter); // 注册vue-router

new Vue({
  router: new VueRouter({ mode: "history", routes }),
  render: h => h(App)
}).$mount("#app");
