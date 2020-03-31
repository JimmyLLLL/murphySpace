<template>
    <div>
        <div class="ql-container ql-snow" element-loading-text="数据传输中...">
            <div class="mask" v-loading="isLoading" v-if="isLoading"></div>
            <div class="title">{{title}}</div>
            <div class="ql-editor" v-html="content"></div>
        </div>   
        <comment :id="$route.params.target" v-if="!isLoading"></comment> 
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
            isLoading:false
        }
    },
    methods:{
        async getDetail(id){
            try{
                this.isLoading = true
                const {data} = await this.$api.enterBlog(id)
                this.title = data.title
                this.content = data.content
            }catch(e){
                this.$message.error(e)
            }finally{
                this.isLoading = false
            }

        }
    },
    created(){
        this.getDetail(this.$route.params.target)
    }
}
</script>

<style lang="scss" scoped>
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