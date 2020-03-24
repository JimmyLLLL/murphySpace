<template>
    <div>
      <el-dialog
      title="欢迎登入MurphySpace"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :modal="false"
      :before-close="handleClose">
      <el-input v-model="login.account" placeholder="请输入MurphySpace专属身份ID" class="input-account"></el-input>
      <el-input placeholder="请输入私人密码" v-model="login.password" show-password class="input-password"></el-input>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleRegister">注 册</el-button>
          <el-button type="primary" @click="handleLogin" :loading="isConfirmLoading">确 定</el-button>
      </span>
      </el-dialog>  
      <div class="text">登入MurphySpace以开启创意</div>     
    </div>
   
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: true,
        isConfirmLoading:false,
        login:{
          account:"",
          password:""
        }
      };
    },
    activated(){
      this.dialogVisible = true
    },
    methods: {
      handleClose(done) {
        this.$router.push({
            path:'/'
        })
        done()
      },
      handleCancel(){
        this.$router.push({
            path:'/'
        })
        this.dialogVisible = false;
        this.login = {}
      },
      async handleRegister(){
        
      },
      async handleLogin(){
        try{
          this.isConfirmLoading = true
          const result = await this.$api.login(this.login.account,this.login.password)
          if(result.data.token){
            localStorage.setItem("token",result.data.token)
            delete result.data.token
             this.$store.dispatch('changeLoginStatus',{userData:result.data})
             this.dialogVisible = false
              this.$router.push({
                  path:'/'
              })
             this.$message.success('欢迎您来到MurphySpace')
          }else{
            this.$message.warning('用户信息不存在，您可以注册此账号')
          }
        }catch(e){
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
  .text{
    text-align: center;
    bottom: 150px;
    font-size: 30px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 12px;
  }
  .input-account{
    margin-bottom: 20px;
  }
</style>