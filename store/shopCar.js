export const state = () => ({
  shopCar:[]
})
function isEmpty(obj){
  if(typeof obj == "undefined" || obj == null || obj == ""){
    return true;
  }else{
    return false;
  }
}

export const mutations = {
  emptyShopCar(state){
    state.shopCar=[]
  },
  addGoods(state,info){
    if(isEmpty(info.id)) {
      return;
    }
    let isOwn = state.shopCar.some(function (item) {
      if(info.name){
        if(item.id == info.id){
          item.num++;
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
    });
    console.log(isOwn);
    console.log(state.shopCar);
    if(!isOwn){
      info.num=1;
      state.shopCar.push(info)
    }
  },
  deleteGoods(state,item){
    state.shopCar.forEach((goods,index) => {
      if (goods.id === item.id) {
        state.shopCar.splice(index,1)
        return
      }
    })
    // state.shopCar.find((good) => good.id===item.id)
  },
  reduceNum(state,item){
    state.shopCar.find(info=>{
      if(info.id===item.id){
        info.num--;
        return;
      }
    })
/*    for(let i =0;i<state.shopCar.length;i++){
      if(state.shopCar[i].id===item.id){
        state.shopCar[i].num--;
      }
    }*/
  },
  addNum(state,item){
    const index = state.shopCar.findIndex(info=>info.id===item.id)
    state.shopCar[index].num++
    /*    for(let i =0;i<state.shopCar.length;i++){
          if(state.shopCar[i].id===item.id){
            console.log(state.shopCar[i]);
            state.shopCar[i].num++;
          }
        }*/
  },
  setNum(state,item){
    for(let i =0;i<state.shopCar.length;i++){
      if(state.shopCar[i].id==item.id){
        state.shopCar[i].num=item.num;
      }
    }
  }
};

export const actions = {
  emptyShopCar({commit}, params) {
    commit('emptyShopCar',params)
  },
  addGoods({commit}, params) {
    commit('addGoods',params)
  },
  addNum({commit}, params) {
    commit('addNum',params)
  },
  reduceNum({commit}, params) {
    commit('reduceNum',params)
  },
  setNum({commit}, params) {
    commit('deleteGoods',params)
  },
  deleteGoods({commit}, params) {
    commit('deleteGoods',params)
  }
};
export const getters = {
  shopCar: state =>state.shopCar,
  shopCarNumber:state => parseInt(state.shopCar.length),
  totalMoney: state =>{
    let money = 0;
    for(let i =0;i<state.shopCar.length;i++){
      money+=state.shopCar[i].price*state.shopCar[i].num
    }
    return money.toFixed(1)
  },
};

