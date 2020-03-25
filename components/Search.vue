<template>
  <div class="aSearch">
    <mu-auto-complete
      class="search"
      :data="ShopListName"
      :max-search-results="5"
      action-icon=":iconfont icon-sousuo"
      :action-click="clickSearch"
      v-model="searchValue"
      :solo="true"
      prefix="关键字"
      open-on-focus></mu-auto-complete>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "Search",
        data(){
            return{
                searchValue: ''
            }
        },
        computed:{
            ...mapGetters({
                ShopListName: 'shop/ShopListName'
            })
        },
        methods:{
            clickSearch(){
                console.log(this.searchValue)
                console.log(this.$route.path === '/search');
                if(this.$route.path==='/search'){
                    this.$emit('searchValue',this.searchValue)
                }else{
                    this.$router.push({path:'/search',query:{name:this.searchValue}})
                }

            }
        }
    }
</script>

<style scoped lang="scss">
  .aSearch{
    z-index: 999;
    position: fixed;
    width: 80%;
    left: 10%;
    right: 10%;
    top: 10px;
    opacity: 0.9;

    .mu-input{
      padding: 0;
      margin: 0;
      min-height: 32px;
      text-indent: 10px;
      padding-right: 10px;
    }
    .search{
      width: 100%;
      background: #f5f5f5;
      margin: 0 auto;
      border-radius: 50px;
      input.mu-text-field-input{
        color: black;
      }
    }

  }

</style>
