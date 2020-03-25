<template>
    <div>
      <top-title :need="true" style="background: white" title="领取优惠券"/>
      <div class="all" v-for="item in 3" :key="item">
        <img @click="getYhq(item)" class="YHQ" :src="require(`../static/img/YHQ${item}.jpg`)">
      </div>
    </div>
</template>

<script>
    import topTitle from '@/components/top'
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    export default {
        name: "getYHQ",
        components:{
            topTitle
        },
        computed:{
            ...mapGetters({
                user: 'user/user'
            })
        },
        methods:{
            async getYhq(id){
                const a = {
                    userId:this.user.id,
                    yhqId:id,
                    createTime : new Date().getTime()
                }
                // const {data} = await axios.post(this.$api+'/yhq/addYhq',a)
                const {data} = await axios.post(this.$api+'/yhq/addYhq',a)
                if(data.data){
                    this.$dialog.toast({
                        mes: '领取成功！',
                        timeout: 1500
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  .all{
    margin: 0 auto;
    width: 330*0.9px;
    .YHQ{
      height: 130*0.9px;
      width: 330*0.9px;
      margin-top: 20px;
    }
  }

</style>
