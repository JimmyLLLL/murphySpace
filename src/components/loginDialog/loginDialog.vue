<template>
    <el-dialog
    title="欢迎登入MurphySpace"
    :visible.sync="dialogVisible"
    width="30%"
    center
    :before-close="handleClose">
    <el-input v-model="login.account" placeholder="请输入MurphySpace专属身份ID" class="input-account"></el-input>
    <el-input placeholder="请输入私人密码" v-model="login.password" show-password class="input-password"></el-input>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleRegister">注 册</el-button>
        <el-button type="primary" @click="handleLogin" :loading="isConfirmLoading">确 定</el-button>
    </span>
    </el-dialog>    
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        isConfirmLoading:false,
        login:{
          account:"",
          password:""
        }
      };
    },
    methods: {
      handleClose(done) {
        done()
      },
      handleCancel(){
        this.dialogVisible = false;
        this.login = {}
      },
      async handleRegister(){
        
      },
      async handleLogin(){
        try{
          this.isConfirmLoading = true
          const result = await this.$api.login(this.login.account,this.login.password)
          if(result.data.account){
             this.$store.dispatch('changeLoginStatus',{isLogin:true,userData:result.data})
             this.dialogVisible = false
             this.$message.success('欢迎您来到MurphySpace')
          }else{
            this.$message.warning('用户信息不存在，您可以注册此账号')
          }
        }catch(e){
          console.log(e)
          this.login.password = ''
          this.$message.error('密码验证错误，请重新输入')
        }finally{
          this.isConfirmLoading = false
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .input-account{
    margin-bottom: 20px;
  }
</style>