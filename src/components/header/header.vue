<template>
  <div class="header-wrapper">
    <div class="left">我是左边</div>
    <div class="center">MurphySpace</div>
    <div class="right">
      <span class="right-son-1" v-if="!isLogin" @click="handleLoginBtnClick">登入</span>
      <span class="right-son-2" v-if="isLogin" @click="handleCreateWritter">{{writterText}}</span>
    </div>
    <loginDialog ref="loginDialog"></loginDialog>
  </div>
</template>

<script>
import loginDialog from '../loginDialog/loginDialog'
export default {
  name: 'murphyHeader',
  data(){
    return{
      isWritting:false,
      writterText:'创作'
    }
  },
  components:{
    loginDialog
  },
  computed:{
    isLogin(){
      return this.$store.state.login.isLogin
    }
  },
  methods:{
    handleLoginBtnClick(){
      this.$emit('showLoginDialog')
    },
    handleCreateWritter(){
      if(this.isWritting){
        this.$router.push('/')
        this.writterText = '创作'
      }else{
        this.$router.push('Writter')
        this.writterText = '返回首页'
      }
      this.isWritting = !this.isWritting
      
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
  }
  .left,.center,.right{
    flex: 1;
    color: white;
    line-height: 40px;
    text-align: center;
  }
  .right-son-1,.right-son-2{
    cursor: pointer;
  }
</style>
