<template>
  <div id="app">
    <z-top title="注册"/>

    <div class="login">
      <h1>注册</h1>
      <mu-container>
        <mu-text-field full-width class="input" color="black" underline-color="black" v-model="username" label="请输入账号" label-float  icon=":iconfont icon-yonghuming"></mu-text-field><br/>
        <mu-text-field full-width underline-color="black" type="password" v-model="password" label="请输入密码" label-float  icon=":iconfont icon-mima"></mu-text-field><br/>
        <mu-text-field full-width underline-color="black" v-model="phone" label="请输入联系方式" label-float  icon=":iconfont icon-shoujihao"></mu-text-field><br/>

        <mu-text-field full-width class="input" color="black" underline-color="black" @click.stop="show2 = true" v-model="address" readonly label="请选择地址" label-float  icon=":iconfont icon-dizhi"></mu-text-field><br/>
        <div>
          <yd-cityselect
            v-model="show2"
            ref="cityselectDemo"
            :callback="result2"
            :items="district"
            provance="浙江省"
            city="宁波市"
            area="海曙区"
          ></yd-cityselect>
        </div>

<!--        <input type="file" @change="uploadFile($event)" multiple="multiple" />-->
      </mu-container>
      <div class="btn" @click="register">
        注册
      </div>
    </div>

  </div>
</template>

<script>
    import zTop from '../components/top'
    import axios from 'axios'
    export default {
        name: "login",
        components:{
            zTop
        },
        data () {
            return {
                username:'',
                password:'',
                phone:'',
                show2: false,
                address: '',
                district: this.$District,

            }
        },
        methods:{
            result2(ret) {
                this.address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
            },
            uploadFile:function(event){
                this.file = event.target.files[0]; //获取input的图片file值
                let param = new FormData(); // 创建form对象
                param.append('imgFile', this.file);//对应后台接收图片名
                axios.post(this.$api+'/user/uploadImg',param)
                    .then(function(res){
                        console.log(res);
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            },
            // FIXME 注册 OK
            async register(){

                if(!this.username||!this.password||!this.phone||!this.address){
                    this.$dialog.toast({
                        mes: '请输全请输',
                        timeout: 1500,
                        icon: 'error'
                    });
                    return ;
                }
                const {data} =await axios.post(this.$api+'/user/register',{
                   username:this.username,
                   password:this.password,
                   phone:this.phone,
                   address:this.address
                })

                if(data.status===500){
                    this.$dialog.toast({
                        mes: data.data,
                        timeout: 1500,
                        icon: 'error'
                    });
                }else if(data.status===200){
                    this.$dialog.toast({
                        mes: '注册成功',
                        timeout: 1500,
                        icon: 'success'
                    });
                    setTimeout(res=>{
                        this.$router.push('/login')
                    },1500)
                }
            }
            /*
            FIXME 更新（传什么更新什么） OK
            register(){
                axios.post('http://localhost:7001/user/updateUser',
                    {
                        id:30,
                        username:"zjw",
                        password:'123',
                }).then(res=>{
                    console.log(res);
                })
            }*/

            /*
            TODO 删除ok but小心操作 之前误删整表（原因不明确）

            register(){
                axios.post('http://localhost:7001/user/deleteUser',{id:7}).then(res=>{
                    console.log(res);
                })
            }*/
        }
    }
</script>

<style scoped lang="scss">
  .yd-cell{
    background: none;
  }
  @import "../assets/css/main";
  * {
    color: $PrimaryBlack;
  }
  h1{
    font-size: 24px;
  }
  #app{
    background-image: url("../static/img/userlogin.jpg");
    background-position: center;
    background-size: cover;
    min-height:100vh;
  }
  .login{
    margin: 0 auto;
    width: 70%;
    margin-top: 100px;
    i{
      color: black;
    }
  }
  .mu-input-line{
    background: black;
  }
  .btn{
    margin: 0 auto;
    margin-top: 20px;
    color: $SecondaryWhite;
    font-size: 16px;
  }
  .register{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    text-shadow: 0 0 5px white;
  }

</style>
