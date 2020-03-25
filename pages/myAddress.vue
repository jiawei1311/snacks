<template>
  <div id="app">
    <div>
      <top-title :need="true" style="background: white" title="我的收货地址"/>
    </div>

    <div>
      <div class="addAddress" @click="$router.push('/addAddress')">
        添加新地址
      </div>

      <div>
        <div class="one" v-for="item in myAddress" :key="item.id">
          <div class="info">
            <div class="name">{{item.realName}}</div>
            <div>{{item.userPhone}}</div>
          </div>
          <div class="userAddress">{{item.address}} {{item.detailAddress}}</div>
          <div class="options">
            <div @click="clickDefault(item)">
              <mu-radio :value="item.id" v-model="moren"  label="设为默认"></mu-radio>
            </div>
            <div class="detail">
              <div @click="clickEdit(item)">编辑</div>
              <div @click="clickDelete(item)">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import topTitle from '@/components/top'
    import axios from 'axios'

    export default {
        name: "setInfo",
        data(){
            return{
                myAddress:{},
                moren:0
            }
        },
        computed:{
            ...mapGetters({
                user: 'user/user'
            })
        },
        components:{
            topTitle
        },
        methods:{
            ...mapActions({
                setUser:'user/setUser',
                setIsLogin:'user/setIsLogin',
            }),
            async getUser(){
                const {data} =await axios.get(this.$api+'/user/getUser/'+this.user.id)
                this.setUser(data.data);
            },
            async getMyAddress(){
                console.log(this.user.id);
                const {data} = await axios.get(this.$api+'/address/getUserAddress/'+this.user.id)
                console.log(data.data);
                this.myAddress = data.data;
            },
            async clickDefault(item){
                // 更改默认地址
                console.log(item);
                await axios.post(this.$api+'/user/updateUser',{
                    id:this.user.id,
                    addressId:item.id
                })
                this.getUser();
                this.$dialog.toast({
                    mes: '更改成功',
                    timeout: 1500,
                    icon: 'success'
                });
            },
            clickEdit(item){
                this.$router.push({path: '/addAddress', query: {item}})
                console.log(item);
            },
            clickDelete(item){
                console.log(item);
            },

        },
        mounted() {
            this.getMyAddress();
            this.moren=Number(this.user.addressId)
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/main";
  #app{
    background: #f5f5f5;
  }
  .addAddress{
    z-index: 10;
    background: white;
    text-align: center;
    font-size: 18px;
    padding: 10px 0;
    border-top: 1px solid #f5f5f5;
    margin-bottom: 10px;
  }
  .one{
    background: white;
    margin-bottom: 10px;
    padding: 10px 0;
    line-height: 1.5;
    .info{
      .name{
        font-size: 18px;
      }
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding:0 20px ;
    }
    .userAddress{
      color: #ccc;
      padding:0 20px ;
    }
    .options{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid #f5f5f5;
      padding:10px 20px 0 20px;
      font-size: 14px;
      line-height: 14px;
      .detail{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        div{
          margin-left: 25px;
        }
      }
    }
  }
</style>
