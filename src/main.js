import Vue from 'vue'
import router from './router'
import store from './store/index.js'
import App from './App.vue'

import 'Root/assets/scss/main.scss'

import { GlobalDirectives } from 'Root/directives/directives'

Vue.use(GlobalDirectives)

// Vue instance
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});