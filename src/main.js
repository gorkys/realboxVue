// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import '../theme/index.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import VueDraggableResizable from '@/components/common/vue-draggable-resizable' //可拖动调整大小插件
Vue.component('vue-draggable-resizable', VueDraggableResizable);

import Axios from 'axios'

Axios.defaults.baseURL = 'http://192.168.1.6:8081/'; //AXIOS请求时默认URL
Vue.prototype.$http = Axios; //将AXIOS转为原型链

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
}); //兼容i18n 7.x版本设置

import VueI18n from 'vue-i18n'        //国际化
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages: {
    zh: Object.assign(require('@/components/common/lang/zh'), zhLocale),
    en: Object.assign(require('@/components/common/lang/en'), enLocale),
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: {
    App
  }
});
