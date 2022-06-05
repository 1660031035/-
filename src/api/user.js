// import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }

/**
 * 用户登录
 * @param {mobile, password} data 登录的用户信息
 * @returns 登录的结果
 */
import request from '@/utils/request'
// 用户登录
export function login(data) {
  return request({
      url: '/api/sys/login',
      method: 'post',
      data
    })
}
// 获取用户信息
export function getProfile() {
  return request({
    url: '/api/sys/profile',
    method: 'post',
  })
}
export function getInfo(token) {
}
export function logout() {
}