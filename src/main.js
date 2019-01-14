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
	loading: 'http://www.hndt.com/podcast/1111/res/xtmZ0Bee.png?1508751589195'
})

Vue.config.productionTip = false

new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app')
