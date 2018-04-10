import Vue from 'vue'
import Vuex from 'vuex'

import Loading from './modules/loading'
import Login from './modules/login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Loading,
    Login
  },
  strict: process.env.NODE_ENV !== 'production'
})
