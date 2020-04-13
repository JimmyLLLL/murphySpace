<template>
    <div class="wrapper animated slideInUp">
        <p class="comment-title">评论区域</p>
        <el-input type="textarea" v-model="content" placeholder="在此输入您的想法" v-if="isLogin"></el-input>
        <div class="send-btn-wrapper">
            <el-button size="small" @click="handleSend" v-if="isLogin">发送</el-button>
        </div>
        <div class="comment-list-wrapper">
            <template v-if="commentList.length">
                <div v-for="(item) in commentList" :key="item.id" class="comment-single-wrapper">
                    <img class='img-wrapper' :src="'http://www.jinmylam.xin:8003/uploads/avator/'+item.avator" @click="handleJumpPersonal(item.name)"/>  
                    <div class="infored-wrapper">
                        <div class="infored-1">
                            <span class="nickname">{{item.nickname}}</span>
                            <span class="time">时间：{{item.moment}}</span>
                            <span class="account">身份：{{item.name}}</span>
                            <span class="delete" v-if="isLogin && item.name===account" @click="handleDelete(item.id)">删除</span>
                        </div>
                        <div class="infored-2">{{item.content}}</div>                
                    </div> 

                </div>                  
            </template>
            <div v-else class="no-data">暂时没有人贡献想法噢～</div>
        </div>

    </div>
</template>

<script>
//@keyup.enter.native="handleSend"
export default {
    name:'comment',
    props:{
        id:{
            default:''
        }
    },
    computed:{
        isLogin(){
            return this.$store.state.login.userData
        },
        account(){
            return this.$store.state.login.userData.account
        }
    },
    methods:{
        handleJumpPersonal(account){
        const routeData = this.$router.resolve({
            name: "PersonalOther",
            query:{account}
        });
        window.open(routeData.href, '_blank');
        },
        async handleDelete(id){
            this.$confirm('即将删除', '警告', {
                    confirmButtonText: '再次确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(async () => {
                    try{
                        const result = await this.$api.deleteComment(id,this.id)
                        this.commentList = result.data.reverse()
                        this.$message.success('删除操作已执行完毕')
                    }catch(e){
                        console.log(e)
                        this.$message.error('删除失败')
                    }
                },()=>{})

        },
        async handleSend(){
            try{
                const result = await this.$api.sendComment(this.id,this.content)
                this.commentList = result.data.reverse()
                this.$message.success('传送已送达，感谢您为博主社区作出的贡献')
                this.content = ''                
            }catch(e){
                this.$message.error('传送失败')
            }

        },
        async getComment(){
            try{
                const result = await this.$api.getComment(this.id)
                this.commentList = result.data.reverse()              
            }catch(e){
                this.$message.error('获取评论列表失败')
            }

        }
    },
    data(){
        return{
            content:'',
            commentList:[]
        }
    },
    created(){
        this.getComment()
    }
}
</script>
<style lang="scss" scoped>
.comment-list-wrapper{
    margin: 15px 0;
}
.comment-single-wrapper{
    display: flex;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 5px;
    margin-top: 5px;
}
.no-data{
    text-align: center;
    font-size: 12px;
}
.infored-wrapper{
    flex:1;
    .infored-1{
        .nickname{
            padding-left: 5px;
        }
        .delete,.time,.account{
            font-size: 12px;
            line-height: 16px;
            float: right;
        }
        .account{
            margin-right: 15px;
        }
        .delete{
            cursor: pointer;
            margin-right: 15px;
            color:red
        }
    }
    .infored-2{
        color:grey;
        font-size: 14px;
        line-height: 16px;
        padding-top: 5px;
        padding-left: 5px;
    }
}
.img-wrapper{
    cursor: pointer;
    width: 50px;
    height: 50px;
    background-size:cover
}
.wrapper{
    margin: 0 20px;
    .comment-title{
        line-height: 30px;
        padding-left: 5px;
    }
}
.send-btn-wrapper{
    line-height: 35px;
    text-align: right;
}
</style>