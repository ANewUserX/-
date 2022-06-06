// axios的二次封装
import axios from 'axios'

const requests = axios.create({
  baseURL: '/my',
  timeout: 5000,
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})


requests.interceptors.request.use(config => {
  const token = localStorage.getItem('TOKEN')
  // 为请求头添加token字段为服务端返回的token
  config.headers.common['Authorization'] = token
  // return config是固定用法 必须有返回值
  return config
}, err => {
  alert(err.message)
})

requests.interceptors.response.use(res => {
  return res.data
}, err => {
  alert(err.message)
})

export default requests