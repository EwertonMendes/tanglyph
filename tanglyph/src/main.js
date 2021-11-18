import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import Vuex from 'vuex'
Vue.use(Vuex);

import storePlugin from './plugins/store'
Vue.use(storePlugin)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
