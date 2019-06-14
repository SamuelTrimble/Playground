import Vue from 'vue';

import router from './plugins/router';
import store from './plugins/store';
import core from './plugins/core';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	core,
	render: h => h(App)
}).$mount('#app');
