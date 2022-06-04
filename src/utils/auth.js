// cookie localstorage 都可以做持久化

import Cookies from 'js-cookie'

const TokenKey = 'vue-hr-lh'
// 封装获取token函数
export function getToken() {
  return Cookies.get(TokenKey)
}
// 封装设置token函数
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
