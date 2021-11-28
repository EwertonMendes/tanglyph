import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import Vuex from 'vuex'
Vue.use(Vuex);

import storePlugin from './plugins/store'
import i18n from './i18n'
Vue.use(storePlugin)

new Vue({
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
