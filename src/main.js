import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

import './directive/make-red';

import '@js/htmlFontSize.js';

import '@js/axios.config.js';

import '@js/filter.js';
import '@js/isPhonX.js';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
