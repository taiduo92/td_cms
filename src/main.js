import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/index'
import router from './router/index'
import axios from 'axios'

import ut_showMessage from './utils/messageBox'

//安装elementUi插件
Vue.use(ElementUI)

//绑定axios ajax请求插件
Vue.prototype.axios = axios;
//绑定提示消息插件
Vue.prototype.ut_showMessage = ut_showMessage;


Vue.config.productionTip = false

new Vue({
  axios,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
