<template>
    <div class="home-wrapper">
        <BlogList :data='data' :isLoading="isLoading"></BlogList>
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
            data:[]
        }
        
    },
    methods:{
        async getBrevityList(page = 1){
            try{
                const {data} = await this.$api.getBrevityList(page)
                this.data = this.data.concat(data)
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
    created(){
        this.initLoading()
        this.getBrevityList()
    }
}
</script>


<style lang="scss" scoped>
.home-wrapper{
    height: 100%;
    padding: 0 20px;  
}

</style>