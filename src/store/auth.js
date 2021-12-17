/*
STORE MODULE: AUTHENTICATION 🔐
In this module, data is stored about the user this is currently signed in. This data is retrieved from the Firestore Authentication module.
*/
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
