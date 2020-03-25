<template>
    <div id="app">
      <div class="top">
        <z-search @searchValue="getSearch"/>
        <i  @click="goBack" class="back iconfont icon-fanhui"/>
      </div>

      <div style="height: 50px;"/>
      <div class="list">
        <z-list class="one" :shop="item" @click.native="goto(item.id)" v-for="item in shopList" :key="item.id" ></z-list>
      </div>




    </div>
</template>

<script>
  import zList from '../components/List'
  import zSearch from '../components/Search'
  import zTop from '../components/top'
  import axios from 'axios'
    export default {
        name: "search",
        components:{
            zList,
            zSearch,
            zTop
        },
        data(){
            return{
                shopList:[]
            }
        },
        methods:{
            goto(id){
                this.$router.push({
                    path:'/shop',
                    query:{
                        id:id
                    }
                })
            },
            goBack(){
                this.$router.go(-1)
            },
            async getFenleiShop(name=this.$route.query.name){
                const {data} =await axios.get(this.$api+'/shop/SelectShop/'+name)
                this.shopList = data.data
            },
            getSearch(data){
                this.getFenleiShop(data)
            }

        },
        mounted() {
            this.getFenleiShop();
        }
    }
</script>

<style scoped lang="scss">
@import "../assets/css/main";
  .list{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    .one {
      flex: 1 1 auto;
      margin: 10px;
      max-width: 400px;
    }
  }
  .back{
    position: fixed;
    font-size: 24px;
    left: 10px;
    top: 10px;
    font-weight: 600;
  }
  .top{
    background: white;
    height: 50px;
    position: fixed;
    width: 100%;
  }
</style>
