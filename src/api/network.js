// axios 请求数据
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.defaults.baseURL = 'http://192.168.1.102:3000'
axios.defaults.timeout = 3000

export default {
  async get (url = '', data = {}) {
    try {
      let response = await axios.get(url, { params: data })
      return response.data
    } catch (e) {
      console.log('请求失败', e)
    }
  },
  async post (url = '', data = {}) {
    try {
      let response = await axios.post(url, data)
      return response.data
    } catch (e) {
      console.log('请求失败', e)
    }
  }
}
