<template>
    <div>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="(item,index) in count" class="infinite-list-item" :key="index">{{ item }}</li>
    </ul>    
    </div>

</template>

<script>
  export default {
      name:'BlogList',
    data () {
      return {
        count: 0
      }
    },
    methods: {
      load () {
        this.count += 2
      }
    }
  }
</script>