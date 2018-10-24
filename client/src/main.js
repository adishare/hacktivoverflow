import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import axios from 'axios'
import VueFormGenerator from "vue-form-generator"
import "vue-form-generator/dist/vfg-core.css"
import jBox from 'jbox'

Vue.config.productionTip = false

Vue.use(VueFormGenerator)

var server = axios.create({
  baseURL:'http://localhost:3000'
})

Vue.prototype.$server = server

let modal = new jBox('Modal')
Vue.prototype.$jBox = modal

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
