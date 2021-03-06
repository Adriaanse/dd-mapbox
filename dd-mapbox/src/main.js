// Required to work on MSIE 11
import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vue2MapboxGL from 'vue2mapbox-gl'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vue2MapboxGL)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
