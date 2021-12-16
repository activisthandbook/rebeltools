export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    signin (state, newUser) {
      state.user = newUser
    }
  }
}
