// cookie localstorage 都可以做持久化

import Cookies from 'js-cookie'

const TokenKey = 'vue-hr-lh'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
