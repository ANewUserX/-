// axios的二次封装
import axios from 'axios'

// 进度条
import nProgress from 'nprogress'
import "nprogress/nprogress.css"

const requests = axios.create({
  baseURL:'/mock',
  timeout:5000
})

requests.interceptors.request.use(config => {
  nProgress.start()
  return config
},err => {
  alert(err.message)
})

requests.interceptors.response.use(res => {
  nProgress.done()
  return res.data
},err => {
  alert(err.message)
})

export default requests