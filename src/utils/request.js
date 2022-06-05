// // 对axios的二次封装
// // 基地址 + 最长等待时间 + 请求拦截器 + 响应拦截器
// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service

// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
// 导入路由
import router from '@/router'
const service = axios.create(
  {
    // 基地址和最长等待时间
    // baseURL: 'http://ihrm-java.itheima.net', // 设置axios请求的基础的基础地址
    baseURL: 'http://localhost:8080',
    timeout: 5000 // 定义5秒超时
  }
) 
// 创建一个axios的实例
// service.interceptors.request.use() // 请求拦截器
// 添加请求拦截器
// 导入store
import store from '@/store'
service.interceptors.request.use(
  function (config) {
      // 在发送请求之前进行操作
      // 如果有token,就设置在请求头上
      // console.log(store)
      const token = store.state.user.token
      if(token) {
        console.log(config)
        config.headers.Authorization = `Bearer ${token}`
      }
      return config;
  },
  function (error) {
      // 对请求错误进行操作
      return Promise.reject(error);
  }
);
// service.interceptors.response.use() // 响应拦截器
// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 1. 判断是否操作成功
  if(response.data.success === 'false') {
    // 本次操作没有成功, 抛出错误
    return Promise.reject(new Error('请求错误'));
  } else {
    return response.data;
  }
  
}, function (error) {
  // 对响应错误做点什么
  // token超时 删除本地数据 回到登录页
  console.dir(error)
  if(error.response.data.code === 10002) {
    store.dispatch('user/logout')
    // 跳转登录页
    router.push('/login?return_url=' + encodeURIComponent(router.currentRoute.fullPath))
  }
  return Promise.reject(error);
});
export default service // 导出axios实例