import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter);

export default new VueRouter({
  base: '/',
  // remove comments for production tip
  // mode: 'history',
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
});