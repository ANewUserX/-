// axios的二次封装
import axios from 'axios'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  }
})


requests.interceptors.request.use(config => {
  const token = localStorage.getItem('TOKEN')
  const userid = localStorage.getItem('userid')
  if (token) {
    config.headers.userid = userid
  }
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