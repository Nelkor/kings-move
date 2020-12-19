import Vue from 'vue'
import Vuex from 'vuex'

import engine from '@engine/store/engine-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    engine,
  },
})
