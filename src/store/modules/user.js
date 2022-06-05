import { login, getProfile } from "@/api/user"
import { getToken, setToken} from "@/utils/auth"

export default {
  namespaced: true,
  state: () => {
    return {
      // 保存token 如果本地有就使用本地,没有就为空,使用短路运算
      token: getToken() || '',
      // 用户信息
      userInfo: {}
    }
  },
  mutations: {
    // 定义mutations函数设置token
    setToken(state,newToken) {
      // 1. 保存新token
      state.token = newToken
      // 2. 调用封装好的函数，保存token
      setToken(newToken)
    },
    // 设置用户信息
    setUserInfo(state,newUserInfo) {
      // 保存用户信息
      state.userInfo = newUserInfo
    }
  },
  actions: {
    async userLogin(context, data) {
      // 用户登录
      // console.log(context,data)
      const res = await login(data)
      console.log(res.data) // token
      context.commit('setToken', res.data)
    },
    async getProfile(context) {
      const res = await getProfile()
      // 调用mutation函数
      context.commit('setUserInfo', res.data)
      console.log('getProfile', res)
        }
  },
  getters: {}
}

