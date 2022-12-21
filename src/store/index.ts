import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      ebook: null,
    }
  },
  actions: {
    setEbook: ({ commit }, ebook) => commit('SET_EBOOK', ebook),
  },
  mutations: {
    SET_EBOOK: (state, ebook) => {
      state.ebook = ebook
    },
  },
  modules: {},
})
export default store
