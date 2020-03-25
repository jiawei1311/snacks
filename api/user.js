import axios from './axios'
import api from './api'
export function login(data) {
    return axios({
      url: api + '/user/login',
      method: 'post',
      data
    })
  }
export function getUser(id) {
  return axios({
    url: api+'/user/getUser/'+id,
    method: 'get'
  })
}
export function logout() {
  return axios({
    url: '/user/logout',
    method: 'post'
  })
}

