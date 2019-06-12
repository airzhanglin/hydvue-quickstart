import Vue from 'vue'
import Vuex from 'vuex'
import action from './actions';
import mutation from './mutation';

Vue.use(Vuex)

const store = new Vuex.Store({
  action,
  mutation,
  modules: {
    // namespaced modules
  }
})

export default store
