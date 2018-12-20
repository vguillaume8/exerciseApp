import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VModal from 'vue-js-modal'
import VueTextareaAutosize from 'vue-textarea-autosize'
import vSelect from 'vue-select'


 
Vue.use(VueTextareaAutosize)
Vue.use(VueResource);
Vue.use(VModal);
Vue.config.productionTip = false
Vue.component('v-select', vSelect)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')