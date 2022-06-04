import { getToken, setToken } from "@/utils/auth"

export default {
  namespaced: true,
  state: () => {
    return {
      // 保存token 如果本地有就使用本地,没有就为空,使用短路运算
      token: getToken() || ''
    }
  },
  mutations: {
    // 定义mutations函数设置token
    setToken(state,newToken) {
      // 1. 保存新token
      state.token = newToken
      // 2. 调用封装好的函数，保存token
      setToken(newToken)
    }
  },
  actions: {},
  getters: {}
}

