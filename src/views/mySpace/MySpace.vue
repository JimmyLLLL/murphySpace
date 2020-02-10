<template>
    <div class="my-space-wrapper">
        <BlogList></BlogList>
    </div>
</template>

<script>
import BlogList from '../../components/blog/BlogList'
export default {
    name:'MySpace',
    components:{
        BlogList
    }
}
</script>


<style lang="scss" scoped>
.my-space-wrapper{
    height: 100%;
    padding: 0 20px;  
}

</style>