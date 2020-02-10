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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">注 册</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>    
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        login:{
          account:"",
          password:""
        }
      };
    },
    methods: {
      handleClose(done) {
        done()
      }
    }
  };
</script>

<style lang="scss" scoped>
  .input-account{
    margin-bottom: 20px;
  }
</style>