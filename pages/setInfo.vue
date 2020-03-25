<template>
  <div id="app">
    <div>
      <top-title style="background: white" title="更改信息" />
    </div>
    <div class="user">
      <!--      <input type="file" @change="uploadFile($event)" multiple="multiple" />-->

      <div style="height: 100px;">
        <van-uploader :after-read="uploadFile">
          <img style="margin: 0 auto" v-if="img_show" :src="img_show" />
          <div v-else>
            <img style="margin: 0 auto" v-if="newUser.img" :src="this.$api+newUser.img" />
            <img style="margin: 0 auto" v-else src="../static/img/paidaxing2.png" />
          </div>
        </van-uploader>
      </div>

      <yd-cell-item arrow type="link" href="myAddress">
        <span slot="left">我的收货地址</span>
      </yd-cell-item>
    </div>

    <div class="content">
      <yd-cell-item>
        <span slot="left">真实姓名：</span>
        <input slot="right" v-model="newUser.realName" type="text" placeholder="请输入真实姓名" />
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <input slot="right" v-model="newUser.phone" type="number" placeholder="请输入手机号" />
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">城市：</span>
        <input
          slot="right"
          type="text"
          v-model="newUser.address"
          @click.stop="show2 = true"
          placeholder="请选择城市"
        />
      </yd-cell-item>
      <!--      <mu-text-field full-width class="input" color="black" underline-color="black" @click.stop="show2 = true" v-model="address" readonly label="请选择地址"></mu-text-field><br/>-->
    </div>

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

    <div class="btn btnP" @click="updateUser">保存</div>

    <div class="btn btnP" @click="$router.go(-1)">返回</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import topTitle from "@/components/top";
import axios from "axios";

export default {
  name: "setInfo",
  data() {
    return {
      newUser: {},
      show2: false,
      district: this.$District,
      file: "",
      img_show: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user"
    })
  },
  components: {
    topTitle
  },
  methods: {
    ...mapActions({
      setUser: "user/setUser",
      setIsLogin: "user/setIsLogin"
    }),
    uploadFile: function(file) {
      console.log(file);
      let _this = this;
      this.img_show = file.content;
      this.file = file.file; //获取input的图片file值
      let param = new FormData(); // 创建form对象
      param.append("imgFile", this.file); //对应后台接收图片名
      axios
        .post(this.$api + "/user/uploadImg", param)
        .then(function(res) {
          console.log(res);
          _this.newUser.img = res.data.url[0];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async updateUser() {
      console.log(this.newUser);
      await axios
        .post(this.$api + "/user/updateUser", {
          id: this.newUser.id,
          realName: this.newUser.realName,
          address: this.newUser.address,
          phone: this.newUser.phone,
          img: this.newUser.img
        })
        .then(res => {
          this.getUser();
          this.$dialog.toast({
            mes: "修改成功",
            timeout: 1500,
            icon: "success"
          });
          setTimeout(res => {
            this.$router.push("/user");
          }, 1500);
        });
    },
    result2(ret) {
      this.newUser.address =
        ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
    },
    async getUser() {
      const { data } = await axios.get(
        this.$api + "/user/getUser/" + this.user.id
      );
      this.setUser(data.data);
    },
    /*deepClone(initalObj) {
                var obj = {};
                console.log(typeof initalObj);
                console.log(JSON.stringify(initalObj));
                obj = JSON.parse(JSON.stringify(this.user));
                return obj;
            }*/
    deepClone(p, c) {
      var c = c || {};
      for (var i in p) {
        if (typeof p[i] === "object") {
          // c[i] = (p[i].constructor === Array) ? [] : {};
          this.deepClone(p[i], c[i]);
        } else {
          c[i] = p[i];
        }
      }
      return c;
    }
  },
  mounted() {
    this.newUser = this.deepClone(this.user);
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/main";
.yd-cell-item {
  border-top: 1px solid #f5f5f5;
  padding-left: 20px;
}
input[placeholder] {
  color: black;
}
.van-uploader {
  position: absolute;
  left: 50%;
  top: 60px;
  transform: translate(-50%, 0);
  z-index: 9999;
}
#app {
  background-image: url("../static/img/userlogin.jpg");
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  .btn {
    margin: 0 auto;
    margin-top: 20px;
    color: white;
    font-size: 16px;
  }
}
.content {
  background: white;
  margin-top: 10px;
}
.user {
  border-top: 1px solid #f5f5f5;
  background: white;
  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin: 0 auto;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
