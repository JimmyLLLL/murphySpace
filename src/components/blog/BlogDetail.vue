<template>
    <div class="ql-container ql-snow" v-loading="isLoading" element-loading-text="数据传输中...">
        <div class="title">{{title}}</div>
        <div class="ql-editor" v-html="content"></div>
    </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    name:'BlogDetail',
    components:{
        quillEditor
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
    .ql-container{
        z-index: 0;
        margin: 10px 20px;
        border: none;
    }
    .title{
        text-align: center;
        font-size: 25px;
    }
</style>