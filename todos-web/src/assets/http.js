import axios from 'axios'
// import Config from '../config'
import Router from '../router/index'

let baseUrl = window.g.baseUrl

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401 && Router.currentRoute.name !== 'login') {
    Router.replace({
      path: '/login',
      query: {redirect: Router.currentRoute.fullPath}
    })
  }
  return Promise.reject(error)
})

export default instance
