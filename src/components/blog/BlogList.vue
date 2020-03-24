<template>
    <div class="blog-list-wrapper">
        <div v-if="isHaveData" @click="handleArticleClick">
            <div v-for="(item) in data" :key="item.id" class="list-single" :article-id="item.id">
                <div class="list-title">
                    {{item.title}}
                </div>
                <div class="list-bottom">
                    <div class="bottom-left"><Icon iconClass="user"></Icon>创造者：{{item.name}}</div>
                    <div class="bottom-right"><Icon iconClass="time"></Icon>诞生时间：{{item.moment}}</div>
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
        data: {
            default:[]
        },
        isLoading: { 
            default:true
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
        handleArticleClick(e){
            let parentTarget
            if(e.target.className==='list-single'){
                parentTarget = e.target
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
    .list-single{
        padding-bottom: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e6e6e6;
    }
    .blog-list-wrapper{
        height: 100%;
        color:#1a1a1a;
        padding-top: 20px;
        box-sizing: border-box;
    }
    .is-nodata{
        position: relative;
        top:50%;
        transform: translateY(-50%);
        text-align: center;
    }
    .list-title{
        font-size: 18px;
        font-weight: 600;
        line-height:1.6;
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