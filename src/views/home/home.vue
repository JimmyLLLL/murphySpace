<template>
    <div class="home-wrapper">
        <BlogList :data='data' :isLoading="isLoading"></BlogList>
        <div v-if="isShowLoad" class="loading-letter">{{loadingLetter}}</div>
    </div>
</template>

<script>
import BlogList from '../../components/blog/BlogList'
export default {
    name:'home',
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
                this.getBrevityList(++this.currentPage)
            }
        }
    },
    methods:{
        async getBrevityList(page = 1){
            try{
                const {data} = await this.$api.getBrevityList(page)
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
        initLoading(){
            this.isLoading = true
        },
        updateMainHeight(){
            this.$nextTick(()=>{
                this.mainHeight = document.getElementsByClassName('main-wrapper')[0].clientHeight
            })
        }
    },
    activated(){
        this.isActivated = true
        this.$nextTick(()=>{
            document.getElementById('app').scrollTo(0,this.lastOffsetTop)
        })
        this.$route.params.reload && this.getBrevityList()
    },
    deactivated(){
        this.lastOffsetTop = this.offsetTop
        this.isActivated = false
    },
    created(){
        this.initLoading()
        this.getBrevityList()
    }
}
</script>


<style lang="scss" scoped>
.loading-letter{
    text-align: center;
    position: relative;
    top: -10px;
}
.home-wrapper{
    padding: 0 20px;  
}

</style>