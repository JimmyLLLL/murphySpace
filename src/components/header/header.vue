<template>
  <div class="header-wrapper">
    <div class="left animated fadeInUp left-back" v-if="isReading" @click="handleBack">返回<Icon iconClass="return"></Icon></div>
    <div class="left animated flipInX" v-if="!isReading">{{nickname}}<Icon iconClass="smile"></Icon></div>
    <div class="center">MurphySpace</div>
    <div class="right">
      <span class="right-son-1" v-if="!isLogin" @click="handleLoginBtnClick">登入</span>
      <span class="right-son-2" v-if="isLogin && !isReading && !isInPersonal" @click="handleCreateWritter">{{writterText}}<Icon v-if="isWritting" iconClass="return"></Icon><Icon v-if="!isWritting" iconClass="writter"></Icon></span>
      <span class="right-son-3" v-if="isLogin" @click="handleOut">登出<Icon iconClass="out"></Icon></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'murphyHeader',
  data(){
    return{
      isWritting:false,
      writterText:'创作',
      isReading:false,
      writterRouteBefore:null,
      blogRouteBefore:null,
      isInPersonal:false
    }
  },
  watch:{
    $route(to,from){
      switch(to.path){
        case '/BlogDetail':
          this.isReading=true
          this.blogRouteBefore = from.path !== '/Writter' ? from.path:  '/'
          this.isInPersonal = false
          break
        case '/':
          this.isReading=false
          this.isWritting = false
          this.isInPersonal = false
          this.writterText = '创作'
          break;
        case '/Writter':
          this.writterText = '返回文章列表'
          this.isWritting = true
          this.isInPersonal = false
          break;
        case '/MySpace':
          this.isReading=false
          this.isWritting = false
          this.isInPersonal = false
          this.writterText = '创作'
          this.writterRouteBefore = this.$route.path
          break;
        case '/Personal':
          this.isInPersonal = true
          this.blogRouteBefore = from.path
      }
    }
  },
  components:{
  },
  computed:{
    isLogin(){
      return this.$store.state.login.userData
    },
    nickname(){
      return this.$store.state.login.userData ? '您好，' + this.$store.state.login.userData.nickname :''
    }
  },
  created(){
    window.addEventListener("clearItemEvent", function(e) {
      e.key==='token' && this.$store&&  this.$store.dispatch&& this.$store.dispatch('changeLoginStatus',{userData:null})
    });
  },
  methods:{
    handleBack(){
      this.blogRouteBefore ?this.$router.push(this.blogRouteBefore) :this.$router.push('/')
    },
    handleLoginBtnClick(){
      this.$router.push({
        path:'/loginDialog'
      })
    },
    handleCreateWritter(){
      if(this.isWritting){
        this.writterRouteBefore ?this.$router.push(this.writterRouteBefore) :this.$router.push('/')
      }else{
        this.writterRouteBefore = this.$route.path
        this.$router.push('/Writter')
      }
    },
    handleOut(){
      localStorage.removeItem("token")
      this.$store.dispatch('changeLoginStatus',{userData:null})
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-wrapper{
    height: 40px;
    background: black;
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 2;
  }
  .right-son-2,.right-son-3,.left-back{
    transition:all .3s;
  }
  .right-son-2:hover,.right-son-3:hover,.left-back:hover{
    font-size: 110%;
  }
  .right-son-2:hover,.left-back:hover{
    color:#31cd38
  }
  .right-son-3:hover{
    color:red
  }
  .left,.center,.right{
    flex: 1;
    color: white;
    line-height: 40px;
    text-align: center;
  }
  .right-son-1,.right-son-2,.right-son-3,.left-back{
    cursor: pointer;
  }
  .right-son-3{
    margin-left: 20px;
  }
</style>
