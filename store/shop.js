export const state = () => ({
  shopList: [],
  hotShopList:[]
})
export const mutations = {
  setShopList (state, text) {
    state.shopList=text;
  },
  setHotShopList (state, text) {
    state.hotShopList=text;
  }
}

export const actions = {
  setShopList({commit}, params) {
    commit('setShopList',params)
  },
  setHotShopList({commit}, params) {
    commit('setHotShopList',params)
  }
};

export const getters = {
  ShopListName:state=>{
    let a=[]
    state.shopList.forEach(res=>{
      a.push(res.name)
    })
    return a;
  },
  fenleiShopList:state=>{
    let moth = [],
      flag = 0,
      list = state.shopList;
    let wdy = {
      title: '',
      shopList: ''
    }
    for (let i = 0; i < list.length; i++) {
      let az = '';
      for (let j = 0; j < moth.length; j++) {
        if (moth[j].title == list[i]['type']) {
          flag = 1;
          az = j;
          break;
        }
      }
      if (flag == 1) {
        let ab = moth[az];
        ab.shopList.push(list[i]);
        flag = 0;

      } else if (flag == 0) {
        wdy = {};
        wdy.title = list[i]['type'];
        wdy.shopList = new Array();
        wdy.shopList.push(list[i]);
        moth.push(wdy);
      }
    }

    return moth
  },
  shopList:state=>state.shopList,
  hotShopList:state=>state.hotShopList,

}
