<template>
    <div class="home-wrapper">
        <BlogList></BlogList>
    </div>
</template>

<script>
import BlogList from '../../components/blog/BlogList'
export default {
    name:'home',
    components:{
        BlogList
    }
}
</script>


<style lang="scss" scoped>
.home-wrapper{
    height: 100%;
    padding: 0 20px;  
}

</style>