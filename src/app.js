import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'intersection-observer'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo)

export const bus = new Vue();


Vue.use(BootstrapVue);

new Vue({
	el: '#app',
	render: h => h(App)
});
