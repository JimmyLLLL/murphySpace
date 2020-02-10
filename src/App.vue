<template>
  <div id="app">
    <Murphyheader @showLoginDialog="handleShowLoginDialog"/>
    <div class="main-wrapper">
      <router-view/>
    </div>
    <Murphynav />
    <loginDialog ref="loginDialog"></loginDialog>
  </div>
</template>

<script>
import loginDialog from './components/loginDialog/loginDialog'
import Murphyheader from './components/header/header'
import Murphynav from './components/nav/nav'
export default {
  name: 'App',
  components:{
    Murphyheader,
    Murphynav,
    loginDialog
  },
  methods:{
    handleShowLoginDialog(){
      this.$refs.loginDialog.dialogVisible = !this.$refs.loginDialog.dialogVisible 
    }
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
</style>
