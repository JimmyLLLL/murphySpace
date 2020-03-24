<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name:'Icon',
    props:{
        iconClass:{
            type:String,
            required:true
        },
        className:{
            type:String
        }
    },
    computed:{
        iconName(){
            return `#icon-${this.iconClass}`
        },
        svgClass(){
            return this.className?'svg-icon '+this.className : 'svg-icon'
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon{
    width:1em;
    height: 1em;
    vertical-align: -0.15rem;
    fill:currentColor;
    overflow: hidden;
}
</style>