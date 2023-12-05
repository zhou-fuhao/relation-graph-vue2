// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import jsPlumb from "jsplumb";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Empty from "./components/Empty.vue";

Vue.config.productionTip = false;
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb;

Vue.use(ElementUI);
Vue.component("v-empty", Empty);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
