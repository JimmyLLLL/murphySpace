<template>
    <div class="personal-wrappper">
        <el-card :body-style="{ padding: '0px' }" class="card">
            <img :src="userData.avator" class="image">
            <div style="padding: 14px;">
                <span>{{userData.nickname}}</span>
                <div class="bottom">
                    <p class="letter">{{ userData.word }}</p>
                    <p class="letter letter-bottom">帐号：{{ userData.account }}</p>
                </div>
            </div>
        </el-card> 
        <div class="input-wrapper">
            <uploadAva></uploadAva>
            <el-input v-model="currentNickName" placeholder="请输入新昵称"></el-input>
            <el-input v-model="currentWord" placeholder="请输入新签名"></el-input>
            <el-button @click="handleUpdate">更新</el-button>
        </div>     
    </div>

</template>


<script>
import uploadAva from '../../components/uploadAva'
export default {
    name:'Personal',
    components:{
        uploadAva,
    },
  data() {
    return {
      currentNickName:this.$store.state.login.userData.nickname,
      currentWord:this.$store.state.login.userData.word
    };
  },
  methods:{
      async handleUpdate(){
          try{
              const {data} = await this.$api.handleUpdate(this.currentNickName,this.currentWord)
              this.$store.dispatch('changeInfo',data.newInfo)
              this.$message.success('信息更新已完成')
          }catch(e){
              this.$message.error('更新失败：'+e.message)
          }
          
      }
  },
  computed:{
      userData(){
          return this.$store.state.login.userData
      }
  },
  created(){
      console.log(this.$store.state.login.userData)
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper{
    position: absolute;
    top:50px;
    left:350px;
}
.personal-wrappper{
    height: 100%;
    position: relative;
}
.card{
    position: relative;
    top: 10px;
    left: 10px;
    width: 300px;
}
  .letter {
    font-size: 13px;
    color: #999;
    line-height: 15px;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .letter-bottom{
      margin-top:10px;
  }


  .image {
    width: 100%;
    display: block;
  }
</style>