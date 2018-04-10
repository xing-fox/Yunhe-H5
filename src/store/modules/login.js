'user strict'
let state = {
  LoginState: false
}
const actions = {
  LoginingStatus ({ commit }) {
    commit('Logining')
  }
}
const mutations = {
  Logining (state) {
    state.LoginState = !state.LoginState
  }
}
const getters = {
}
export default {
  state,
  getters,
  actions,
  mutations
}
