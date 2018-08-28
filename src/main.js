// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import 'common/scss/index.scss';

/* 微信自定义分享 */
import 'weChat/index';

/* fastclick修复移动端点击延迟300ms */
import fastclick from 'fastclick';
fastclick.attach(document.body);

/**
 * 星空连线
 */
import VueParticles from 'vue-particles';
Vue.use(VueParticles);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { App },
	template: '<App/>'
});
