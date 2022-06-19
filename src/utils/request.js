import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 统一给header添加token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 请求成功
    const { success, message, data } = response.data
    // 需要判断当前请求是否成功
    if (success) {
      return data
    }
    // 失败（请求失败|业务失败），消息提示
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  },
  (error) => {
    // 请求失败
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
