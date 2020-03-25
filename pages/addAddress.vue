<template>
  <div id="app">
    <div>
      <top-title :need="true" style="background: white" :title="isAdd?'添加收货地址':'编辑收货地址'"/>
    </div>

    <div>
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        save-button-text="保存"
        :search-result="searchResult"
        @save="onSave"
        @change-area="change"
      />
    </div>
  </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import topTitle from '@/components/top'
    import areaList from '../plugins/area'
    import { getUser } from "../api/user";
    export default {
        name: "addAddress",
        data(){
            return{
                areaList:areaList,
                searchResult: [],
                isAdd:false,
                addressInfo:{},
                area:''
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
            change(e){
                console.log(e);
                this.area = e ;
            },
            ...mapActions({
                setUser:'user/setUser',
                setIsLogin:'user/setIsLogin',
            }),
            async getUser(){
                const {data} =await getUser(this.user.id)
                this.setUser(data.data);
            },

           async onSave(e) {
               console.log(this.addressInfo);
               const info = {
                    userId:this.user.id,
                    realName:e.name,
                    userPhone:e.tel,
                    address:`${e.province} ${e.city} ${e.county}`,
                    detailAddress:e.addressDetail,
                    code:this.addressInfo.areaCode||this.area[2].code
                }

               let url = ''
                if(this.isAdd){
                    url = this.$api+'/address/addAddress'
                }else{
                    url = this.$api+'/address/updateAddress'
                    info.id = this.addressInfo.id
                }
               const {data} = await axios.post(url,info)
               if(e.isDefault){
                   if(data.status===200){
                       console.log(data.data.insertId);
                       await axios.post(this.$api+'/user/updateUser',{
                           id:this.user.id,
                           addressId:data.data.insertId
                       })
                   }
               }

               this.getUser();

               this.$dialog.toast({
                   mes: '操作成功',
                   timeout: 1500,
                   icon: 'success'
               });
               setTimeout(res=>{
                   this.$router.go(-1)
               },1500)

            }

        },
        mounted() {
            console.log(this.user);
            console.log(this.$route.query.item);
            if(this.$route.query.item){
                this.isAdd = false
                const a = this.$route.query.item
                this.addressInfo = {
                    id:a.id,
                    name:a.realName,
                    tel:a.userPhone,
                    addressDetail:a.detailAddress,
                    areaCode:a.code,
                    isDefault:a.id==this.user.addressId
                }
                console.log(this.addressInfo);
            }else{
                this.isAdd = true
            }


        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/main";
  #app{
    background: #f5f5f5;
  }
</style>
