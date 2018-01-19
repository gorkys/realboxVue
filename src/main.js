// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import '../theme/index.css'

import VueDraggableResizable from '@/components/common/vue-draggable-resizable' //可拖动调整大小插件
Vue.component('vue-draggable-resizable', VueDraggableResizable)

import Axios from 'axios'
Axios.defaults.baseURL = 'http://192.168.1.6:8081/'; //AXIOS请求时默认URL
Vue.prototype.$http = Axios; //将AXIOS转为原型链

Vue.config.productionTip = false;
Vue.use(ElementUI);

	/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
});
