import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VModal from 'vue-js-modal'
import VueTextareaAutosize from 'vue-textarea-autosize'
 
Vue.use(VueTextareaAutosize)
Vue.use(VueResource);
Vue.use(VModal);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')