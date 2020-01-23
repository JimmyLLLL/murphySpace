<template>
  <div id="app">
    <Murphyheader/>
    <div class="main-wrapper">
      <router-view/>
    </div>
    <Murphynav />
  </div>
</template>

<script>
import Murphyheader from './components/header/header'
import Murphynav from './components/nav/nav'
export default {
  name: 'App',
  components:{
    Murphyheader,
    Murphynav
  }
}
</script>

<style lang="scss" scoped>
  .main-wrapper{
    margin-left: 201px;
  }
</style>
