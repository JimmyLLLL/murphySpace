<template>
    <div class="wrapper">
        <div class="input-flex">
            <el-input class="writter-title" v-model="title" placeholder="在此为您的创意命一个题目"></el-input>
            <el-input class="writter-nickname" v-model="nickname" placeholder="署名"></el-input>
        </div>
        <quillEditor v-model="content" :options="editorOption"></quillEditor>
        <div class="submit-move-dot" v-dragable><div class="submit-btn" @click="handleSend">Send</div></div>
    </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { quillEditor } from 'vue-quill-editor'
const editorOption = {
    placeholder: '感谢使用murphySpace创作工作区，在此激发您的灵感',
    modules: {
        syntax: {
            highlight: text => hljs.highlightAuto(text).value
        },
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            [{'direction': 'rtl'}],                         // text direction

            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],
            [ 'image']
        ]
    }
}
Object.freeze(editorOption)
export default {
    name:'Writter',
    components:{
        quillEditor
    },
    data(){
        return{
            editorOption,
            content:'',
            title:'',
            nickname:''
        }
    },
    mounted(){},
    watch:{
        content(val){
            console.log(val)
        }
    },
    created(){
        Object.freeze(this.toolbar)
    },
    methods:{
        handleSend(){
            this.$confirm('即将传送，是否确定？', '提示', {
                    confirmButtonText: '好',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.sendData()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
            })
        },
        async sendData(){
            try{
                const result = await this.$api.sendBlog(this.title,this.nickname,this.content)
                this.$router.push({name: 'Home',params: {reload:true}})
                this.$message.success('感谢您为社区的贡献，已传送完毕')
            }catch(e){
                if(e.status===401){
                    this.$message.error('账号信息过期，请重新登入')
                }else{
                    this.$message.error('发送过程出现问题，请联系Murphy')
                }
                
            }
            
    
        }
     }
}
</script>

<style lang="scss" scoped>
.writter-title{
    margin-bottom: 10px;
}
.input-flex{
    display: flex;
    .writter-nickname{
        width: 200px;
        margin-left: 10px;
    }
}
.submit-btn{
    color: white;
    height: 70px;
    width: 70px;
    line-height: 70px;
    text-align: center;
    border-radius: 5px;
    position: relative;
    top: 5px;
    left: 5px;
    background: inherit;
    cursor: pointer
}
.submit-move-dot{
    background: rgb(49, 205, 56);
    right: 130px;
    top: 175px;
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    cursor: col-resize;
}
.wrapper{
    height: calc(100% - 50px);
    padding: 10px;
    box-sizing: border-box;
    /deep/ .quill-editor{
        height: 100%;
        .ql-container{
            @media screen and (max-width: 1044px){
                height: calc(100% - 90px);
            }
            @media screen and (min-width: 1045px) and (max-width: 1579px){
                height: calc(100% - 66px);
            }
            @media screen and (min-width: 1570px){
                height: calc(100% - 42px);
            }
        }
    }
}
</style>