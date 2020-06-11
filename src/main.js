import Vue from "vue";
import App from "./App.vue";
import whimClientVue from "whim-client-vue";
import "whim-client-vue/dist/whim-client-vue.css";

Vue.config.productionTip = false;
Vue.use(whimClientVue);

Vue.prototype.$myTeam = () => {
  return Vue.prototype.$whim.state.team.findIndex(t =>
    t.includes(Vue.prototype.$whim.accessUser.id)
  );
};

new Vue({
  render: h => h(App)
}).$mount("#app");
