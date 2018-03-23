import axiosInstance from '../assets/http'

export default {
  login (obj) {
    return axiosInstance.post('/login', {
      name: obj.username,
      password: obj.password
    })
  },
  getUserInfo () {
    return axiosInstance.post('/getUserInfo', {})
  },
  logout () {
    return axiosInstance.post('/logout', {})
  }
}
