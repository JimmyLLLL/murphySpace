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
        <div class="edit-btn animated zoomIn" @click="handleEnter">个人博客</div>   
    </div>

</template>


<script>
export default {
    name:'PersonalOther',
  data() {
    return {
        userData:null
    };
  },
  methods:{
      handleEnter(){
        const routeData = this.$router.resolve({
            name: "MySpaceOther",
            query:{account:this.$route.query.account}
        });
        window.open(routeData.href, '_blank');
      },
      async fetchInfo(account){
          let result = await this.$api.findDataByName(account)
            result = result.data
            result.avator = 'http://www.jinmylam.xin:8003/uploads/avator/'+result.avator
          this.userData = result
      }
  },
  created(){
      this.fetchInfo(this.$route.query.account)
  }
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