import axios from './axios'
import api from './api'
export function getTopShop() {
  return axios({
    url: api+'/svn/dishes/selecthotsell',
    method: 'get'
  })
}
export function getMyOrder(id) {
  return axios({
    url: api+'/svn/dishes/selectnotmoney',
    method: 'get',
    params:{
      customerId:id
    }
  })
}
export function getWeiComment(id) {
  return axios({
    url: api+'/svn/dishes/selectnotevaluation',
    method: 'get',
    params:{
      customerId:id
    }
  })
}

export function getOKComment(id) {
  return axios({
    url: api+'/svn/dishes/selectaleady',
    method: 'get',
    params:{
      customerId:id
    }
  })
}

export function getMyCollection(id) {
  return axios({
    url: api+'/svn/collection/getbycustomerId',
    method: 'get',
    params:{
      customerId:id
    }
  })
}

export function SureOrder(shop) {
  return axios({
    url: api+'/svn/dishes/newsave',
    method: 'get',
    params:{
      shop
    }
  })
}
