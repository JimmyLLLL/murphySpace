<template>
    <div class="wrapper" v-loading="isLoading">
        <div class="input-flex">
            <el-input class="writter-title" v-model="title" placeholder="在此为您的创意命一个题目"></el-input>
            <el-input class="writter-nickname" v-model="nickname" placeholder="署名"></el-input>
        </div>
      <el-upload
            class="avatar-uploader"
            action="http://www.jinmylam.xin:8003/blog/uploadBlogPhoto"
            name="img"
            :headers="header"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload" 
        />
        <quillEditor v-model="content" :options="editorOption" ref="quillEditor"></quillEditor>
        <chartColumnDialog ref="chartDialog"></chartColumnDialog>
        <div class="submit-move-dot" v-dragable><div class="submit-btn" @click="handleSend">Send</div></div>
        <div class="clear-move-dot" v-dragable><div class="submit-btn" @click="handleClear">清空</div></div>
    </div>
</template>

<script>
import hljs from 'highlight.js'
import chartColumnDialog from '../chartColumnDialog'
import 'highlight.js/styles/monokai-sublime.css'
import { quillEditor } from 'vue-quill-editor'
const toolbarContainer = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block','charts'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    [ 'image']
]
Object.freeze(toolbarContainer)
export default {
    name:'Writter',
    components:{
        quillEditor,
        chartColumnDialog
    },
    data(){
        return{
            header:{
                authorization:localStorage.getItem('token')
            },
            editorOption:{
                placeholder: '感谢使用murphySpace创作工作区，在此激发您的灵感',
                modules: {
                    imageResize: {
                        displayStyles: {
                        backgroundColor: 'black',
                        border: 'none',
                        color: 'white'
                        },
                        modules: ['Resize', 'DisplaySize', 'Toolbar']
                    },
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    },
                    toolbar:{
                        container:toolbarContainer,
                        handlers: {
                            'image': function (value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                },
                            'charts':()=>{
                                this.$refs.chartDialog.centerDialogVisible = true
                            }
                        }
                }
                    }
            },
            content:'',
            title:'',
            nickname:this.$store.state.login.userData.nickname,
            isLoading:false,
            id:'',
            tickSaveTimmer:null
        }
    },
    mounted(){
        this.makeChartTitle()
    },
    created(){
        Object.freeze(this.toolbar)
        this.handleInitCheck()
        this.initTickSave()
    },
    destroyed(){
        this.destroyTickSave()
    },
    methods:{
        destroyTickSave(){
            clearInterval(this.tickSaveTimmer)
        },
        clearStorage(){
            localStorage.setItem("title",'')
            localStorage.setItem("content",'')   
        },
        handleClear(){
            this.$confirm('即将清空一切，是否确定？', '提示', {
                    confirmButtonText: '好',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.title = ''
                    this.content = ''
                    this.clearStorage()
                }).catch(() => {})
        },
        async memoryLogin(){
            try{
                const result = await this.$api.memoryLogin()
                localStorage.setItem("token",result.data.token)
                delete result.data.token
                this.$store.dispatch('changeLoginStatus',{userData:result.data})                
            }catch(e){}

        },
        initTickSave(){
            this.tickSaveTimmer = setInterval(()=>{
                localStorage.setItem("title",this.title)
                localStorage.setItem("content",this.content)
                this.memoryLogin()
                this.$message.success('自动保存成功')
            },60000)
        },
        makeChartTitle(){
            const target = document.getElementsByClassName('ql-charts')[0]
            if(target){
                this.$nextTick(()=>{
                    target.innerHTML = 'charts'
                })
            }else{
                setTimeout(()=>{
                    this.makeChartTitle()
                },100)
                
            }
        },
        uploadSuccess(res){
            const quill = this.$refs.quillEditor.quill
            const length = quill.getSelection()!==null ? quill.getSelection().index:0; //光标所在位置
            quill.insertEmbed(length, 'image', res.url)
            quill.setSelection(length + 1)
        },
        beforeUpload(){

        },
        uploadError() {
            this.$message.error('图片插入出现问题')
        },
        async getDetail(id){
            try{
                this.isLoading = true
                const {data} = await this.$api.enterBlog(id)
                this.title = data.title
                this.content = data.content
                this.nickname = data.name
                this.id = data.id
            }catch(e){
                this.$message.error(e)
            }finally{
                this.isLoading = false
            }

        },
        handleInitCheck(){
            const editId = this.$route.params.target
            editId ? this.getDetail(editId): this.checkStorage()
        },
        checkStorage(){
            const title = localStorage.getItem('title')
            const content = localStorage.getItem('content')
            if(title || content){
                this.title = title
                this.content = content
                this.$message.success('已恢复到上次的写作进度')
            }
        },
        handleSend(){
            this.$confirm('即将传送，是否确定？', '提示', {
                    confirmButtonText: '好',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    if(this.$route.params.target){
                        this.modifyData()
                    }else{
                        this.sendData()
                    }
                }).catch(() => {})
        },
        async sendData(){
            try{
                const result = await this.$api.sendBlog(this.title,this.nickname,this.content)
                this.destroyTickSave()
                this.clearStorage()
                this.$router.push({name: 'Home',params: {reload:true}})
                this.$message.success('感谢您为社区的贡献，已传送完毕')
            }catch(e){
                if(e.status===401){
                    this.$message.error('账号信息过期，请重新登入')
                }else{
                    this.$message.error('发送过程出现问题，请联系Murphy')
                }
                
            }
    
        },
        async modifyData(){
            try{
                const result = await this.$api.updateBlog(this.title,this.content,this.nickname,this.id)
                this.$router.push({name: 'BlogDetail',params: {target:this.id}})
                this.$message.success('感谢您为社区的贡献，已修改完毕')
            }catch(e){
                if(e.status===401){
                    this.$message.error('账号信息过期，请重新登入')
                }else{
                    this.$message.error('修改过程出现问题，请联系Murphy')
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
.avatar-uploader{
    height:0
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
.submit-move-dot,.clear-move-dot{
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    cursor: col-resize;
}
.submit-move-dot{
    background: rgb(49, 205, 56);
    right: 130px;
    top: 175px;
}
.clear-move-dot{
    background: red;
    right: 130px;
    bottom: 300px;    
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