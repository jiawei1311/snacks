export const state = () => ({
  user: [],
  isLogin:false
})
export const mutations = {
  setIsLogin (state, params) {
    state.isLogin=params;
  },
  setUser (state, params) {
    state.user=params;
  },
}
export const actions = {
  setIsLogin({commit}, params) {
    commit('setIsLogin',params)
  },
  setUser({commit}, params) {
    commit('setUser',params)
  },
};
export const getters = {
  user:state=>state.user,
  isLogin:state=>state.isLogin
}
