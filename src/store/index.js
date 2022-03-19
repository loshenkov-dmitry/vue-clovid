import Vue from 'vue'
import Vuex from 'vuex'
import country from './modules/country.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = true
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state, payload) {
      state.error = null
    }
  },
  actions: {
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
    setError ({ commit }, payload) {
      commit('setError', payload)
    },
    clearError ({ commit }, payload) {
      commit('clearError', payload)
    }
  },

  getters: {
    loading (state) {
      return state.loading
    },

    error (state) {
      return state.error
    }
  },
  modules: {
    country,
  }
})
