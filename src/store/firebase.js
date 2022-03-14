export default {
  namespaced: true,
  state: {},
  mutations: {
    addFunctions (state, FirebaseFunctions) {
      state.functions = FirebaseFunctions
    },
    addAuth (state, FirebaseAuth) {
      state.auth = FirebaseAuth
    },
    addAnalytics (state, FirebaseAnalytics) {
      state.analytics = FirebaseAnalytics
    },
    addStorage (state, FirebaseStorage) {
      state.storage = FirebaseStorage
    }
  }
}
