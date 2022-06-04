export default {
  namespaced: true,
  state: () => {
    return {
      // 保存token
      token: ''
    }
  },
  mutations: {
    // 定义mutations函数设置token
    setToken(state,newToken) {
      // 保存新token
      state.token = newToken
    }
  },
  actions: {},
  getters: {}
}

