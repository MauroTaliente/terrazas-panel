import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './helpers'
import VueScrollTo from 'vue-scrollto'

new Vue({
  el: '#app',
  router,
  VueScrollTo,
  template: '<App/>',
  components: {
    App
  }
})

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease-in-out",
  offset: 0,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})