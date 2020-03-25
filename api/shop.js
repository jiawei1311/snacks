import axios from './axios'
import api from './api'
export function getFenleiShop(params) {
  return axios({
    url: api+'/shop/getFenleiShop',
    params,
    method: 'get'
  })
}
export function ILike(data) {
  return axios({
    url: api+'/svn/dishes/updatecollection',
    method: 'get',
    params: data
  })
}
export function getCai() {
  return axios({
    url: api+'/svn/menu/dishes/getfuzzyBy',
    method: 'get'
  })
}

export function getSearch(data) {
  return axios({
    url: api+'/svn/menu/dishes/getMenufuzzyBy',
    method: 'get',
    params: {
      name:data
    }
  })
}
