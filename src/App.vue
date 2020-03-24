<template>
  <div id="app">
    <Murphyheader />
    <div class="main-wrapper">

        <keep-alive :exclude="excludeArr">
          <router-view class="animated fadeIn"/>
        </keep-alive>
    </div>
    <Murphynav />
  </div>
</template>

<script>
import Murphyheader from './components/header/header'
import Murphynav from './components/nav/nav'
export default {
  name: 'App',
  components:{
    Murphyheader,
    Murphynav
  },
  methods:{
    async memoryLogin(){
        try{
            const result = await this.$api.memoryLogin()
            localStorage.setItem("token",result.data.token)
            delete result.data.token
            this.$store.dispatch('changeLoginStatus',{userData:result.data})                
        }catch(e){
            console.log(e)
        }

    }
  },
  data(){
    return {
      excludeArr:['BlogDetail']
    }
  },
  created(){
    this.memoryLogin()
  }
}
</script>

<style lang="scss" scoped>
  .main-wrapper{
    margin: 0 201px;
    height: 100%;
    box-sizing: border-box;
    padding-top: 40px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
