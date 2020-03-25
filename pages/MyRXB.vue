<template>
  <div id="app">
    <top-title :need="true" style="background: white" title="我的热销榜"/>
    <div class="p404" v-if="MyRXB.length===0">
      <cuowu>
        您未买过零食
      </cuowu>
    </div>

    <v-chart v-else style="width: 100%;height: 500px;" :options="polar"></v-chart>



  </div>
</template>

<script>
    import topTitle from '@/components/top'
    import Cuowu from '../components/404'
    import axios from 'axios'
    import {mapGetters} from 'vuex'


    export default {
        name: "MyRXB",
        components:{
            'cuowu':Cuowu,
            topTitle,
        },
        data(){
            return{
                polar: {
                    backgroundColor: '#2c343c',

                    /*title: {
                        text: '我的热销榜',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },*/

                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}<br/>购买数量{c}<br/> 占总量({d}%)"
                    },

                    visualMap: {
                        show: false,
                        min: 0,
                        max: 10,
                        inRange: {
                            colorLightness: [0.4, 0.8]
                        }
                    },
                    series :
                        {
                            name:'访问来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                           /* data:[
                                {value:335, name:`直接访问`},
                                {value:310, name:'邮件营销'},
                                {value:274, name:'联盟广告'},
                                {value:235, name:'视频广告'},
                                {value:400, name:'搜索引擎'}
                            ].sort(function (a, b) { return a.value - b.value; }),*/
                            data:this.MyRXB,
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: 'rgba(255, 255, 255, 0.5)'
                                    },
                                    fontSize:12,
                                    formatter(v) {
                                        let text = v.name
                                        return text.length < 6
                                            ? text
                                            : `${text.slice(0,6)}\n${text.slice(6)}`
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0,
                                    length: 10,
                                    length2: 10
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }

                },
                MyRXB:[],
                that:this
            }
        },
        computed:{
            ...mapGetters({
                user: 'user/user'
            })
        },
        methods:{
            async getMyRXB(){
                let MyRXB=[];
                const {data} = await  axios.get(this.$api+'/order/lookOrder/'+this.user.id)
                console.log(data);
                let a = this.SortRXB(data.data);
                this.MyRXB=[]
                a.forEach(res=>{
                    this.MyRXB.push({
                        value:res.shopNum,
                        name:res.name
                    })
                })

            },
            SortRXB(data){
                // TODO 自己写的乐色
                let a=[];
                data.forEach((res,i,arr)=>{
                    let flag = true;
                    a.forEach((ares,ai,aarr)=>{
                        if(res.shopId===ares.shopId){
                            ares.shopNum+=res.shopNum;
                            flag = false;
                            return;
                        }
                    });
                    if(flag){
                        a.push(res)
                    }
                });
                return a;
            }
        },
        mounted() {
            this.getMyRXB()
        },
        watch:{
            MyRXB(val){
                console.log(val);
                this.polar.series.data=val
            }
        }
    }
</script>

<style scoped>

</style>
