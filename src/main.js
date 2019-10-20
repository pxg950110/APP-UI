// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vue from 'vue/dist/vue.common.js'
import App from './App'
import router from './router'
// Element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import echarts from 'echarts'
import './icon/el-icon-log/iconfont.css'
// import iview from 'iview'
// Vue.use(iview)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = axios
axios.defaults.baseURL = 'http://127.0.0.1:59380'
// Vue.prototype = adios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
