import Vue from 'vue';
import App from './App.vue';
/**
 * 初始化加载
 */
import './init/index';

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App)
}).$mount('#app');
