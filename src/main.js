import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from './plugin'
import Myplugin from "./Myplugin"

Vue.config.productionTip = false

//使用插件
Vue.use(plugin)
Vue.use(Myplugin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
