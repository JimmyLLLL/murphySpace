<template>
    <div class="blog-list-wrapper">
        <div v-if="isHaveData" @click="handleArticleClick">
            <div v-for="(item,index) in data" :key="item.id" class="list-single" :article-id="item.id">
                <div class="list-title">
                    {{item.title}}
                    <Icon iconClass="leftArr" className="icon-left-arr"></Icon>
                </div>
                <div class="list-bottom">
                    <div class="bottom-left"><Icon iconClass="user"></Icon>创造者：{{item.name}}</div>
                    <div class="bottom-right"><span class="create-id" v-if="!isMy"><Icon iconClass="id"></Icon>身份：{{item.uid}}</span><span v-if="isMy && !noEdit" class="edit" :article-id="item.id"><Icon iconClass="edit"></Icon>编辑</span><span v-if="isMy && !noEdit" class="delete" :article-id="item.id" :dom-id="index"><Icon iconClass="delete"></Icon>删除</span><Icon iconClass="time"></Icon>诞生时间：{{item.moment}}</div>
                </div>
            </div>            
        </div>
        <div v-else class="is-nodata">
            {{sign}}
        </div>

    </div>
</template>

<script>
  export default {
    name:'BlogList',
    data () {
      return {}
    },
    props: {
        noEdit:{
            default:false
        },
        data: {
            default:[]
        },
        isLoading: { 
            default:true
        },
        isMy:{
            default:false
        }
    },
    computed:{
        sign(){
            return this.isLoading ? 'Loading...':'暂无数据，阁下可以创建属于您的专属空间'
        },
        isHaveData(){
            return this.data.length
        }
    },
    methods: {
        handleEdit(e,id){
            e.stopPropagation()
            this.$nextTick(()=>{
                this.$router.push({
                    name:'Writter',
                    params: {target: e.target.getAttribute('article-id')}
                })                
            })
        },
        handleDelete(e,id,domId){
            e.stopPropagation()
            this.$confirm('即将删除', '警告', {
                    confirmButtonText: '再次确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(async () => {
                    try{
                        const result = await this.$api.handleBlogDelete(id)
                        this.$parent.handleDelete(domId);
                        this.$message.success('删除程序执行完毕')
                    }catch(e){
                        this.$message.error('删除失败')
                    }
                },()=>{})
            
        },
        handleArticleClick(e){
            const className = e.target.className
            if(!className) return
            let parentTarget
            if(className==='list-single'){
                parentTarget = e.target
            }else if(className==='edit'){
                this.handleEdit(e,e.target.getAttribute('article-id'))
                return
            }else if(className==='delete'){
                this.handleDelete(e,e.target.getAttribute('article-id'),e.target.getAttribute('dom-id'))
                return
            }else{
                parentTarget = e.target.parentNode
                while(parentTarget && parentTarget.className!=='list-single'){
                    parentTarget = parentTarget.parentNode
                }            
            } 
            this.$nextTick(()=>{
                this.$router.push({
                    name:'BlogDetail',
                    params: {target: parentTarget.getAttribute('article-id')}
                })                
            })

        }
    }
  }
</script>

<style lang="scss" scoped>
    .create-id{
        margin-right: 10px;
    }
    .edit:hover,.delete:hover{
        text-decoration:underline;
        font-size: 13px;
        
    }
    .edit,.delete{
        line-height: 14px;
        transition: .3s;
    }
    .edit{
        color:#31cd38;
    }
    .delete{
        color:red;
    }
    .icon-left-arr{
        float: right;
        color:#31cd38;
        display: none;
        transition: .3s;
    }
    .list-single{
        cursor:pointer;
        padding-bottom: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e6e6e6;
    }
    .list-single:hover{
        .icon-left-arr{
            display: block;
        }
        .list-title{
            font-size: 20px;
            transform: translateY(-6px);
        }
    }
    .blog-list-wrapper{
        height: 100%;
        color:#1a1a1a;
        padding-top: 20px;
        box-sizing: border-box;
    }
    .is-nodata{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .list-title{
        font-size: 18px;
        font-weight: 600;
        line-height:24px;
        transition: .3s;
    }
    .list-bottom{
        display: flex;
        .bottom-right{
            flex: 1;
            text-align: right
        }
        .bottom-right,.bottom-left{
            line-height: 1.6;
            font-size: 12px;
        }
    }
</style>