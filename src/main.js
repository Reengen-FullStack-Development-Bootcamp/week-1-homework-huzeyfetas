import Vue from "vue";
import App from "./App.vue";
import "dtoaster/dist/dtoaster.css";
import DToaster from "dtoaster";
import ToasterPresets from "./toast_presets.json";

Vue.config.productionTip = false;

Vue.use(DToaster, {
  presets: ToasterPresets,
  position: "top-right", //toasts container position on the screen
  containerOffset: "45px", //toasts container offset from top/bottom of the screen
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
