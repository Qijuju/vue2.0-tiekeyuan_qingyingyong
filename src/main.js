import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Resource from 'vue-resource'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import './assets/css/common.css'
import store from './store/index.js'
import RPM from './assets/js/r93535_mobile.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'
import './assets/css/style.css'
import config from './config'


// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
Vue.use(ElementUI);
Vue.use(Vant);
Vue.use(Resource);
Vue.use(Vuex);
Vue.use(RPM);
Vue.use(mint);
Vue.prototype._GLOBAL = config


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,// 使用store
  render: h => h(App)
});
