export default {
  namespaced: true,
  state: {},
  mutations: {
    addFunctions (state, FirebaseFunctions) {
      state.functions = FirebaseFunctions
    }
  }
}
