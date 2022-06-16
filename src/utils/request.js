import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 5000
})

export default service
