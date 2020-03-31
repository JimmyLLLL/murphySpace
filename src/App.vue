<template>
  <div id="app" @scroll="handleScroll">
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
import {throttle} from './util/index'
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

    },
    handleScroll(e){
        this.$store.dispatch('changeOffsetTop',e.target.scrollTop)
    },
    throttleScrollFunc(){
      const tempFunc = this.handleScroll
      this.handleScroll = throttle((e)=>{tempFunc(e)},500)
    },
    getWindowSize(){
        this.$store.dispatch('changeArea',{
          width:document.body.clientWidth,
          height:document.body.clientHeight
        })
    },
    watchingWindowSzie(){
      window.onresize = throttle(()=>{
        this.getWindowSize()
      },500)
    }
  },
  data(){
    return {
      excludeArr:['BlogDetail','Writter']
    }
  },
  created(){
    this.getWindowSize()
    console.log(this.$store.state.position.height,this.$store.state.position.width)
    this.watchingWindowSzie()
    this.throttleScrollFunc()
    this.memoryLogin()
  }
}
</script>

<style lang="scss" scoped>
  .main-wrapper{
    margin: 0 201px;
    box-sizing: border-box;
    padding-top: 40px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  #app{
    overflow: scroll;
  }
</style>
