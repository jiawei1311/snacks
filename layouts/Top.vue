<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
    import shopCars from '../components/shopCar'
    export default {
        name: "BottomNavigation",
        components:{
            shopCars
        },
        data () {
            return {
                PageIndex:'/'
            }
        },
        methods:{
            fetchData(newKey,old){
                this.PageIndex=newKey.path
            }
        },
        watch:{
            "$route":"fetchData"
        },
        mounted() {
            this.PageIndex=this.$route.path
            console.log(this.$route.path);
        }
    }
</script>

<style lang="scss">
  @import "../assets/css/main";
</style>

