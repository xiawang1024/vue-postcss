import Vue from 'vue'
import router from './router'
import App from './App.vue'
/**
 * 初始化加载
 */
import './init/index'

/**
 * 图片懒加载
 */
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
	loading: require('./vueLazy/loading.jpg')
})

Vue.config.productionTip = false

new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app')
