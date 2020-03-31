<template>
    <div class="my-space-wrapper">
        <BlogList :data='data' :isLoading="isLoading" :isMy="true"></BlogList>
        <div v-if="isShowLoad" class="loading-letter">{{loadingLetter}}</div>
    </div>
</template>

<script>
import BlogList from '../../components/blog/BlogList'
export default {
    name:'MySpace',
    components:{
        BlogList
    },
    data(){
        return{
            isLoading:false,
            data:[],
            mainHeight:Infinity,
            currentPage:1,
            isEmpty:false,
            isShowLoad:false,
            loadingLetter:'Loading...',
            isActivated:false,
            lastOffsetTop:0
        }
        
    },
    computed:{
        offsetTop(){
            return this.$store.state.position.offsetTop
        },
        windowHeight(){
            return this.$store.state.position.height
        },
    },
    watch:{
        offsetTop(newVal){
            if(!this.isActivated) return
            if(newVal+this.windowHeight >= this.mainHeight && !this.isEmpty){
                this.getPersonalBlog(++this.currentPage)
            }
        }
    },
    methods:{
        handleDelete(id){
            this.data.splice(id,1)
            this.updateMainHeight()
        },
        async getPersonalBlog(page = 1){
            if(!this.$store.state.login.userData){
                setTimeout(()=>{
                    this.getPersonalBlog()
                },500)
                return
            }
            try{
                const {data} = await this.$api.personalGetBlog(page,this.$store.state.login.userData.account)
                if(!data.length){
                    this.isEmpty = true
                    if(page===1){
                        this.isShowLoad = false
                    }else{
                        this.loadingLetter = '数据已加载完毕'
                    }
                    return
                }
                this.isShowLoad = true
                this.data = page ===1 ? data:this.data.concat(data) 
                this.updateMainHeight() 
            }catch(e){
                this.$message.error(e)
            }finally{
                this.isLoading = false
            }

        },
        updateMainHeight(){
            this.$nextTick(()=>{
                this.mainHeight = document.getElementsByClassName('my-space-wrapper')[0].clientHeight
            })
        },
        initLoading(){
            this.isLoading = true
        }
    },
    activated(){
        this.isActivated = true
        this.$route.params.reload && this.getPersonalBlog()
        this.$nextTick(()=>{
            document.getElementById('app').scrollTo(0,this.lastOffsetTop)
        })
    },
    deactivated(){
        this.lastOffsetTop = this.offsetTop
        this.isActivated = false
    },
    created(){
        this.initLoading()
        this.getPersonalBlog()
    }
}
</script>


<style lang="scss" scoped>
.loading-letter{
    text-align: center;
    position: relative;
    top: -10px;
}
.my-space-wrapper{
    height: 100%;
    padding: 0 20px;  
}

</style>