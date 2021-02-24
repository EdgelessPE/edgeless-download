import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(Antd)
Vue.prototype.$axios=axios

new Vue({
  render: h => h(App),
}).$mount('#app')
