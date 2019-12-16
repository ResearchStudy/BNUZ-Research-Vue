import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './utils/http'
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI)

class SingleMessage {
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  error(options, single = true) {
    this[showMessage]('error', options, single)
  }

  [showMessage](type, options, single) {
    if (single) {
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
}

Vue.prototype.$message = new SingleMessage()

const showMessage = Symbol('showMessage')

Vue.prototype.$http = http;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
