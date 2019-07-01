import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		activeUser: -1,
		userData: []
	},
	mutations: {
		update(state, payload) {
			state[payload.property] = payload.data;
		}
	},
	actions: {

	}
});
