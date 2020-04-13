<template>
    <div>
      <el-dialog
      title="欢迎登入MurphySpace"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :modal="false"
      :before-close="handleClose">
      <el-input v-model="login.account" placeholder="请输入MurphySpace专属身份ID" class="input-account" @blur="handleResBlur"></el-input>
      <span class="warning" v-if="isShowWarning">{{warningWord}}</span>
      <el-input placeholder="请输入私人密码" v-model="login.password" show-password class="input-password" @keyup.enter.native="handleLogin"></el-input>
      <div class="status-radio">
        <el-radio v-model="status" label="login" border>登入</el-radio>
        <el-radio v-model="status" label="res" border="">注册</el-radio>        
      </div>

      <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleRegister" :disabled="isNotResigerPass" v-if="status==='res'">注 册</el-button>
          <el-button type="primary" @click="handleLogin" :loading="isConfirmLoading" :disabled="isNotLoginPass" v-if="status==='login'">登 入</el-button>
      </span>
      </el-dialog>  
      <div class="text">登入MurphySpace以开启创意</div>     
    </div>
   
</template>
<script>
  export default {
    name:'loginDialog',
    data() {
      return {
        status:'login',
        dialogVisible: true,
        isConfirmLoading:false,
        isNotResiger:true,
        isPassReg:false,
        warningWord:'',
        login:{
          account:"",
          password:""
        }
      };
    },
    watch:{
      status(){
        this.login.account = ''
        this.login.password = ''
      }
    },
    computed:{
      isShowWarning(){
        return this.status === 'res' && (!this.isNotResiger || !this.isPassReg)
      },
      isNotResigerPass(){
        if(this.login.account && this.login.password && this.isNotResiger){
          return false
        }else{
          return true
        }
        
      },
      isNotLoginPass(){
        if(this.login.account && this.login.password){
          return false
        }else{
          return true
        }
      }

    },
    activated(){
      this.dialogVisible = true
    },
    methods: {
      async handleResBlur(){
        if(this.status==='login') return
        const reg = new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
        if(!reg.test(this.login.account)){
          this.warningWord = '账号必须为邮箱格式'
          this.isPassReg = false
          return
        }else{
          this.isPassReg = true
        }
        try{
          const {data} = await this.$api.checkExistAccount(this.login.account)
          if(data.canRes){
            this.isNotResiger = true
          }else{
            this.warningWord = '此账号已存在'
            this.isNotResiger = false
          }
        }catch(e){
          this.$message.error('服务端发生错误，请联系murphy')
        }

      },
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
        try{
          const result = await this.$api.register(this.login.account,this.login.password)
          this.$message.success('注册成功，可以登入')
          this.status = 'login'
        }catch(e){
          this.$message.error('注册失败，请联系murphy')
        }
      },
      async handleLogin(){
        if(this.status==='res') return
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
  .warning{
    color: red;
    position: absolute;
    top: 122px;
    left: 31px;
  }
  .status-radio{
    position: relative;
    text-align: center;
    top: 18px;
  }
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