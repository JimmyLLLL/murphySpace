<template>
    <div>
        <div class="ql-container ql-snow">
            <div class="mask" v-loading="isLoading" v-if="isLoading"></div>
            <div class="title animated jackInTheBox">{{title}}</div>
            <div class="infor-wrapper">
                <span class="nickname">创作者：{{nickname}}</span>
                <span class="time">更新时间：{{time}}</span>
                <span class="account">身份：{{account}}</span>
            </div>
            <div class="ql-editor" v-html="content"></div>
        </div>   
        <comment :id="target" v-if="!isLoading"></comment> 
    </div>

</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { quillEditor } from 'vue-quill-editor'
import comment from '../comment'
export default {
    name:'BlogDetail',
    components:{
        quillEditor,
        comment
    },
    data(){
        return{
            title:'',
            content:'',
            nickname:'',
            account:'',
            time:'',
            isLoading:false
        }
    },
    computed:{
        target(){
            const target = this.$route.params.target
            return target ? target :sessionStorage.getItem('currentDetail')
        }
    },
    methods:{
        async getDetail(id){
            try{
                this.isLoading = true
                const {data} = await this.$api.enterBlog(id)
                this.title = data.title
                this.nickname = data.name
                this.time = data.moment
                this.account = data.uid
                this.content = data.content
            }catch(e){
                this.$message.error(e)
            }finally{
                this.isLoading = false
            }

        }
    },
    created(){
        if(this.$route.params.target){
            const target = this.$route.params.target
            sessionStorage.setItem('currentDetail', target)
            this.getDetail(target)
        }else{
            this.getDetail(sessionStorage.getItem('currentDetail'))
        }
    }
}
</script>

<style lang="scss" scoped>
    .infor-wrapper{
        font-size: 12px;
        color:grey;
        line-height: 50px;
        .account{
            margin-right: 10px;
        }
        .account,.time{
            float: right;
        }
    }
    .ql-snow{
        min-height: 100%;
    }
    .ql-container{
        z-index: 0;
        margin: 10px 20px;
        border: none;
    }
    .title{
        text-align: center;
        font-size: 25px;
    }
    .mask{
        top: 0;
        left: 0;
        position: fixed;
        height: 100%;
        width: 100%;
    }
</style>