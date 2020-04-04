<template>
    <div class="nav-wrapper">
        <el-menu class="el-menu-vertical-demo" :collapse="false" :router="true">
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/MySpace" v-if="$store.state.login.userData">
                <i class="el-icon-document"></i>
                <span slot="title">MySpace</span>
            </el-menu-item>
            <el-menu-item index="/Personal" v-if="$store.state.login.userData">
                <i class="el-icon-setting"></i>
                <span slot="title">个人资料</span>
            </el-menu-item>
        </el-menu>    
    </div>

</template>


<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .nav-wrapper{
      position: fixed;
      top: 50px;
  }
</style>

<script>
  export default {
      name:'murphyNav',
    data() {
    return {
    };
    },
    methods: {
    }
  }
</script>