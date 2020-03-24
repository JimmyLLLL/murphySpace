<template>
    <div class="my-space-wrapper">
        <BlogList :data='data' :isLoading="isLoading"></BlogList>
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
            data:[]
        }
        
    },
    methods:{
        async getPersonalBlog(page = 1){
            try{
                console.log('发起')
                const {data} = await this.$api.personalGetBlog(page,this.$store.state.login.userData.account)
                this.data = page ===1 ? data:this.data.concat(data)
            }catch(e){
                this.$message.error(e)
            }finally{
                this.isLoading = false
            }

        },
        initLoading(){
            this.isLoading = true
        }
    },
    activated(){
        this.$route.params.reload && this.getPersonalBlog()
    },
    created(){
        this.initLoading()
        this.getPersonalBlog()
    }
}
</script>


<style lang="scss" scoped>
.my-space-wrapper{
    height: 100%;
    padding: 0 20px;  
}

</style>