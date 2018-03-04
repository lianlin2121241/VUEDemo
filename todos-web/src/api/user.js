import axiosInstance from '../assets/http'

export default {
  login (obj) {
    return axiosInstance.post('/login', {
      name: obj.username,
      password: obj.password
    })
  },
  logout () {
    return axiosInstance.post('/logout', {})
  }
}
