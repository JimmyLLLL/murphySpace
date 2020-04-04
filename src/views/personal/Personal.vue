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
        <div class="edit-btn animated zoomIn" v-if="!isEditing" @click="handleEdit">编辑</div>
        <div class="input-wrapper animated flipInX" v-else>
            <uploadAva></uploadAva>
            <el-input v-model="currentNickName" placeholder="请输入新昵称" class="nickname-edit"></el-input>
            <el-input v-model="currentWord" placeholder="请输入新签名" class="word-edit"></el-input>
            <el-button @click="handleBack" class="update-btn">返回</el-button>
            <el-button @click="handleUpdate" class="update-btn">更新</el-button>
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
      currentWord:this.$store.state.login.userData.word,
      isEditing:false
    };
  },
  methods:{
      handleBack(){
          this.isEditing = false
      },
      handleEdit(){
          this.isEditing = true
      },
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
}
</script>

<style lang="scss" scoped>
.nickname-edit,.word-edit,.update-btn{
    margin-top: 5px;
}
.edit-btn{
    cursor: pointer;
    position: absolute;
    top:100px;
    left:450px;
    width: 100px;
    height: 100px;
    background: #31cd38;
    border-radius: 50px;
    line-height: 100px;
    text-align: center;
    color: white;
}
.input-wrapper{
    position: absolute;
    top:25px;
    left:450px;
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